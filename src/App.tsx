import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MobileBottomNav } from './components/common/MobileBottomNav';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { ReportWizardPage } from './pages/ReportWizardPage';
import { MapPage } from './pages/MapPage';
import { RestaurantProfilePage } from './pages/RestaurantProfilePage';
import { DashboardPage } from './pages/DashboardPage';
import { SearchPage } from './pages/SearchPage';
import { MyReportsPage } from './pages/MyReportsPage';
import { ApiDocsPage } from './pages/ApiDocsPage';
import { AboutPage } from './pages/AboutPage';

// Admin Pages (Separate Login & UI)
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

export function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/report" element={<ReportWizardPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/restaurant/:slug" element={<RestaurantProfilePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/my-reports" element={<MyReportsPage />} />
            <Route path="/api" element={<ApiDocsPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Separate Admin Authentication & Portal */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Routes>
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    </Router>
  );
}

export default App;
