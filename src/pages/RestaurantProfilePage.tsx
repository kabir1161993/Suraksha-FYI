import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { store } from '../services/store';
import { Incident } from '../types';
import { Shield, Copy, Share2, AlertTriangle, CheckCircle2, Download, ArrowLeft, Building2 } from 'lucide-react';

export const RestaurantProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    setIncidents(store.getIncidents(true));
    return store.subscribe(() => {
      setIncidents(store.getIncidents(true));
    });
  }, []);

  const fboIncidents = incidents.filter((i) => i.fbo_slug === slug || i.fbo_name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);
  const sampleFbo = fboIncidents[0];

  if (!sampleFbo && fboIncidents.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Outlet Not Found</h2>
        <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>No public safety incidents recorded for this outlet slug.</p>
        <Link to="/map" className="btn-primary">Back to Hazard Map</Link>
      </div>
    );
  }

  // Safety Score Logic
  const p0Count = fboIncidents.filter((i) => i.hazard_severity === 'P0_CRITICAL').length;
  let safetyScore = 'MODERATE';
  let safetyColor = '#F59E0B';
  let safetyBadge = '🟡 MODERATE RISK';

  if (p0Count >= 2 || fboIncidents.length >= 4) {
    safetyScore = 'HIGH_RISK';
    safetyColor = '#DC2626';
    safetyBadge = '🔴 HIGH RISK';
  } else if (fboIncidents.length <= 1 && p0Count === 0) {
    safetyScore = 'LOW_RISK';
    safetyColor = '#16A34A';
    safetyBadge = '🟢 LOW RISK';
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '800px' }}>
      <Link to="/map" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#64748B', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1.25rem' }}>
        <ArrowLeft size={16} /> Back to Map
      </Link>

      {/* Outlet Header Header */}
      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Building2 color="#F59E0B" size={24} />
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A' }}>{sampleFbo.fbo_name}</h1>
            </div>
            <div style={{ fontSize: '0.875rem', color: '#64748B' }}>
              📍 {sampleFbo.ward}, {sampleFbo.city} • Category: <strong>{sampleFbo.category}</strong>
            </div>
          </div>

          <div style={{
            backgroundColor: `${safetyColor}15`,
            color: safetyColor,
            border: `1.5px solid ${safetyColor}`,
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            fontWeight: 800,
            fontSize: '0.875rem'
          }}>
            {safetyBadge}
          </div>
        </div>

        {/* FSSAI License Box */}
        <div style={{
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          padding: '0.875rem',
          borderRadius: '0.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
              FSSAI License Number
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1rem', color: '#0F172A' }}>
              {sampleFbo.fssai_license || 'Unverified User Entered'}
            </span>
          </div>

          <button 
            onClick={() => {
              navigator.clipboard.writeText(sampleFbo.fssai_license);
              alert('FSSAI license copied to clipboard!');
            }}
            className="btn-secondary"
            style={{ padding: '0.375rem 0.75rem', fontSize: '0.8125rem' }}
          >
            <Copy size={14} /> Copy License
          </button>
        </div>
      </div>

      {/* Safety Score Breakdown & Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-mono)' }}>
            {fboIncidents.length}
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>Total Public Reports</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#DC2626', fontFamily: 'var(--font-mono)' }}>
            {p0Count}
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>P0 Critical Violations</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#22C55E', fontFamily: 'var(--font-mono)' }}>
            {sampleFbo.fso_status}
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>Regulatory Action Status</div>
        </div>
      </div>

      {/* Incident History Timeline */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0F172A' }}>
          Incident Timeline ({fboIncidents.length})
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {fboIncidents.map((inc) => (
            <div 
              key={inc.incident_id}
              style={{
                borderLeft: `3px solid ${inc.hazard_severity === 'P0_CRITICAL' ? '#DC2626' : '#F59E0B'}`,
                paddingLeft: '1rem',
                paddingBottom: '0.5rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                <span className={inc.hazard_severity === 'P0_CRITICAL' ? 'badge-p0' : 'badge-p1'}>
                  {inc.hazard_primary.replace('_', ' ')}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                  {new Date(inc.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                "{inc.user_description}"
              </p>

              {inc.evidence_url && (
                <div style={{ width: '120px', height: '80px', borderRadius: '0.375rem', overflow: 'hidden', marginBottom: '0.5rem' }}>
                  <img src={inc.evidence_url} alt="Evidence" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}

              <div style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', gap: '1rem' }}>
                <span>Merchant Response: <strong>{inc.merchant_response}</strong></span>
                <span>Refund: <strong>{inc.refund_received ? 'Yes' : 'No'}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
