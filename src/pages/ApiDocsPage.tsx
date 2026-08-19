import React from 'react';
import { Code2, Download, Terminal, Database, Key } from 'lucide-react';

export const ApiDocsPage: React.FC = () => {
  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '840px' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Code2 color="#F59E0B" /> Open Data API & Public Dataset Documentation
      </h1>
      <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '2rem' }}>
        Suraksha.fyi provides a REST API and open CSV dumps for journalists, food safety researchers, and civic developers.
      </p>

      {/* CSV Export Banner */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', backgroundColor: '#FEF3C7', borderColor: '#FDE68A' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#B45309', marginBottom: '0.25rem' }}>
              Full Open Dataset (CSV)
            </h3>
            <p style={{ fontSize: '0.8125rem', color: '#92400E' }}>
              Updated daily. Contains anonymized incident IDs, timestamps, cities, FSSAI licenses, and severity grades.
            </p>
          </div>
          <button 
            onClick={() => alert('Downloading Suraksha.fyi daily open dataset CSV...')}
            className="btn-primary" 
            style={{ backgroundColor: '#D97706', color: '#fff' }}
          >
            <Download size={16} /> Download CSV Dump
          </button>
        </div>
      </div>

      {/* API Endpoints List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Endpoint 1 */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ backgroundColor: '#22C55E', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '0.25rem' }}>GET</span>
            <code style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>/api/v1/reports</code>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '0.75rem' }}>
            Returns a list of approved food safety incident reports filtered by city, severity, or date.
          </p>
          <pre style={{ backgroundColor: '#0F172A', color: '#F59E0B', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', overflowX: 'auto' }}>
{`curl -X GET "https://api.suraksha.fyi/v1/reports?city=Bengaluru&severity=P0_CRITICAL" \\
  -H "X-Suraksha-Key: demo_public_key"`}
          </pre>
        </div>

        {/* Endpoint 2 */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ backgroundColor: '#22C55E', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '0.25rem' }}>GET</span>
            <code style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>/api/v1/fbo/:fssai_license</code>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '0.75rem' }}>
            Look up safety score and incident history for a 14-digit FSSAI license number.
          </p>
          <pre style={{ backgroundColor: '#0F172A', color: '#F59E0B', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', overflowX: 'auto' }}>
{`curl -X GET "https://api.suraksha.fyi/v1/fbo/11223344556677"`}
          </pre>
        </div>

      </div>
    </div>
  );
};
