import { Incident, FBOProfile } from '../types';
import { store } from './store';
import { dbEngine } from './db';

export interface ApiResponse<T = any> {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: T;
  executionTimeMs: number;
}

export class ApiEngine {
  /**
   * Returns the URL-independent API base URL relative to the current site origin and base path.
   */
  public getBaseUrl(): string {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const pathname = typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : '';
    return `${origin}${pathname}/api/v1`;
  }

  /**
   * Simulates SHA-256 IP hashing for DPDP 2023 compliance
   */
  private hashClientIp(ip = '127.0.0.1'): string {
    return 'sha256_' + Array.from(ip).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 0).toString(16);
  }

  /**
   * GET /api/v1/reports
   */
  public async getReports(params: { city?: string; severity?: string; hazard_type?: string; limit?: number; offset?: number } = {}): Promise<ApiResponse> {
    const startTime = performance.now();
    const rateCheck = await dbEngine.checkRateLimit('api_read_query', 100, 60000); // 100 req/min for reads

    if (!rateCheck.allowed) {
      return {
        status: 429,
        statusText: 'Too Many Requests',
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': Math.ceil(rateCheck.resetTime / 1000).toString(),
          'Retry-After': '60'
        },
        data: {
          error: 'Rate limit exceeded. Maximum 100 requests per minute allowed.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        executionTimeMs: Math.round(performance.now() - startTime)
      };
    }

    let incidents = store.getIncidents(true);

    if (params.city && params.city !== 'ALL') {
      incidents = incidents.filter((i) => i.city.toLowerCase() === params.city?.toLowerCase());
    }
    if (params.severity && params.severity !== 'ALL') {
      incidents = incidents.filter((i) => i.hazard_severity === params.severity);
    }
    if (params.hazard_type && params.hazard_type !== 'ALL') {
      incidents = incidents.filter((i) => i.hazard_primary === params.hazard_type);
    }

    const limit = params.limit || 50;
    const offset = params.offset || 0;
    const paginated = incidents.slice(offset, offset + limit);

    return {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': rateCheck.remaining.toString(),
        'X-RateLimit-Reset': Math.ceil(rateCheck.resetTime / 1000).toString(),
        'X-Total-Count': incidents.length.toString()
      },
      data: {
        count: paginated.length,
        total: incidents.length,
        offset,
        limit,
        results: paginated
      },
      executionTimeMs: Math.round(performance.now() - startTime)
    };
  }

  /**
   * GET /api/v1/fbo/:fssai_license
   */
  public async getFboByLicense(license: string): Promise<ApiResponse> {
    const startTime = performance.now();
    const incidents = store.getIncidents(true).filter((i) => i.fssai_license === license);

    if (incidents.length === 0) {
      return {
        status: 404,
        statusText: 'Not Found',
        headers: { 'Content-Type': 'application/json' },
        data: { error: `No FBO record found for FSSAI License ${license}` },
        executionTimeMs: Math.round(performance.now() - startTime)
      };
    }

    const sample = incidents[0];
    const p0Count = incidents.filter((i) => i.hazard_severity === 'P0_CRITICAL').length;
    let safetyScore = p0Count >= 2 ? 'HIGH_RISK' : incidents.length >= 2 ? 'MODERATE' : 'LOW_RISK';

    return {
      status: 200,
      statusText: 'OK',
      headers: { 'Content-Type': 'application/json' },
      data: {
        fssai_license: license,
        establishment_name: sample.fbo_name,
        slug: sample.fbo_slug,
        category: sample.category,
        city: sample.city,
        safety_score: safetyScore,
        total_reports: incidents.length,
        p0_critical_count: p0Count,
        incident_history: incidents
      },
      executionTimeMs: Math.round(performance.now() - startTime)
    };
  }

  /**
   * POST /api/v1/reports (Enforces strict submission rate limiting)
   */
  public async submitReport(payload: Partial<Incident>): Promise<ApiResponse> {
    const startTime = performance.now();
    const rateCheck = await dbEngine.checkRateLimit('report_submission', 5, 3600000); // 5 per hour

    if (!rateCheck.allowed) {
      return {
        status: 429,
        statusText: 'Too Many Requests',
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': Math.ceil(rateCheck.resetTime / 1000).toString()
        },
        data: {
          error: 'Submission rate limit reached (5 reports / hour). Please wait before submitting another report.',
          code: 'SUBMISSION_RATE_LIMIT_EXCEEDED'
        },
        executionTimeMs: Math.round(performance.now() - startTime)
      };
    }

    if (!payload.fbo_name || !payload.hazard_primary) {
      return {
        status: 400,
        statusText: 'Bad Request',
        headers: { 'Content-Type': 'application/json' },
        data: { error: 'Missing required fields: fbo_name and hazard_primary are required.' },
        executionTimeMs: Math.round(performance.now() - startTime)
      };
    }

    const newIncident = store.addIncident({
      city: payload.city || 'Bengaluru',
      state: payload.state || 'Karnataka',
      ward: payload.ward || 'Koramangala Ward 68',
      lat: payload.lat || 12.9352,
      lng: payload.lng || 77.6244,
      fbo_name: payload.fbo_name,
      fbo_slug: payload.fbo_name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      fssai_license: payload.fssai_license || '11223344556677',
      fssai_verified: !!payload.fssai_license,
      category: payload.category || 'Restaurant / Café',
      hazard_primary: payload.hazard_primary,
      hazard_severity: payload.hazard_severity || 'P1_MODERATE',
      user_description: payload.user_description || 'Reported via API',
      evidence_url: payload.evidence_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
      phash_flags: [],
      merchant_response: payload.merchant_response || 'Haven\'t told them yet',
      refund_received: payload.refund_received || false,
      action_requested: payload.action_requested || 'Public awareness only',
      moderation_status: 'APPROVED',
      auto_approved: true,
      ddo_email: 'ddo.karnataka.bangalore@fssai.gov.in'
    });

    return {
      status: 201,
      statusText: 'Created',
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': '5',
        'X-RateLimit-Remaining': rateCheck.remaining.toString(),
        'X-RateLimit-Reset': Math.ceil(rateCheck.resetTime / 1000).toString()
      },
      data: {
        message: 'Report submitted and published to live map',
        incident_id: newIncident.incident_id,
        anonymized_privacy_hash: this.hashClientIp(),
        public_url: `${this.getBaseUrl().replace('/api/v1', '')}/#/restaurant/${newIncident.fbo_slug}`
      },
      executionTimeMs: Math.round(performance.now() - startTime)
    };
  }

  /**
   * GET /api/v1/data/export.csv
   */
  public generateCsvExport(): string {
    const incidents = store.getIncidents(true);
    const headers = ['incident_id', 'timestamp', 'city', 'ward', 'fbo_name', 'fssai_license', 'category', 'hazard_primary', 'hazard_severity', 'fso_status'];
    const rows = incidents.map((i) => [
      i.incident_id,
      i.timestamp,
      `"${i.city}"`,
      `"${i.ward}"`,
      `"${i.fbo_name}"`,
      i.fssai_license,
      `"${i.category}"`,
      i.hazard_primary,
      i.hazard_severity,
      `"${i.fso_status}"`
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }
}

export const apiEngine = new ApiEngine();
