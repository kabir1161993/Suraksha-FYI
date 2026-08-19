import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../../services/store';
import { Incident, DispatchEvent, ModerationStatus } from '../../types';
import { DispatchPreviewModal } from '../../components/admin/DispatchPreviewModal';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  LogOut, 
  Clock, 
  Mail, 
  FileText, 
  AlertTriangle,
  Building2,
  Filter,
  Check,
  Ban
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(store.getAdminUser());
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [dispatches, setDispatches] = useState<DispatchEvent[]>([]);
  const [activeTab, setActiveTab] = useState<'moderation' | 'dispatches'>('moderation');
  const [modFilter, setModFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');

  const [selectedDispatch, setSelectedDispatch] = useState<DispatchEvent | null>(null);

  useEffect(() => {
    const user = store.getAdminUser();
    if (!user) {
      navigate('/admin/login');
      return;
    }
    setAdminUser(user);
    setIncidents(store.getIncidents(false));
    setDispatches(store.getDispatches());

    return store.subscribe(() => {
      setAdminUser(store.getAdminUser());
      setIncidents(store.getIncidents(false));
      setDispatches(store.getDispatches());
    });
  }, [navigate]);

  const handleLogout = () => {
    store.logoutAdmin();
    navigate('/admin/login');
  };

  const handleApprove = (id: string) => {
    store.setModerationStatus(id, 'APPROVED');
  };

  const handleReject = (id: string) => {
    store.setModerationStatus(id, 'REJECTED');
  };

  const filteredIncidents = incidents.filter((i) => {
    if (modFilter === 'ALL') return true;
    return i.moderation_status === modFilter;
  });

  if (!adminUser) return null;

  return (
    <div style={{ backgroundColor: '#0F172A', minHeight: '100vh', color: '#fff', paddingBottom: '4rem' }}>
      
      {/* Admin Subheader Bar */}
      <div style={{ backgroundColor: '#1E293B', borderBottom: '1px solid #334155', padding: '1rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ backgroundColor: '#F59E0B', color: '#000', padding: '0.5rem', borderRadius: '0.5rem', display: 'flex' }}>
              <Lock size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                Internal Moderation & FSSAI Dispatch Console
              </h2>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                Authenticated as: <strong>{adminUser.email}</strong> • Role: <span style={{ color: '#F59E0B' }}>{adminUser.role}</span>
              </div>
            </div>
          </div>

          <button onClick={handleLogout} className="btn-secondary" style={{ backgroundColor: '#334155', color: '#fff', borderColor: '#475569', fontSize: '0.8125rem' }}>
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2rem' }}>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #334155', paddingBottom: '0.75rem' }}>
          <button 
            onClick={() => setActiveTab('moderation')}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '0.5rem',
              border: 'none',
              backgroundColor: activeTab === 'moderation' ? '#F59E0B' : 'transparent',
              color: activeTab === 'moderation' ? '#000' : '#94A3B8',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <ShieldCheck size={18} /> Incident Moderation Queue ({incidents.filter(i => i.moderation_status === 'PENDING').length} Pending)
          </button>

          <button 
            onClick={() => setActiveTab('dispatches')}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '0.5rem',
              border: 'none',
              backgroundColor: activeTab === 'dispatches' ? '#F59E0B' : 'transparent',
              color: activeTab === 'dispatches' ? '#000' : '#94A3B8',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Mail size={18} /> Automated DDO Dispatches & RTI ({dispatches.length})
          </button>
        </div>

        {/* MODERATION TAB */}
        {activeTab === 'moderation' && (
          <div>
            {/* Moderation Status Subfilters */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {(['PENDING', 'APPROVED', 'REJECTED', 'ALL'] as const).map((st) => (
                <button 
                  key={st}
                  onClick={() => setModFilter(st)}
                  style={{
                    padding: '0.375rem 0.875rem',
                    borderRadius: '0.375rem',
                    border: '1px solid #334155',
                    backgroundColor: modFilter === st ? '#F59E0B' : '#1E293B',
                    color: modFilter === st ? '#000' : '#CBD5E1',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {st} ({incidents.filter(i => st === 'ALL' ? true : i.moderation_status === st).length})
                </button>
              ))}
            </div>

            {/* Moderation Items Queue */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {filteredIncidents.map((inc) => (
                <div key={inc.incident_id} className="glass-card-dark" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: '#F59E0B', fontWeight: 700 }}>
                          {inc.incident_id}
                        </span>
                        <span className={inc.hazard_severity === 'P0_CRITICAL' ? 'badge-p0' : 'badge-p1'}>
                          {inc.hazard_severity}
                        </span>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.5rem',
                          borderRadius: '0.25rem',
                          backgroundColor: inc.moderation_status === 'APPROVED' ? '#16A34A' : inc.moderation_status === 'REJECTED' ? '#DC2626' : '#EAB308',
                          color: '#fff'
                        }}>
                          {inc.moderation_status}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#fff' }}>
                        {inc.fbo_name}
                      </h3>
                      <div style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>
                        📍 {inc.ward}, {inc.city} • Category: <strong>{inc.category}</strong> • FSSAI: <span style={{ fontFamily: 'var(--font-mono)' }}>{inc.fssai_license}</span>
                      </div>
                    </div>

                    {/* Moderation Controls */}
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => handleApprove(inc.incident_id)}
                        className="btn-success"
                        style={{ fontSize: '0.8125rem' }}
                      >
                        <Check size={16} /> Approve & Publish
                      </button>

                      <button 
                        onClick={() => handleReject(inc.incident_id)}
                        className="btn-danger"
                        style={{ fontSize: '0.8125rem' }}
                      >
                        <Ban size={16} /> Reject (Spam)
                      </button>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.875rem', color: '#CBD5E1', lineHeight: 1.5, marginBottom: '1rem', fontStyle: 'italic' }}>
                    "{inc.user_description}"
                  </p>

                  {inc.evidence_url && (
                    <div style={{ width: '140px', height: '90px', borderRadius: '0.375rem', overflow: 'hidden', border: '1px solid #334155' }}>
                      <img src={inc.evidence_url} alt="Evidence" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DISPATCHES TAB */}
        {activeTab === 'dispatches' && (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>
              Automated FSSAI Cluster Alerts & RTI Log
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginBottom: '1.5rem' }}>
              Triggered automatically when an establishment reaches ≥3 reports in 7 days or receives a P0 Critical violation.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {dispatches.map((disp) => (
                <div key={disp.dispatch_id} className="glass-card-dark" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: '#F59E0B', fontWeight: 700 }}>
                        {disp.dispatch_id}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '0.25rem',
                        backgroundColor: disp.status === 'INSPECTED' ? '#16A34A' : '#3B82F6',
                        color: '#fff'
                      }}>
                        {disp.status}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>
                      {disp.fbo_name}
                    </h4>
                    <div style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>
                      📍 {disp.city} • Target: <code>{disp.ddo_email}</code> • Reports: <strong>{disp.report_count}</strong>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedDispatch(disp)}
                    className="btn-primary" 
                    style={{ fontSize: '0.8125rem' }}
                  >
                    <FileText size={16} /> Preview DDO Email & RTI Draft
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dispatch Modal */}
      {selectedDispatch && (
        <DispatchPreviewModal 
          dispatch={selectedDispatch} 
          onClose={() => setSelectedDispatch(null)} 
        />
      )}
    </div>
  );
};
