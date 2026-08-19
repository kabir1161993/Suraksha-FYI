import React, { useState } from 'react';
import { DispatchEvent } from '../../types';
import { store } from '../../services/store';
import { FileText, Send, CheckCircle2, Download, X, Mail } from 'lucide-react';

interface DispatchModalProps {
  dispatch: DispatchEvent;
  onClose: () => void;
}

export const DispatchPreviewModal: React.FC<DispatchModalProps> = ({ dispatch, onClose }) => {
  const [activeTab, setActiveTab] = useState<'email' | 'rti'>('email');

  const handleUpdateStatus = (status: 'ACKNOWLEDGED' | 'INSPECTED') => {
    store.updateDispatchStatus(dispatch.dispatch_id, status);
    alert(`Dispatch status updated to: ${status}`);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="glass-card-dark" 
        style={{ width: '100%', maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto', padding: '1.75rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #334155', paddingBottom: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail color="#F59E0B" /> FSSAI DDO Alert & RTI Engine
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
              Ref: {dispatch.dispatch_id} • Cluster: {dispatch.cluster_id}
            </span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', backgroundColor: '#0F172A', padding: '0.25rem', borderRadius: '0.5rem' }}>
          <button 
            onClick={() => setActiveTab('email')}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '0.375rem',
              border: 'none',
              backgroundColor: activeTab === 'email' ? '#F59E0B' : 'transparent',
              color: activeTab === 'email' ? '#000' : '#94A3B8',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.8125rem'
            }}
          >
            📧 Generated DDO Notice Email
          </button>
          <button 
            onClick={() => setActiveTab('rti')}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '0.375rem',
              border: 'none',
              backgroundColor: activeTab === 'rti' ? '#F59E0B' : 'transparent',
              color: activeTab === 'rti' ? '#000' : '#94A3B8',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.8125rem'
            }}
          >
            📄 Pre-filled RTI Draft (PDF)
          </button>
        </div>

        {/* EMAIL NOTICE TAB */}
        {activeTab === 'email' && (
          <div style={{ backgroundColor: '#0F172A', border: '1px solid #334155', borderRadius: '0.5rem', padding: '1.25rem', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', lineHeight: 1.6, color: '#CBD5E1', marginBottom: '1.5rem' }}>
            <div><strong>FROM:</strong> dispatch@suraksha.fyi</div>
            <div><strong>TO:</strong> {dispatch.ddo_email}</div>
            <div><strong>SUBJECT:</strong> [AUTOMATED CLUSTER ALERT] {dispatch.report_count} incidents at FSSAI License {dispatch.fssai_license} ({dispatch.fbo_name}, {dispatch.city})</div>
            <hr style={{ borderColor: '#334155', margin: '0.75rem 0' }} />
            <p>Dear District Designated Officer,</p>
            <br />
            <p>Suraksha.fyi's automated monitoring has detected a cluster of {dispatch.report_count} verified food safety reports against the following Food Business Operator within the past 7 days:</p>
            <br />
            <div><strong>ESTABLISHMENT:</strong> {dispatch.fbo_name}</div>
            <div><strong>FSSAI LICENSE:</strong> {dispatch.fssai_license}</div>
            <div><strong>LOCATION:</strong> {dispatch.city}, Karnataka</div>
            <div><strong>CRITICAL VIOLATIONS (P0):</strong> {dispatch.p0_count}</div>
            <br />
            <p>This notification is generated automatically under Section 31 of the Food Safety and Standards Act, 2006. We request an immediate FSO inspection.</p>
          </div>
        )}

        {/* RTI DRAFT TAB */}
        {activeTab === 'rti' && (
          <div style={{ backgroundColor: '#0F172A', border: '1px solid #334155', borderRadius: '0.5rem', padding: '1.25rem', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', lineHeight: 1.6, color: '#CBD5E1', marginBottom: '1.5rem' }}>
            <div style={{ textAlign: 'center', fontWeight: 800, color: '#F59E0B', marginBottom: '0.5rem' }}>
              APPLICATION UNDER RIGHT TO INFORMATION ACT, 2005
            </div>
            <div>To: Public Information Officer, FSSAI District Office, {dispatch.city}</div>
            <div>Subject: Information regarding food safety inspection at {dispatch.fbo_name}, FSSAI License #{dispatch.fssai_license}</div>
            <br />
            <p>I request the following information under Section 6 of the RTI Act, 2005:</p>
            <ol style={{ paddingLeft: '1.25rem' }}>
              <li>Date of last inspection carried out at above establishment.</li>
              <li>Action taken pursuant to public complaints filed on {new Date(dispatch.triggered_at).toLocaleDateString()}.</li>
              <li>Copy of inspection report filed in past 6 months.</li>
            </ol>
          </div>
        )}

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button 
            onClick={() => handleUpdateStatus('ACKNOWLEDGED')} 
            className="btn-secondary" 
            style={{ fontSize: '0.8125rem', backgroundColor: 'transparent', color: '#F59E0B', borderColor: '#F59E0B' }}
          >
            Mark DDO Acknowledged
          </button>

          <button 
            onClick={() => handleUpdateStatus('INSPECTED')} 
            className="btn-primary" 
            style={{ fontSize: '0.8125rem', backgroundColor: '#16A34A', color: '#fff' }}
          >
            <CheckCircle2 size={16} /> Mark FSO Inspected
          </button>
        </div>
      </div>
    </div>
  );
};
