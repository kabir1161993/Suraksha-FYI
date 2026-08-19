import { Incident, DispatchEvent, FBOProfile } from '../types';
import { INITIAL_INCIDENTS, INITIAL_DISPATCHES } from './mockData';

const DB_NAME = 'SurakshaFYI_DB_v1';
const DB_VERSION = 1;

export class LocalDatabase {
  private db: IDBDatabase | null = null;

  public async init(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('IndexedDB failed to open, falling back to in-memory/localStorage');
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Incidents store
        if (!db.objectStoreNames.contains('incidents')) {
          const incidentStore = db.createObjectStore('incidents', { keyPath: 'incident_id' });
          incidentStore.createIndex('city', 'city', { unique: false });
          incidentStore.createIndex('hazard_severity', 'hazard_severity', { unique: false });
          incidentStore.createIndex('moderation_status', 'moderation_status', { unique: false });
          incidentStore.createIndex('fssai_license', 'fssai_license', { unique: false });
          incidentStore.createIndex('fbo_slug', 'fbo_slug', { unique: false });
        }

        // Dispatches store
        if (!db.objectStoreNames.contains('dispatches')) {
          db.createObjectStore('dispatches', { keyPath: 'dispatch_id' });
        }

        // Rate Limits store
        if (!db.objectStoreNames.contains('rate_limits')) {
          db.createObjectStore('rate_limits', { keyPath: 'key' });
        }

        // My Reports store
        if (!db.objectStoreNames.contains('my_reports')) {
          db.createObjectStore('my_reports', { keyPath: 'incident_id' });
        }
      };
    });
  }

  // --- INCIDENTS CRUD ---
  public async getAllIncidents(): Promise<Incident[]> {
    try {
      const db = await this.init();
      return new Promise((resolve) => {
        const tx = db.transaction('incidents', 'readonly');
        const store = tx.objectStore('incidents');
        const request = store.getAll();
        request.onsuccess = () => {
          if (!request.result || request.result.length === 0) {
            // Seed default incidents if store is empty
            this.seedData().then(() => resolve(INITIAL_INCIDENTS));
          } else {
            resolve(request.result);
          }
        };
      });
    } catch {
      return INITIAL_INCIDENTS;
    }
  }

  public async saveIncident(incident: Incident): Promise<void> {
    try {
      const db = await this.init();
      const tx = db.transaction('incidents', 'readwrite');
      tx.objectStore('incidents').put(incident);
    } catch (err) {
      console.error('Failed to save incident to IndexedDB:', err);
    }
  }

  public async seedData(): Promise<void> {
    try {
      const db = await this.init();
      const tx = db.transaction(['incidents', 'dispatches'], 'readwrite');
      const incStore = tx.objectStore('incidents');
      const dispStore = tx.objectStore('dispatches');

      INITIAL_INCIDENTS.forEach((inc) => incStore.put(inc));
      INITIAL_DISPATCHES.forEach((disp) => dispStore.put(disp));
    } catch (err) {
      console.error('Failed to seed IndexedDB:', err);
    }
  }

  // --- DISPATCHES CRUD ---
  public async getAllDispatches(): Promise<DispatchEvent[]> {
    try {
      const db = await this.init();
      return new Promise((resolve) => {
        const tx = db.transaction('dispatches', 'readonly');
        const store = tx.objectStore('dispatches');
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result || INITIAL_DISPATCHES);
      });
    } catch {
      return INITIAL_DISPATCHES;
    }
  }

  public async saveDispatch(dispatch: DispatchEvent): Promise<void> {
    try {
      const db = await this.init();
      const tx = db.transaction('dispatches', 'readwrite');
      tx.objectStore('dispatches').put(dispatch);
    } catch (err) {
      console.error('Failed to save dispatch to IndexedDB:', err);
    }
  }

  // --- RATE LIMITING ---
  public async checkRateLimit(clientKey: string, maxLimit = 5, windowMs = 3600000): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const now = Date.now();
    try {
      const db = await this.init();
      return new Promise((resolve) => {
        const tx = db.transaction('rate_limits', 'readwrite');
        const store = tx.objectStore('rate_limits');
        const getReq = store.get(clientKey);

        getReq.onsuccess = () => {
          let record = getReq.result;
          if (!record || now > record.resetTime) {
            record = {
              key: clientKey,
              count: 1,
              resetTime: now + windowMs
            };
          } else {
            record.count += 1;
          }

          store.put(record);

          const allowed = record.count <= maxLimit;
          const remaining = Math.max(0, maxLimit - record.count);
          resolve({ allowed, remaining, resetTime: record.resetTime });
        };
      });
    } catch {
      return { allowed: true, remaining: maxLimit - 1, resetTime: now + windowMs };
    }
  }
}

export const dbEngine = new LocalDatabase();
