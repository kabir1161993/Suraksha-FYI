import { Incident, FBOProfile, DispatchEvent, AdminUser, ModerationStatus } from '../types';
import { INITIAL_INCIDENTS, INITIAL_DISPATCHES } from './mockData';
import { dbEngine } from './db';

const INCIDENTS_KEY = 'suraksha_incidents_v1';
const MY_REPORTS_KEY = 'suraksha_my_reports_v1';
const DISPATCHES_KEY = 'suraksha_dispatches_v1';
const ADMIN_AUTH_KEY = 'suraksha_admin_auth_v1';
const LANG_KEY = 'suraksha_lang_v1';

type Listener = () => void;

class AppStore {
  private incidents: Incident[] = [];
  private dispatches: DispatchEvent[] = [];
  private myReportIds: string[] = [];
  private adminUser: AdminUser | null = null;
  private currentLanguage: 'en' | 'hi' = 'en';
  private listeners: Set<Listener> = new Set();
  private isInitialized = false;

  constructor() {
    this.loadFromStorage();
    this.initDatabase();
  }

  private async initDatabase() {
    try {
      await dbEngine.init();
      const dbIncidents = await dbEngine.getAllIncidents();
      const dbDispatches = await dbEngine.getAllDispatches();

      if (dbIncidents && dbIncidents.length > 0) {
        this.incidents = dbIncidents;
      }
      if (dbDispatches && dbDispatches.length > 0) {
        this.dispatches = dbDispatches;
      }
      this.isInitialized = true;
      this.notify();
    } catch (err) {
      console.warn('Database initialization warning, using localStorage/in-memory store:', err);
    }
  }

  private loadFromStorage() {
    try {
      const storedIncidents = localStorage.getItem(INCIDENTS_KEY);
      this.incidents = storedIncidents ? JSON.parse(storedIncidents) : INITIAL_INCIDENTS;

      const storedDispatches = localStorage.getItem(DISPATCHES_KEY);
      this.dispatches = storedDispatches ? JSON.parse(storedDispatches) : INITIAL_DISPATCHES;

      const storedMyReports = localStorage.getItem(MY_REPORTS_KEY);
      this.myReportIds = storedMyReports ? JSON.parse(storedMyReports) : ['SRK-2026-88392'];

      const storedAdmin = localStorage.getItem(ADMIN_AUTH_KEY);
      this.adminUser = storedAdmin ? JSON.parse(storedAdmin) : null;

      const storedLang = localStorage.getItem(LANG_KEY);
      if (storedLang === 'hi' || storedLang === 'en') {
        this.currentLanguage = storedLang;
      }
    } catch (err) {
      this.incidents = INITIAL_INCIDENTS;
      this.dispatches = INITIAL_DISPATCHES;
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(INCIDENTS_KEY, JSON.stringify(this.incidents));
      localStorage.setItem(DISPATCHES_KEY, JSON.stringify(this.dispatches));
      localStorage.setItem(MY_REPORTS_KEY, JSON.stringify(this.myReportIds));
      if (this.adminUser) {
        localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(this.adminUser));
      } else {
        localStorage.removeItem(ADMIN_AUTH_KEY);
      }
      localStorage.setItem(LANG_KEY, this.currentLanguage);
    } catch (err) {
      console.error('Failed to save storage:', err);
    }
    this.notify();
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  // --- INCIDENT METHODS ---
  public getIncidents(onlyApproved = true): Incident[] {
    if (onlyApproved) {
      return this.incidents.filter((i) => i.moderation_status === 'APPROVED');
    }
    return [...this.incidents];
  }

  public getIncidentById(id: string): Incident | undefined {
    return this.incidents.find((i) => i.incident_id === id);
  }

  public getMyIncidents(): Incident[] {
    return this.incidents.filter((i) => this.myReportIds.includes(i.incident_id));
  }

