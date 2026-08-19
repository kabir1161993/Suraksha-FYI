import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../../services/store';
import { Shield, Lock, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('admin@suraksha.fyi');
  const [password, setPassword] = useState<string>('suraksha2026');
  const [error, setError] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = store.loginAdmin(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid admin credentials. Use demo: admin@suraksha.fyi / suraksha2026');
    }
  };

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      backgroundColor: '#0F172A'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        backgroundColor: '#1E293B',
        border: '1px solid #334155',
        borderRadius: '1rem',
        padding: '2.25rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        color: '#fff'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '3.25rem',
            height: '3.25rem',
            borderRadius: '0.75rem',
            backgroundColor: '#F59E0B',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            <Lock size={28} />
          </div>

          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
            Suraksha<span style={{ color: '#F59E0B' }}>.fyi</span> Admin
          </h1>
          <p style={{ fontSize: '0.8125rem', color: '#94A3B8', marginTop: '0.25rem' }}>
            Protected Portal for Food Safety Officers & Moderators
          </p>
        </div>

        {/* Demo Credentials Alert */}
        <div style={{
          backgroundColor: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '0.5rem',
          padding: '0.75rem 1rem',
          fontSize: '0.8125rem',
          color: '#F59E0B',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Sparkles size={18} />
          <div>
            <strong>Demo Admin Credentials:</strong><br />
            Email: <code>admin@suraksha.fyi</code><br />
            Password: <code>suraksha2026</code>
          </div>
        </div>

        {error && (
          <div style={{
            backgroundColor: 'rgba(220, 38, 38, 0.15)',
            border: '1px solid rgba(220, 38, 38, 0.4)',
            borderRadius: '0.5rem',
            padding: '0.75rem',
            fontSize: '0.8125rem',
            color: '#EF4444',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: '0.375rem' }}>
              Official Officer Email
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: '#0F172A',
                border: '1px solid #334155',
                color: '#fff',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: '0.375rem' }}>
              Security Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: '#0F172A',
                border: '1px solid #334155',
                color: '#fff',
                outline: 'none'
              }}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: '0.95rem' }}
          >
            Authenticate & Access Dashboard <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
