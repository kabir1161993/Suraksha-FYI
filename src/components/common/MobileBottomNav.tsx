import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, PlusCircle, BarChart3, UserCheck } from 'lucide-react';
import { store } from '../../services/store';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const lang = store.getLanguage();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="mobile-bottom-nav">
      <Link to="/" className={`mobile-bottom-nav-item ${isActive('/') ? 'active' : ''}`}>
        <Home size={20} />
        <span>{lang === 'hi' ? 'होम' : 'Home'}</span>
      </Link>

      <Link to="/map" className={`mobile-bottom-nav-item ${isActive('/map') ? 'active' : ''}`}>
        <MapPin size={20} />
        <span>{lang === 'hi' ? 'मैप' : 'Map'}</span>
      </Link>

      <Link to="/report" className={`mobile-bottom-nav-item ${isActive('/report') ? 'active' : ''}`}>
        <PlusCircle size={22} color={isActive('/report') ? '#F59E0B' : '#F59E0B'} />
        <span style={{ color: '#F59E0B', fontWeight: 700 }}>{lang === 'hi' ? 'रिपोर्ट' : 'Report'}</span>
      </Link>

      <Link to="/dashboard" className={`mobile-bottom-nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
        <BarChart3 size={20} />
        <span>{lang === 'hi' ? 'डैशबोर्ड' : 'Stats'}</span>
      </Link>

      <Link to="/my-reports" className={`mobile-bottom-nav-item ${isActive('/my-reports') ? 'active' : ''}`}>
        <UserCheck size={20} />
        <span>{lang === 'hi' ? 'मेरी रिपोर्ट' : 'My List'}</span>
      </Link>
    </nav>
  );
};
