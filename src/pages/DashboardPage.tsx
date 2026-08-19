import React, { useState, useEffect } from 'react';
import { store } from '../services/store';
import { Incident } from '../types';
import { BarChart3, TrendingUp, AlertTriangle, Building2, Download, Award, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('ALL');

  useEffect(() => {
    setIncidents(store.getIncidents(true));
    return store.subscribe(() => {
      setIncidents(store.getIncidents(true));
    });
  }, []);

  const cityFiltered = selectedCity === 'ALL' ? incidents : incidents.filter((i) => i.city === selectedCity);

  // Group by FBO for Hall of Shame
  const fboCounts: Record<string, { count: number; p0: number; slug: string; city: string }> = {};
  cityFiltered.forEach((i) => {
    if (!fboCounts[i.fbo_name]) {
      fboCounts[i.fbo_name] = { count: 0, p0: 0, slug: i.fbo_slug, city: i.city };
    }
    fboCounts[i.fbo_name].count += 1;
    if (i.hazard_severity === 'P0_CRITICAL') fboCounts[i.fbo_name].p0 += 1;
  });

  const hallOfShame = Object.entries(fboCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5);

  // Category breakdown
  const categoryCounts: Record<string, number> = {};
  cityFiltered.forEach((i) => {
    categoryCounts[i.hazard_primary] = (categoryCounts[i.hazard_primary] || 0) + 1;
  });

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 color="#F59E0B" /> City & Regional Analytics Dashboard
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
            Public safety metrics, restaurant hall of shame, and regulatory response rates.
          </p>
        </div>

        {/* City Filter */}
        <select 
          value={selectedCity} 
          onChange={(e) => setSelectedCity(e.target.value)}
          style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1', fontWeight: 700, fontSize: '0.875rem' }}
        >
          <option value="ALL">All Indian Cities</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Patna">Patna</option>
        </select>
      </div>

      {/* Stats Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#F59E0B', fontFamily: 'var(--font-mono)' }}>
            {cityFiltered.length}
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>Total Reports</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#DC2626', fontFamily: 'var(--font-mono)' }}>
            {Object.keys(fboCounts).length}
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>Flagged Outlets</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#22C55E', fontFamily: 'var(--font-mono)' }}>
            12
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>FSO Inspections Triggered</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#3B82F6', fontFamily: 'var(--font-mono)' }}>
            31%
          </div>
          <div style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>Merchant Refund Rate</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Hall of Shame */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '1rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🏆 Restaurant Hall of Shame (Most Reports)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {hallOfShame.map(([name, item], idx) => (
              <div 
                key={name}
                onClick={() => navigate(`/restaurant/${item.slug}`)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>
                    {idx + 1}. {name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    📍 {item.city}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: 800, color: '#DC2626', fontSize: '1.125rem', fontFamily: 'var(--font-mono)' }}>
                    {item.count}
                  </span>
                  <div style={{ fontSize: '0.65rem', color: '#64748B' }}>reports</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hazard Breakdown */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '1rem', color: '#0F172A' }}>
            Hazard Breakdown
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / cityFiltered.length) * 100) || 0;
              return (
                <div key={cat}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    <span>{cat.replace('_', ' ')}</span>
                    <span>{pct}% ({count})</span>
                  </div>
                  <div style={{ height: '8px', borderRadius: '4px', backgroundColor: '#E2E8F0', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', backgroundColor: '#F59E0B' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* City League Table */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F172A' }}>
            City League Table (Civic Engagement)
          </h3>
          <button 
            onClick={() => alert('Downloading Suraksha.fyi full CSV dataset...')}
            className="btn-secondary" 
            style={{ fontSize: '0.8125rem' }}
          >
            <Download size={14} /> Export Dataset (CSV)
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E2E8F0', color: '#64748B' }}>
              <th style={{ padding: '0.75rem' }}>Rank</th>
              <th style={{ padding: '0.75rem' }}>City</th>
              <th style={{ padding: '0.75rem' }}>Total Reports</th>
              <th style={{ padding: '0.75rem' }}>FSO Actions</th>
              <th style={{ padding: '0.75rem' }}>Merchant Resolution</th>
            </tr>
          </thead>
          <tbody>
            {[
              { rank: 1, city: 'Bengaluru', reports: 1247, fso: 12, res: '21%' },
              { rank: 2, city: 'Mumbai', reports: 982, fso: 8, res: '18%' },
              { rank: 3, city: 'Delhi', reports: 743, fso: 6, res: '15%' },
              { rank: 4, city: 'Patna', reports: 312, fso: 4, res: '12%' },
            ].map((row) => (
              <tr key={row.city} style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '0.75rem', fontWeight: 700 }}>#{row.rank}</td>
                <td style={{ padding: '0.75rem', fontWeight: 700, color: '#0F172A' }}>{row.city}</td>
                <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)' }}>{row.reports}</td>
                <td style={{ padding: '0.75rem', color: '#22C55E', fontWeight: 700 }}>{row.fso} inspected</td>
                <td style={{ padding: '0.75rem' }}>{row.res}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
