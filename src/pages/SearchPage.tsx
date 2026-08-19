import React, { useState, useEffect } from 'react';
import { store } from '../services/store';
import { Incident } from '../types';
import { Search, Building2, MapPin, AlertTriangle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setIncidents(store.getIncidents(true));
    return store.subscribe(() => {
      setIncidents(store.getIncidents(true));
    });
  }, []);

  const results = incidents.filter((i) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      i.fbo_name.toLowerCase().includes(q) ||
      i.fssai_license.includes(q) ||
      i.city.toLowerCase().includes(q) ||
      i.ward.toLowerCase().includes(q) ||
      i.hazard_primary.toLowerCase().includes(q)
    );
  });

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Search color="#F59E0B" /> Search Registry
      </h1>
      <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.5rem' }}>
        Search by restaurant name, 14-digit FSSAI license, city, or hazard type.
      </p>

      {/* Search Input Bar */}
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="Search e.g. Zomato Cloud Kitchen, 11223344556677, Koramangala..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem 1rem 1rem 3rem',
            borderRadius: '0.75rem',
            border: '2px solid #F59E0B',
            fontSize: '1rem',
            outline: 'none',
            boxShadow: '0 4px 12px rgba(245,158,11,0.15)'
          }}
        />
        <Search size={22} color="#F59E0B" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
      </div>

      {/* Results Header */}
      <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#64748B', marginBottom: '1rem' }}>
        Found {results.length} matching incident reports
      </div>

      {/* Results Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {results.map((inc) => (
          <div 
            key={inc.incident_id}
            onClick={() => navigate(`/restaurant/${inc.fbo_slug}`)}
            className="glass-card"
            style={{
              padding: '1.25rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0F172A', marginBottom: '0.25rem' }}>
                {inc.fbo_name}
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: '0.375rem' }}>
                📍 {inc.ward}, {inc.city} • FSSAI: <span style={{ fontFamily: 'var(--font-mono)' }}>{inc.fssai_license}</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#334155' }}>
                "{inc.user_description.substring(0, 90)}..."
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span className={inc.hazard_severity === 'P0_CRITICAL' ? 'badge-p0' : 'badge-p1'} style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
                {inc.hazard_severity}
              </span>
              <div style={{ fontSize: '0.75rem', color: '#F59E0B', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                View Profile <ArrowRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
