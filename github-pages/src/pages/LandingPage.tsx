import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { store } from '../services/store';
import { Incident } from '../types';
import { HazardMap } from '../components/map/HazardMap';
import { 
  Camera, 
  MapPin, 
  TrendingUp, 
  Zap, 
  Clock,
  Sparkles,
  Filter
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [showBottomSheet, setShowBottomSheet] = useState(true);
  const [lang, setLang] = useState<'en' | 'hi'>(store.getLanguage());

  useEffect(() => {
    setIncidents(store.getIncidents(true));
    return store.subscribe(() => {
      setIncidents(store.getIncidents(true));
      setLang(store.getLanguage());
    });
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: '2rem' }}>
      
      {/* Sticky Floating Action Button (FAB) */}
      <button 
        onClick={() => navigate('/report')} 
        className="fab-button"
        aria-label="Report a Hazard Now"
      >
        <Camera size={20} />
        <span>{lang === 'hi' ? 'रिपोर्ट दर्ज करें' : 'Report Now (< 25s)'}</span>
      </button>

      {/* Hero Section */}
      <section style={{
        backgroundColor: '#0F172A',
        color: '#fff',
        padding: '2rem 0 2.5rem 0',
        borderBottom: '1px solid #1E293B',
        background: 'radial-gradient(circle at top right, #1E293B 0%, #0F172A 60%)'
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#F59E0B',
                padding: '0.35rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                marginBottom: '0.875rem'
              }}>
                <Zap size={14} />
                {lang === 'hi' ? 'बिना लॉगिन • 25 सेकंड में रिपोर्ट' : 'Zero Login Wall • < 25s Submission'}
              </div>

              <h1 style={{
                fontSize: '1.875rem',
                fontWeight: 800,
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
                marginBottom: '0.875rem',
                color: '#fff'
              }}>
                {lang === 'hi' 
                  ? 'भारत का खुला खाद्य सुरक्षा मानचित्र और नागरिक पोर्टल' 
                  : 'India\'s Open Food Safety Registry & Live Hazard Map'}
              </h1>

              <p style={{
                fontSize: '0.95rem',
                color: '#94A3B8',
                lineHeight: 1.5,
                marginBottom: '1.5rem'
              }}>
                {lang === 'hi'
                  ? 'मिर्च में मिलावट या बिरयानी में कीड़ा? 25 सेकंड में फोटो खींचकर रिपोर्ट करें और लाइव मैप पर देखें।'
                  : 'Found contaminated or adulterated food? Take a photo, tag location, and publish to the live map instantly.'}
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => navigate('/report')}
                  className="btn-primary"
                  style={{ flex: 1, minWidth: '160px', justifyContent: 'center' }}
                >
                  <Camera size={18} />
                  {lang === 'hi' ? 'रिपोर्ट दर्ज करें' : 'Report Hazard'}
                </button>

                <Link to="/map" className="btn-secondary" style={{ flex: 1, minWidth: '150px', justifyContent: 'center' }}>
                  <MapPin size={18} />
                  {lang === 'hi' ? 'लाइव मैप देखें' : 'Explore Map'}
                </Link>
              </div>
            </div>

            {/* Quick Stat Counter Box */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem'
            }}>
              <div className="glass-card-dark" style={{ padding: '1rem' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F59E0B', fontFamily: 'var(--font-mono)' }}>
                  1,247
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>
                  Reports This Month
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#22C55E', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <TrendingUp size={10} /> +23%
                </div>
              </div>

              <div className="glass-card-dark" style={{ padding: '1rem' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#EF4444', fontFamily: 'var(--font-mono)' }}>
                  84
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>
                  Flagged Outlets
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                  High Risk Cluster
                </div>
              </div>

              <div className="glass-card-dark" style={{ padding: '1rem' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22C55E', fontFamily: 'var(--font-mono)' }}>
                  12
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>
                  FSO Inspections
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#22C55E', marginTop: '0.2rem' }}>
                  Action Taken
                </div>
              </div>

              <div className="glass-card-dark" style={{ padding: '1rem' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3B82F6', fontFamily: 'var(--font-mono)' }}>
                  &lt; 25s
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>
                  Avg Submission
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#3B82F6', marginTop: '0.2rem' }}>
                  Zero Login
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Map & Live Feed Content */}
      <div className="container" style={{ marginTop: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <MapPin color="#F59E0B" size={20} />
              {lang === 'hi' ? 'लाइव मैप' : 'Live Hazard Map'}
            </h2>
            <p style={{ fontSize: '0.8125rem', color: '#64748B' }}>
              Real-time violation reports across Indian cities.
            </p>
          </div>

          <Link to="/map" className="btn-secondary" style={{ fontSize: '0.8125rem', padding: '0.4rem 0.75rem' }}>
            <Filter size={14} /> Full Map & Filters →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {/* Map Container */}
          <div>
            <HazardMap incidents={incidents} height="380px" />
          </div>

          {/* Live Activity Feed */}
          <div className="glass-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Clock size={16} color="#F59E0B" /> Live Incident Feed
              </h3>
              <span style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem', backgroundColor: '#FEF3C7', color: '#B45309', borderRadius: '4px', fontWeight: 700 }}>
                POLLED LIVE
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', overflowY: 'auto', maxHeight: '320px' }}>
              {incidents.slice(0, 5).map((inc) => (
                <div 
                  key={inc.incident_id} 
                  onClick={() => navigate(`/restaurant/${inc.fbo_slug}`)}
                  style={{
                    padding: '0.625rem',
                    borderRadius: '0.5rem',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: '#0F172A' }}>
                      {inc.fbo_name}
                    </div>
                    <span className={inc.hazard_severity === 'P0_CRITICAL' ? 'badge-p0' : 'badge-p1'} style={{ fontSize: '0.65rem' }}>
                      {inc.hazard_severity}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                    📍 {inc.ward}, {inc.city}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Introductory Bottom Sheet for First-Time Visitors */}
      {showBottomSheet && (
        <div style={{
          position: 'fixed',
          bottom: '5.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '92%',
          maxWidth: '480px',
          backgroundColor: '#0F172A',
          color: '#fff',
          padding: '1rem 1.25rem',
          borderRadius: '0.875rem',
          boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
          zIndex: 1040,
          border: '1px solid #334155'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontWeight: 700, color: '#F59E0B', fontSize: '0.875rem' }}>
              <Sparkles size={16} /> Report in &lt; 25 seconds
            </div>
            <button 
              onClick={() => setShowBottomSheet(false)}
              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '1.2rem', padding: '0 0.25rem' }}
            >
              ×
            </button>
          </div>
          <p style={{ fontSize: '0.8125rem', color: '#CBD5E1', marginBottom: '0.875rem', lineHeight: 1.4 }}>
            Found bad food? No account or OTP needed. Your report is published live on the map.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => navigate('/report')}
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center', fontSize: '0.8125rem', padding: '0.5rem' }}
            >
              <Camera size={14} /> Report Now
            </button>
            <button 
              onClick={() => setShowBottomSheet(false)}
              className="btn-secondary"
              style={{ fontSize: '0.8125rem', padding: '0.5rem 0.875rem', backgroundColor: 'transparent', color: '#94A3B8', borderColor: '#334155' }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
