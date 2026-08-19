import React, { useState, useEffect } from 'react';
import { store } from '../services/store';
import { Incident } from '../types';
import { UserCheck, Clock, MapPin, Share2, Shield, PlusCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export const MyReportsPage: React.FC = () => {
  const navigate = useNavigate();
  const [myIncidents, setMyIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    setMyIncidents(store.getMyIncidents());
    return store.subscribe(() => {
      setMyIncidents(store.getMyIncidents());
    });
  }, []);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '720px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserCheck color="#F59E0B" /> My Submissions
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
            Submissions stored on this device. Status updates poll automatically.
          </p>
        </div>

        <button onClick={() => navigate('/report')} className="btn-primary" style={{ fontSize: '0.875rem' }}>
          <PlusCircle size={16} /> New Report
        </button>
      </div>

      {myIncidents.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📋</div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
            No submissions recorded on this device
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.5rem' }}>
            Found bad or contaminated food? Submit a zero-login report in under 25 seconds.
          </p>
          <button onClick={() => navigate('/report')} className="btn-primary">
            Report a Hazard Now
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {myIncidents.map((inc) => (
            <div key={inc.incident_id} className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#B45309', backgroundColor: '#FEF3C7', padding: '0.2rem 0.5rem', borderRadius: '0.25rem', display: 'inline-block', marginBottom: '0.375rem' }}>
                    {inc.incident_id}
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A' }}>
                    {inc.fbo_name}
                  </h3>
                </div>

                <div style={{
                  padding: '0.375rem 0.75rem',
                  borderRadius: '0.375rem',
                  backgroundColor: '#F0FDF4',
                  color: '#16A34A',
                  border: '1px solid #BBF7D0',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem'
                }}>
                  <CheckCircle2 size={16} /> {inc.fso_status}
                </div>
              </div>

              <div style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: '0.75rem' }}>
                📍 {inc.ward}, {inc.city} • Submitted: {new Date(inc.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>

              <p style={{ fontSize: '0.875rem', color: '#334155', marginBottom: '1rem', fontStyle: 'italic' }}>
                "{inc.user_description}"
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid #E2E8F0', paddingTop: '0.875rem' }}>
                <Link to={`/restaurant/${inc.fbo_slug}`} className="btn-secondary" style={{ fontSize: '0.8125rem', padding: '0.375rem 0.75rem' }}>
                  <MapPin size={14} /> View Outlet Profile
                </Link>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/restaurant/${inc.fbo_slug}`);
                    alert('Incident link copied!');
                  }} 
                  className="btn-secondary" 
                  style={{ fontSize: '0.8125rem', padding: '0.375rem 0.75rem' }}
                >
                  <Share2 size={14} /> Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
