import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Download, Lock, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: '#0F172A',
      color: '#94A3B8',
      borderTop: '1px solid #1E293B',
      padding: '3rem 0 2rem 0',
      marginTop: '4rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              <Shield color="#F59E0B" size={24} />
              Suraksha<span style={{ color: '#F59E0B' }}>.fyi</span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Open crowdsourced food safety registry and live hazard map for India. Transform encounters with adulterated food into structured, jurisdiction-aware civic signal.
            </p>
            <div style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span>✓ DPDP Act 2023 Compliant</span>
              <span>•</span>
              <span>✓ SHA-256 Anonymized</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              Public Portal
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <li><Link to="/map" style={{ color: '#94A3B8' }}>Live Hazard Map</Link></li>
              <li><Link to="/report" style={{ color: '#94A3B8' }}>Submit Zero-Login Report</Link></li>
              <li><Link to="/dashboard" style={{ color: '#94A3B8' }}>City Analytics & Hall of Shame</Link></li>
              <li><Link to="/search" style={{ color: '#94A3B8' }}>Search Outlets & Licenses</Link></li>
              <li><Link to="/my-reports" style={{ color: '#94A3B8' }}>My Device Submissions</Link></li>
            </ul>
          </div>

          {/* Open Data & API */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              Open Data & API
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <li><Link to="/api" style={{ color: '#94A3B8' }}>Public REST API Docs</Link></li>
              <li>
                <a 
                  href="/api/v1/data/export.csv" 
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Downloading Suraksha.fyi open dataset CSV...');
                  }}
                  style={{ color: '#F59E0B', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}
                >
                  <Download size={14} /> Download Dataset (CSV)
                </a>
              </li>
              <li><Link to="/about" style={{ color: '#94A3B8' }}>FSSAI DDO Routing Topology</Link></li>
              <li><Link to="/about" style={{ color: '#94A3B8' }}>Automated RTI Engine</Link></li>
            </ul>
          </div>

          {/* Admin & Security */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              Administration
            </h4>
            <p style={{ fontSize: '0.8125rem', marginBottom: '1rem', lineHeight: 1.5 }}>
              Authorized District Officers & Moderators can access the protected moderation panel:
            </p>
            <Link to="/admin/login" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1rem',
              borderRadius: '0.375rem',
              backgroundColor: '#1E293B',
              color: '#F59E0B',
              border: '1px solid #334155',
              fontSize: '0.875rem',
              fontWeight: 600
            }}>
              <Lock size={16} /> Backend Admin Login
            </Link>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #1E293B',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8125rem',
          color: '#64748B'
        }}>
          <div>
            © 2026 Suraksha.fyi — Built for India Civic Tech Hackathon. All synthetic & user-submitted data unverified by default.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Made with <Heart size={14} color="#EF4444" fill="#EF4444" /> for food safety in India
          </div>
        </div>
      </div>
    </footer>
  );
};
