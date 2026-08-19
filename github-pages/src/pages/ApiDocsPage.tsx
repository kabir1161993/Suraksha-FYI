import React, { useState, useEffect } from 'react';
import { apiEngine, ApiResponse } from '../services/apiEngine';
import { Code2, Download, Play, ShieldAlert, CheckCircle2, Clock, Terminal, Key, Cpu, Zap } from 'lucide-react';

export const ApiDocsPage: React.FC = () => {
  const baseUrl = apiEngine.getBaseUrl();
  const [activeTab, setActiveTab] = useState<'docs' | 'playground'>('docs');
  
  // Playground State
  const [endpoint, setEndpoint] = useState<string>('GET /reports');
  const [cityParam, setCityParam] = useState<string>('ALL');
  const [severityParam, setSeverityParam] = useState<string>('ALL');
  const [licenseParam, setLicenseParam] = useState<string>('11223344556677');
  
  // POST payload
  const [postFboName, setPostFboName] = useState<string>('Zomato Cloud Kitchen Koramangala');
  const [postCategory, setPostCategory] = useState<string>('Cloud Kitchen');
  const [postHazard, setPostHazard] = useState<string>('FOREIGN_OBJECT');
  
  // Response State
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Execute Live API Request
  const handleExecuteRequest = async () => {
    setIsLoading(true);
    setApiResponse(null);

    let res: ApiResponse;
    if (endpoint === 'GET /reports') {
      res = await apiEngine.getReports({ city: cityParam, severity: severityParam });
    } else if (endpoint === 'GET /fbo/:license') {
      res = await apiEngine.getFboByLicense(licenseParam);
    } else {
      res = await apiEngine.submitReport({
        fbo_name: postFboName,
        category: postCategory as any,
        hazard_primary: postHazard as any,
        city: 'Bengaluru',
        user_description: 'Submitted via API Playground'
      });
    }

    setIsLoading(false);
    setApiResponse(res);
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '920px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Code2 color="#F59E0B" /> URL-Independent Public API & Live Playground
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
          Real-time REST API engine connected to local IndexedDB with built-in sliding window rate limiting.
        </p>

        {/* Dynamic Base URL Banner */}
        <div style={{
          marginTop: '1rem',
          backgroundColor: '#0F172A',
          color: '#fff',
          padding: '0.875rem 1.25rem',
          borderRadius: '0.5rem',
          border: '1px solid #334155',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem' }}>
            <Zap color="#F59E0B" size={18} />
            <span>Active Base URL (URL-Independent):</span>
            <code style={{ fontFamily: 'var(--font-mono)', color: '#F59E0B', fontWeight: 700 }}>
              {baseUrl}
            </code>
          </div>

          <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', backgroundColor: '#1E293B', color: '#22C55E', borderRadius: '4px', border: '1px solid #334155', fontWeight: 700 }}>
            ● LIVE INSTANCE
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
        <button 
          onClick={() => setActiveTab('docs')}
          style={{
            padding: '0.5rem 1.25rem',
            borderRadius: '0.375rem',
            border: 'none',
            backgroundColor: activeTab === 'docs' ? '#F59E0B' : 'transparent',
            color: activeTab === 'docs' ? '#000' : '#64748B',
            fontWeight: 800,
            cursor: 'pointer',
            fontSize: '0.875rem'
          }}
        >
          📖 Endpoint Documentation
        </button>

        <button 
          onClick={() => setActiveTab('playground')}
          style={{
            padding: '0.5rem 1.25rem',
            borderRadius: '0.375rem',
            border: 'none',
            backgroundColor: activeTab === 'playground' ? '#F59E0B' : 'transparent',
            color: activeTab === 'playground' ? '#000' : '#64748B',
            fontWeight: 800,
            cursor: 'pointer',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem'
          }}
        >
          <Play size={16} /> Interactive Live Playground
        </button>
      </div>

      {/* DOCUMENTATION TAB */}
      {activeTab === 'docs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* CSV Export Card */}
          <div className="glass-card" style={{ padding: '1.5rem', backgroundColor: '#FEF3C7', borderColor: '#FDE68A' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#B45309', marginBottom: '0.25rem' }}>
                  Daily Open Dataset (CSV)
                </h3>
                <p style={{ fontSize: '0.8125rem', color: '#92400E' }}>
                  Download entire anonymized dataset directly from local IndexedDB storage.
                </p>
              </div>
              <button 
                onClick={() => {
                  const csv = apiEngine.generateCsvExport();
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `suraksha_dataset_${new Date().toISOString().slice(0,10)}.csv`;
                  a.click();
                }}
                className="btn-primary" 
                style={{ backgroundColor: '#D97706', color: '#fff' }}
              >
                <Download size={16} /> Download CSV Dataset
              </button>
            </div>
          </div>

          {/* Endpoint 1 */}
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ backgroundColor: '#22C55E', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '0.25rem' }}>GET</span>
              <code style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>/reports</code>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '0.75rem' }}>
              Retrieve food safety incident reports filtered by city, severity grade, or hazard category. Rate limited to 100 requests/min.
            </p>
            <pre style={{ backgroundColor: '#0F172A', color: '#F59E0B', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', overflowX: 'auto' }}>
{`curl -X GET "${baseUrl}/reports?city=Bengaluru&severity=P0_CRITICAL"`}
            </pre>
          </div>

          {/* Endpoint 2 */}
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ backgroundColor: '#22C55E', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '0.25rem' }}>GET</span>
              <code style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>/fbo/:fssai_license</code>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '0.75rem' }}>
              Query Safety Scorecard and incident history for a 14-digit FSSAI license number.
            </p>
            <pre style={{ backgroundColor: '#0F172A', color: '#F59E0B', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', overflowX: 'auto' }}>
{`curl -X GET "${baseUrl}/fbo/11223344556677"`}
            </pre>
          </div>

          {/* Endpoint 3 */}
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ backgroundColor: '#3B82F6', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '0.25rem' }}>POST</span>
              <code style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>/reports</code>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '0.75rem' }}>
              Submit new incident report via REST API. Strictly rate limited to 5 submissions/hour per device signature.
            </p>
            <pre style={{ backgroundColor: '#0F172A', color: '#F59E0B', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', overflowX: 'auto' }}>
{`curl -X POST "${baseUrl}/reports" \\
  -H "Content-Type: application/json" \\
  -d '{
    "fbo_name": "Zomato Cloud Kitchen",
    "hazard_primary": "FOREIGN_OBJECT",
    "city": "Bengaluru"
  }'`}
            </pre>
          </div>

        </div>
      )}

      {/* LIVE INTERACTIVE PLAYGROUND TAB */}
      {activeTab === 'playground' && (
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Play color="#F59E0B" /> Interactive Live API Console
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.5rem' }}>
            Select an endpoint, configure parameters, and execute live against the IndexedDB storage engine.
          </p>

          {/* Endpoint Selector */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.375rem' }}>
              Select Endpoint
            </label>
            <select 
              value={endpoint} 
              onChange={(e) => setEndpoint(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
            >
              <option value="GET /reports">GET /api/v1/reports</option>
              <option value="GET /fbo/:license">GET /api/v1/fbo/:fssai_license</option>
              <option value="POST /reports">POST /api/v1/reports (Rate Limited 5/hr)</option>
            </select>
          </div>

          {/* Dynamic Parameters Form */}
          {endpoint === 'GET /reports' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.375rem' }}>
                  City Filter
                </label>
                <select value={cityParam} onChange={(e) => setCityParam(e.target.value)} style={{ width: '100%', padding: '0.625rem', borderRadius: '0.375rem', border: '1px solid #CBD5E1' }}>
                  <option value="ALL">All Cities</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Patna">Patna</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.375rem' }}>
                  Severity Filter
                </label>
                <select value={severityParam} onChange={(e) => setSeverityParam(e.target.value)} style={{ width: '100%', padding: '0.625rem', borderRadius: '0.375rem', border: '1px solid #CBD5E1' }}>
                  <option value="ALL">All Severities</option>
                  <option value="P0_CRITICAL">🔴 P0 Critical</option>
                  <option value="P1_MODERATE">🟡 P1 Moderate</option>
                  <option value="P2_ADVISORY">🔵 P2 Advisory</option>
                </select>
              </div>
            </div>
          )}

          {endpoint === 'GET /fbo/:license' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.375rem' }}>
                FSSAI License #
              </label>
              <input 
                type="text" 
                value={licenseParam} 
                onChange={(e) => setLicenseParam(e.target.value)}
                style={{ width: '100%', padding: '0.625rem', borderRadius: '0.375rem', border: '1px solid #CBD5E1', fontFamily: 'var(--font-mono)' }} 
              />
            </div>
          )}

          {endpoint === 'POST /reports' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.375rem' }}>
                  Establishment Name
                </label>
                <input 
                  type="text" 
                  value={postFboName} 
                  onChange={(e) => setPostFboName(e.target.value)}
                  style={{ width: '100%', padding: '0.625rem', borderRadius: '0.375rem', border: '1px solid #CBD5E1' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.375rem' }}>
                    Category
                  </label>
                  <select value={postCategory} onChange={(e) => setPostCategory(e.target.value)} style={{ width: '100%', padding: '0.625rem', borderRadius: '0.375rem', border: '1px solid #CBD5E1' }}>
                    <option value="Cloud Kitchen">Cloud Kitchen</option>
                    <option value="Restaurant / Café">Restaurant / Café</option>
                    <option value="Street Vendor / Stall">Street Vendor</option>
                    <option value="Packaged Food">Packaged Food</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.375rem' }}>
                    Hazard Type
                  </label>
                  <select value={postHazard} onChange={(e) => setPostHazard(e.target.value)} style={{ width: '100%', padding: '0.625rem', borderRadius: '0.375rem', border: '1px solid #CBD5E1' }}>
                    <option value="FOREIGN_OBJECT">FOREIGN_OBJECT (P0)</option>
                    <option value="VEG_NONVEG_CONTAMINATION">VEG_NONVEG_CONTAMINATION (P0)</option>
                    <option value="SPOILED_MOLD">SPOILED_MOLD (P1)</option>
                    <option value="EXPIRED_PRODUCT">EXPIRED_PRODUCT (P1)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <button 
            onClick={handleExecuteRequest}
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', marginBottom: '1.75rem' }}
            disabled={isLoading}
          >
            <Play size={18} /> {isLoading ? 'Executing Request...' : 'Execute Live API Request'}
          </button>

          {/* Response Inspector */}
          {apiResponse && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    padding: '0.25rem 0.625rem',
                    borderRadius: '0.25rem',
                    fontWeight: 800,
                    fontSize: '0.8125rem',
                    backgroundColor: apiResponse.status < 300 ? '#22C55E' : '#DC2626',
                    color: '#fff'
                  }}>
                    {apiResponse.status} {apiResponse.statusText}
                  </span>
                  <span style={{ fontSize: '0.8125rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                    ⏱ {apiResponse.executionTimeMs} ms
                  </span>
                </div>

                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  RateLimit Remaining: <strong>{apiResponse.headers['X-RateLimit-Remaining'] || 'N/A'}</strong>
                </div>
              </div>

              {apiResponse.status === 429 && (
                <div style={{ padding: '0.875rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '0.5rem', color: '#DC2626', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldAlert size={18} /> Rate Limiter Triggered! Maximum submission quota exceeded.
                </div>
              )}

              <pre style={{
                backgroundColor: '#0F172A',
                color: apiResponse.status < 300 ? '#38BDF8' : '#F87171',
                padding: '1.25rem',
                borderRadius: '0.5rem',
                fontSize: '0.8125rem',
                fontFamily: 'var(--font-mono)',
                overflowX: 'auto',
                border: '1px solid #334155',
                maxHeight: '340px'
              }}>
                {JSON.stringify(apiResponse.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
