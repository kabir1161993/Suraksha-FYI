import React from 'react';
import { Shield, Lock, FileText, CheckCircle2, AlertTriangle, Building2, Landmark } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '840px' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Shield color="#F59E0B" /> Mission & Architecture
      </h1>
      <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '2rem' }}>
        Suraksha.fyi is designed from first principles for Indian device realities, privacy compliance, and regulatory dispatch topology.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* DPDP Compliance Box */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock color="#16A34A" /> Privacy & DPDP Act 2023 Compliance
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.6 }}>
            Every reporter identity is anonymized using SHA-256(IP + daily_salt). Submission timestamps are truncated to the nearest hour. No phone numbers, real names, or Aadhaar credentials are stored in plain text.
          </p>
        </div>

        {/* Regulatory Dispatch Topology */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Landmark color="#3B82F6" /> Automated Regulatory Dispatch
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.6, marginBottom: '1rem' }}>
            When an establishment receives ≥3 verified reports in 7 days or any single P0 Critical report, Suraksha.fyi drafts a structured legal notice to the District Food Safety Officer (DDO) under Section 31 of the Food Safety and Standards Act, 2006.
          </p>

          <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0', fontSize: '0.8125rem', color: '#475569' }}>
            <strong>Routing Logic:</strong>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.375rem', lineHeight: 1.6 }}>
              <li>Restaurants / Cloud Kitchens → District Designated Officer (FSSAI)</li>
              <li>Street Vendors (unlicensed) → Municipal Health Officer</li>
              <li>Packaged Food Brands → FSSAI Headquarters</li>
              <li>PDS Ration Shops → State Civil Supplies Department</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
