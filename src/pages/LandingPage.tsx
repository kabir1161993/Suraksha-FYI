import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { store } from '../services/store';
import { Incident } from '../types';
import { HazardMap } from '../components/map/HazardMap';
import { 
  Camera, 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Clock,
  Sparkles,
  Search,
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
    <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: '3rem' }}>
      
      {/* Sticky Floating Action Button (FAB) */}
      <button 
        onClick={() => navigate('/report')} 
        className="fab-button"
        aria-label="Report a Hazard Now"
      >
        <Camera size={22} />
        <span>{lang === 'hi' ? 'रिपोर्ट करें (< 25s)' : 'Report Now (< 25s)'}</span>
      </button>

      {/* Hero Section */}
      <section style={{
        backgroundColor: '#0F172A',
        color: '#fff',
        padding: '2.5rem 0 3rem 0',
        borderBottom: '1px solid #1E293B',
        background: 'radial-gradient(circle at top right, #1E293B 0%, #0F172A 60%)'
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#F59E0B',
                padding: '0.375rem 0.875rem',
                borderRadius: '9999px',
                fontSize: '0.8125rem',
                fontWeight: 700,
                marginBottom: '1rem'
              }}>
                <Zap size={14} />
                {lang === 'hi' ? 'शून्य लॉगिन • 25 सेकंड में रिपोर्ट' : 'Zero Login Wall • < 25 Seconds Submission'}
              </div>

              <h1 style={{
                fontSize: '2.25rem',
                fontWeight: 800,
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
                color: '#fff'
              }}>
                {lang === 'hi' 
                  ? 'भारत का खुला खाद्य सुरक्षा मानचित्र और नागरिक रजिस्ट्रार' 
                  : 'India\'s Open Food Safety Registry & Live Hazard Map'}
              </h1>

              <p style={{
                fontSize: '1.05rem',
                color: '#94A3B8',
                lineHeight: 1.6,
                marginBottom: '1.75rem'
              }}>
                {lang === 'hi'
                  ? 'मिर्च में मिलावट या बिरयानी में कीड़ा? बिना किसी आधार या OTP के 25 सेकंड में फोटो खींचकर रिपोर्ट करें।'
                  : 'Found contaminated or adulterated food? Take a photo, tag the location, and publish to the live map instantly — routing signals straight to Food Safety Officers.'}
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => navigate('/report')}
                  className="btn-primary"
                  style={{ fontSize: '1rem', padding: '0.875rem 1.75rem' }}
                >
                  <Camera size={20} />
                  {lang === 'hi' ? 'खतरे की रिपोर्ट करें' : 'Report a Hazard Now'}
                </button>

                <Link to="/map" className="btn-secondary" style={{ fontSize: '1rem', padding: '0.875rem 1.75rem' }}>
                  <MapPin size={20} />
                  {lang === 'hi' ? 'लाइव मैप देखें' : 'Explore Live Map'}
                </Link>
              </div>
            </div>

            {/* Quick Stat Counter Box */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem'
            }}>
              <div className="glass-card-dark" style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#F59E0B', fontFamily: 'var(--font-mono)' }}>
                  1,247
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#94A3B8', fontWeight: 600 }}>
                  Reports This Month
                </div>
                <div style={{ fontSize: '0.75rem', color: '#22C55E', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <TrendingUp size={12} /> +23% vs last month
                </div>
              </div>

              <div className="glass-card-dark" style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#EF4444', fontFamily: 'var(--font-mono)' }}>
                  84
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#94A3B8', fontWeight: 600 }}>
                  Restaurants Flagged
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.25rem' }}>
                  High risk cluster &gt; 3 reports
                </div>
              </div>

              <div className="glass-card-dark" style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#22C55E', fontFamily: 'var(--font-mono)' }}>
                  12
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#94A3B8', fontWeight: 600 }}>
                  FSO Inspections Triggered
                </div>
                <div style={{ fontSize: '0.75rem', color: '#22C55E', marginTop: '0.25rem' }}>
                  Verified regulatory action
                </div>
              </div>

              <div className="glass-card-dark" style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#3B82F6', fontFamily: 'var(--font-mono)' }}>
                  &lt; 25s
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#94A3B8', fontWeight: 600 }}>
                  Average Report Time
                </div>
                <div style={{ fontSize: '0.75rem', color: '#3B82F6', marginTop: '0.25rem' }}>
                  Zero registration required
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Map & Live Feed Content */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin color="#F59E0B" />
              {lang === 'hi' ? 'लाइव खाद्य सुरक्षा मानचित्र' : 'Live Food Safety Map'}
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
              Real-time crowdsourced violation reports across India. Click pins to inspect details.
            </p>
          </div>

          <Link to="/map" className="btn-secondary" style={{ fontSize: '0.875rem' }}>
            <Filter size={16} /> Full Map & Filters →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Map Container */}
          <div style={{ gridColumn: 'span 2' }}>
            <HazardMap incidents={incidents} height="480px" />
          </div>

          {/* Live Activity Feed */}
          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} color="#F59E0B" /> Live Incident Feed
              </h3>
              <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', backgroundColor: '#FEF3C7', color: '#B45309', borderRadius: '4px', fontWeight: 700 }}>
                POLLED LIVE
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', overflowY: 'auto', maxHeight: '400px' }}>
              {incidents.slice(0, 5).map((inc) => (
                <div 
                  key={inc.incident_id} 
                  onClick={() => navigate(`/restaurant/${inc.fbo_slug}`)}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#F59E0B')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#E2E8F0')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.375rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>
                      {inc.fbo_name}
                    </div>
                    <span className={inc.hazard_severity === 'P0_CRITICAL' ? 'badge-p0' : 'badge-p1'}>
                      {inc.hazard_severity}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '0.375rem' }}>
                    📍 {inc.ward}, {inc.city}
                  </div>

                  <p style={{ fontSize: '0.8125rem', color: '#334155', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    "{inc.user_description}"
                  </p>
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
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '92%',
          maxWidth: '540px',
          backgroundColor: '#0F172A',
          color: '#fff',
          padding: '1.25rem',
          borderRadius: '1rem',
          boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
          zIndex: 1050,
          border: '1px solid #334155'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#F59E0B' }}>
              <Sparkles size={18} /> Found bad or contaminated food?
            </div>
            <button 
              onClick={() => setShowBottomSheet(false)}
              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '1.2rem', padding: '0 0.5rem' }}
            >
              ×
            </button>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#CBD5E1', marginBottom: '1rem', lineHeight: 1.5 }}>
            Report in &lt; 25 seconds. No account, no Aadhaar, no OTP needed. Your report is published immediately to the public live map.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              onClick={() => navigate('/report')}
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center', fontSize: '0.875rem' }}
            >
              <Camera size={16} /> Report Now
            </button>
            <button 
              onClick={() => setShowBottomSheet(false)}
              className="btn-secondary"
              style={{ fontSize: '0.875rem', backgroundColor: 'transparent', color: '#94A3B8', borderColor: '#334155' }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
