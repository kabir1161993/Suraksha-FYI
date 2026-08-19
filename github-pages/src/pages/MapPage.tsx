import React, { useState, useEffect } from 'react';
import { store } from '../services/store';
import { Incident, HazardSeverity, OutletCategory } from '../types';
import { HazardMap } from '../components/map/HazardMap';
import { Filter, MapPin, ShieldAlert, Layers, Search, ListFilter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MapPage: React.FC = () => {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [showJurisdictions, setShowJurisdictions] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'pins' | 'heatmap'>('pins');

  useEffect(() => {
    setIncidents(store.getIncidents(true));
    return store.subscribe(() => {
      setIncidents(store.getIncidents(true));
    });
  }, []);

  const filteredIncidents = incidents.filter((inc) => {
    if (severityFilter !== 'ALL' && inc.hazard_severity !== severityFilter) return false;
    if (categoryFilter !== 'ALL' && inc.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin color="#F59E0B" /> Interactive Hazard Map & Jurisdiction Explorer
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
            Showing {filteredIncidents.length} verified incident pins across Indian cities.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#E2E8F0', padding: '0.25rem', borderRadius: '0.5rem' }}>
          <button 
            onClick={() => setViewMode('pins')}
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: '0.375rem',
              border: 'none',
              backgroundColor: viewMode === 'pins' ? '#fff' : 'transparent',
              color: viewMode === 'pins' ? '#0F172A' : '#64748B',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.8125rem'
            }}
          >
            📌 Pins View
          </button>
          <button 
            onClick={() => setViewMode('heatmap')}
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: '0.375rem',
              border: 'none',
              backgroundColor: viewMode === 'heatmap' ? '#fff' : 'transparent',
              color: viewMode === 'heatmap' ? '#0F172A' : '#64748B',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.8125rem'
            }}
          >
            🔥 Heatmap Density
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{ padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', fontWeight: 700, color: '#334155' }}>
          <Filter size={16} color="#F59E0B" /> Severity:
        </div>
        <select 
          value={severityFilter} 
          onChange={(e) => setSeverityFilter(e.target.value)}
          style={{ padding: '0.4rem 0.75rem', borderRadius: '0.375rem', border: '1px solid #CBD5E1', fontSize: '0.8125rem' }}
        >
          <option value="ALL">All Severities</option>
          <option value="P0_CRITICAL">🔴 P0 Critical</option>
          <option value="P1_MODERATE">🟡 P1 Moderate</option>
          <option value="P2_ADVISORY">🔵 P2 Advisory</option>
        </select>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', fontWeight: 700, color: '#334155', marginLeft: '0.5rem' }}>
          <ListFilter size={16} color="#F59E0B" /> Outlet Type:
        </div>
        <select 
          value={categoryFilter} 
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ padding: '0.4rem 0.75rem', borderRadius: '0.375rem', border: '1px solid #CBD5E1', fontSize: '0.8125rem' }}
        >
          <option value="ALL">All Categories</option>
          <option value="Cloud Kitchen">Cloud Kitchen</option>
          <option value="Restaurant / Café">Restaurant / Dhaba</option>
          <option value="Street Vendor / Stall">Street Vendor</option>
          <option value="Packaged Food">Packaged Food</option>
          <option value="PDS / Ration Shop">PDS Ration Shop</option>
          <option value="Sweet Shop / Mithai">Sweet Shop / Mithai</option>
        </select>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginLeft: 'auto', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={showJurisdictions} 
            onChange={(e) => setShowJurisdictions(e.target.checked)} 
          />
          <Layers size={16} color="#3B82F6" /> Show FSSAI DDO Boundaries
        </label>
      </div>

      {/* Main Grid View */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        <div style={{ gridColumn: 'span 2' }}>
          <HazardMap 
            incidents={filteredIncidents} 
            selectedCategory={categoryFilter}
            selectedSeverity={severityFilter}
            showJurisdictions={showJurisdictions}
            viewMode={viewMode}
            height="620px" 
          />
        </div>

        {/* Filtered Incidents Sidebar List */}
        <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0F172A' }}>
            Active Incident Pins ({filteredIncidents.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', maxHeight: '540px' }}>
            {filteredIncidents.map((inc) => (
              <div 
                key={inc.incident_id}
                onClick={() => navigate(`/restaurant/${inc.fbo_slug}`)}
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{inc.fbo_name}</span>
                  <span className={inc.hazard_severity === 'P0_CRITICAL' ? 'badge-p0' : 'badge-p1'} style={{ fontSize: '0.65rem' }}>
                    {inc.hazard_severity}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '0.25rem' }}>
                  📍 {inc.ward}, {inc.city}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#334155' }}>
                  Category: <strong>{inc.category}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