  public addIncident(newIncident: Omit<Incident, 'incident_id' | 'timestamp' | 'upvotes' | 'fso_status'>): Incident {
    const idNum = Math.floor(10000 + Math.random() * 90000);
    const incident_id = `SRK-2026-${idNum}`;
    const timestamp = new Date().toISOString();

    const created: Incident = {
      ...newIncident,
      incident_id,
      timestamp,
      upvotes: 1,
      fso_status: 'Pending Review',
      fbo_slug: newIncident.fbo_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    };

    this.incidents.unshift(created);
    this.myReportIds.unshift(incident_id);

    // Save to IndexedDB asynchronously
    dbEngine.saveIncident(created);

    // Check cluster condition: 3+ reports for same FBO in 7 days
    this.checkClusterAndTriggerDispatch(created.fssai_license, created.fbo_name, created.city, created.ddo_email);

    this.saveToStorage();
    return created;
  }

  public upvoteIncident(id: string) {
    const incident = this.incidents.find((i) => i.incident_id === id);
    if (incident) {
      incident.upvotes += 1;
      dbEngine.saveIncident(incident);
      this.saveToStorage();
    }
  }

  // --- ADMIN MODERATION METHODS ---
  public setModerationStatus(id: string, status: ModerationStatus) {
    const incident = this.incidents.find((i) => i.incident_id === id);
    if (incident) {
      incident.moderation_status = status;
      if (status === 'APPROVED') {
        incident.fso_status = 'Under FSO Review';
      }
      dbEngine.saveIncident(incident);
      this.saveToStorage();
    }
  }

  public updateIncident(updated: Incident) {
    const idx = this.incidents.findIndex((i) => i.incident_id === updated.incident_id);
    if (idx !== -1) {
      this.incidents[idx] = updated;
      dbEngine.saveIncident(updated);
      this.saveToStorage();
    }
  }

  // --- DISPATCH METHODS ---
  public getDispatches(): DispatchEvent[] {
    return [...this.dispatches];
  }

  public checkClusterAndTriggerDispatch(fssai: string, fboName: string, city: string, ddoEmail?: string) {
    if (!fssai) return;

    const matching = this.incidents.filter((i) => i.fssai_license === fssai);
    if (matching.length >= 3) {
      const clusterId = `CLU-2026-${Math.floor(100 + Math.random() * 900)}`;
      
      matching.forEach((m) => {
        m.cluster_id = clusterId;
        dbEngine.saveIncident(m);
      });

      const existing = this.dispatches.find((d) => d.fssai_license === fssai);
      if (!existing) {
        const newDispatch: DispatchEvent = {
          dispatch_id: `DISP-2026-${Math.floor(100 + Math.random() * 900)}`,
          cluster_id: clusterId,
          fbo_name: fboName,
          fssai_license: fssai,
          city,
          ddo_email: ddoEmail || `fso.${city.toLowerCase()}@fssai.gov.in`,
          report_count: matching.length,
          p0_count: matching.filter((m) => m.hazard_severity === 'P0_CRITICAL').length,
          triggered_at: new Date().toISOString(),
          status: 'SENT'
        };
        this.dispatches.unshift(newDispatch);
        dbEngine.saveDispatch(newDispatch);
      }
    }
  }

  public updateDispatchStatus(dispatch_id: string, status: 'ACKNOWLEDGED' | 'INSPECTED') {
    const disp = this.dispatches.find((d) => d.dispatch_id === dispatch_id);
    if (disp) {
      disp.status = status;
      disp.fso_response_date = new Date().toISOString();
      dbEngine.saveDispatch(disp);

      this.incidents.forEach((inc) => {
        if (inc.fssai_license === disp.fssai_license) {
          inc.fso_status = status === 'INSPECTED' ? 'Inspected & Action Taken' : 'Under FSO Review';
          dbEngine.saveIncident(inc);
        }
      });

      this.saveToStorage();
    }
  }

  // --- AUTHENTICATION & LANGUAGE ---
  public getAdminUser(): AdminUser | null {
    return this.adminUser;
  }

  public loginAdmin(email: string, pass: string): boolean {
    if ((email === 'admin@suraksha.fyi' || email === 'admin') && (pass === 'suraksha2026' || pass === 'admin')) {
      this.adminUser = {
        email: 'admin@suraksha.fyi',
        role: 'Super Admin',
        token: 'token_suraksha_' + Date.now()
      };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  public logoutAdmin() {
    this.adminUser = null;
    this.saveToStorage();
  }

  public getLanguage(): 'en' | 'hi' {
    return this.currentLanguage;
  }

  public setLanguage(lang: 'en' | 'hi') {
    this.currentLanguage = lang;
    this.saveToStorage();
  }
}

export const store = new AppStore();
