import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { store } from '../../services/store';
import { 
  Shield, 
  Map, 
  PlusCircle, 
  BarChart3, 
  Search, 
  FileText, 
  Lock, 
  Globe, 
  UserCheck, 
  Code2,
  Menu,
  X
} from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lang, setLang] = useState<'en' | 'hi'>(store.getLanguage());
  const [adminUser, setAdminUser] = useState(store.getAdminUser());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    return store.subscribe(() => {
      setLang(store.getLanguage());
      setAdminUser(store.getAdminUser());
    });
  }, []);

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'hi' : 'en';
    store.setLanguage(nextLang);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header style={{
      backgroundColor: '#0F172A',
      color: '#fff',
      borderBottom: '1px solid #1E293B',
      position: 'sticky',
      top: 0,
      zIndex: 1100,
      boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '4rem',
        padding: '0 1rem'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
          <div style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '0.5rem',
            backgroundColor: '#F59E0B',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800
          }}>
            <Shield size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              Suraksha<span style={{ color: '#F59E0B' }}>.fyi</span>
              <span style={{ fontSize: '0.65rem', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', backgroundColor: '#1E293B', color: '#F59E0B', border: '1px solid #334155' }}>
                INDIA CIVIC TECH
              </span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
              {lang === 'hi' ? 'बिना लॉगिन खाद्य सुरक्षा रजिस्ट्री' : 'Zero-Login Food Safety Registry'}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav">
          <Link to="/map" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 0.875rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: isActive('/map') ? '#F59E0B' : '#94A3B8',
            backgroundColor: isActive('/map') ? 'rgba(245, 158, 11, 0.1)' : 'transparent'
          }}>
            <Map size={16} />
            {lang === 'hi' ? 'लाइव मैप' : 'Live Map'}
          </Link>

          <Link to="/report" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 0.875rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: isActive('/report') ? '#F59E0B' : '#94A3B8',
            backgroundColor: isActive('/report') ? 'rgba(245, 158, 11, 0.1)' : 'transparent'
          }}>
            <PlusCircle size={16} />
            {lang === 'hi' ? 'रिपोर्ट दर्ज करें' : 'Report Hazard'}
          </Link>

          <Link to="/dashboard" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 0.875rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: isActive('/dashboard') ? '#F59E0B' : '#94A3B8',
            backgroundColor: isActive('/dashboard') ? 'rgba(245, 158, 11, 0.1)' : 'transparent'
          }}>
            <BarChart3 size={16} />
            {lang === 'hi' ? 'शहर डैशबोर्ड' : 'City Dashboard'}
          </Link>

          <Link to="/search" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 0.875rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: isActive('/search') ? '#F59E0B' : '#94A3B8',
            backgroundColor: isActive('/search') ? 'rgba(245, 158, 11, 0.1)' : 'transparent'
          }}>
            <Search size={16} />
            {lang === 'hi' ? 'खोजें' : 'Search'}
          </Link>

          <Link to="/my-reports" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 0.875rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: isActive('/my-reports') ? '#F59E0B' : '#94A3B8',
            backgroundColor: isActive('/my-reports') ? 'rgba(245, 158, 11, 0.1)' : 'transparent'
          }}>
            <UserCheck size={16} />
            {lang === 'hi' ? 'मेरी रिपोर्ट' : 'My Reports'}
          </Link>

          <Link to="/api" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 0.875rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: isActive('/api') ? '#F59E0B' : '#94A3B8',
            backgroundColor: isActive('/api') ? 'rgba(245, 158, 11, 0.1)' : 'transparent'
          }}>
            <Code2 size={16} />
            API
          </Link>

          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.375rem 0.625rem',
              borderRadius: '0.375rem',
              backgroundColor: '#1E293B',
              color: '#F59E0B',
              border: '1px solid #334155',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginLeft: '0.5rem'
            }}
          >
            <Globe size={14} />
            {lang === 'en' ? 'हिन्दी' : 'English'}
          </button>

          {/* Separate Admin Link / Portal Button */}
          <Link to={adminUser ? "/admin" : "/admin/login"} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.45rem 0.875rem',
            borderRadius: '0.375rem',
            fontSize: '0.8rem',
            fontWeight: 700,
            backgroundColor: adminUser ? '#16A34A' : '#334155',
            color: '#fff',
            border: adminUser ? '1px solid #22C55E' : '1px solid #475569',
            marginLeft: '0.5rem'
          }}>
            <Lock size={14} />
            {adminUser ? 'Admin Portal' : 'Admin Login'}
          </Link>
        </nav>
      </div>
    </header>
  );
};
