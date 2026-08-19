import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { store } from '../../services/store';
import { 
  Shield, 
  Map, 
  PlusCircle, 
  BarChart3, 
  Search, 
  Lock, 
  Globe, 
  UserCheck, 
  Code2,
  Menu,
  X,
  Info
} from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();
  const [lang, setLang] = useState<'en' | 'hi'>(store.getLanguage());
  const [adminUser, setAdminUser] = useState(store.getAdminUser());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    return store.subscribe(() => {
      setLang(store.getLanguage());
      setAdminUser(store.getAdminUser());
    });
  }, []);

  // Close mobile drawer when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

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
        height: '4rem'
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
            </div>
            <div style={{ fontSize: '0.65rem', color: '#94A3B8' }}>
              {lang === 'hi' ? 'बिना लॉगिन खाद्य सुरक्षा' : 'Zero-Login Food Safety'}
            </div>
          </div>
        </Link>

        {/* Right side controls for Desktop */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }} className="desktop-nav">
          <Link to="/map" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: isActive('/map') ? '#F59E0B' : '#94A3B8',
            backgroundColor: isActive('/map') ? 'rgba(245, 158, 11, 0.1)' : 'transparent'
          }}>
            <Map size={16} />
            {lang === 'hi' ? 'मैप' : 'Map'}
          </Link>

          <Link to="/report" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: isActive('/report') ? '#F59E0B' : '#94A3B8',
            backgroundColor: isActive('/report') ? 'rgba(245, 158, 11, 0.1)' : 'transparent'
          }}>
            <PlusCircle size={16} />
            {lang === 'hi' ? 'रिपोर्ट' : 'Report'}
          </Link>

          <Link to="/dashboard" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: isActive('/dashboard') ? '#F59E0B' : '#94A3B8',
            backgroundColor: isActive('/dashboard') ? 'rgba(245, 158, 11, 0.1)' : 'transparent'
          }}>
            <BarChart3 size={16} />
            {lang === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}
          </Link>

          <Link to="/search" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: isActive('/search') ? '#F59E0B' : '#94A3B8',
            backgroundColor: isActive('/search') ? 'rgba(245, 158, 11, 0.1)' : 'transparent'
          }}>
            <Search size={16} />
            {lang === 'hi' ? 'खोजें' : 'Search'}
          </Link>

          <Link to="/api" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 0.75rem',
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
              padding: '0.4rem 0.625rem',
              borderRadius: '0.375rem',
              backgroundColor: '#1E293B',
              color: '#F59E0B',
              border: '1px solid #334155',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginLeft: '0.375rem'
            }}
          >
            <Globe size={14} />
            {lang === 'en' ? 'हिन्दी' : 'English'}
          </button>

          {/* Separate Admin Portal Link */}
          <Link to={adminUser ? "/admin" : "/admin/login"} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.4rem 0.75rem',
            borderRadius: '0.375rem',
            fontSize: '0.8rem',
            fontWeight: 700,
            backgroundColor: adminUser ? '#16A34A' : '#334155',
            color: '#fff',
            border: adminUser ? '1px solid #22C55E' : '1px solid #475569',
            marginLeft: '0.375rem'
          }}>
            <Lock size={14} />
            {adminUser ? 'Admin' : 'Login'}
          </Link>
        </nav>

        {/* Mobile Hamburger & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="mobile-header-controls">
          <button 
            onClick={toggleLanguage}
            style={{
              padding: '0.375rem 0.625rem',
              borderRadius: '0.375rem',
              backgroundColor: '#1E293B',
              color: '#F59E0B',
              border: '1px solid #334155',
              fontSize: '0.75rem',
              fontWeight: 700
            }}
          >
            {lang === 'en' ? 'हिन्दी' : 'EN'}
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            aria-label="Toggle mobile navigation menu"
          >
            {mobileMenuOpen ? <X size={26} color="#F59E0B" /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out Menu Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#0F172A',
          borderBottom: '1px solid #334155',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <Link to="/" style={{ padding: '0.625rem', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={18} color="#F59E0B" /> Home
          </Link>
          <Link to="/map" style={{ padding: '0.625rem', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Map size={18} color="#F59E0B" /> Live Hazard Map
          </Link>
          <Link to="/report" style={{ padding: '0.625rem', color: '#F59E0B', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PlusCircle size={18} /> Submit Report (&lt; 25s)
          </Link>
          <Link to="/dashboard" style={{ padding: '0.625rem', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={18} color="#F59E0B" /> City Dashboard & Analytics
          </Link>
          <Link to="/search" style={{ padding: '0.625rem', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Search size={18} color="#F59E0B" /> Search Outlets & Licenses
          </Link>
          <Link to="/my-reports" style={{ padding: '0.625rem', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserCheck size={18} color="#F59E0B" /> My Submissions Tracker
          </Link>
          <Link to="/api" style={{ padding: '0.625rem', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Code2 size={18} color="#F59E0B" /> Open Data API & Playground
          </Link>
          <Link to="/about" style={{ padding: '0.625rem', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Info size={18} color="#F59E0B" /> DPDP Compliance & Architecture
          </Link>

          <hr style={{ borderColor: '#1E293B', margin: '0.25rem 0' }} />

          <Link to={adminUser ? "/admin" : "/admin/login"} style={{
            padding: '0.75rem',
            borderRadius: '0.5rem',
            backgroundColor: '#1E293B',
            color: '#F59E0B',
            border: '1px solid #334155',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <Lock size={18} /> {adminUser ? 'Go to Admin Console' : 'Officer Admin Login'}
          </Link>
        </div>
      )}
    </header>
  );
};
