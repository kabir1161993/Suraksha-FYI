import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Incident } from '../../types';
import { useNavigate } from 'react-router-dom';

interface HazardMapProps {
  incidents: Incident[];
  selectedCategory?: string;
  selectedSeverity?: string;
  showJurisdictions?: boolean;
  viewMode?: 'pins' | 'heatmap';
  height?: string;
}

export const HazardMap: React.FC<HazardMapProps> = ({
  incidents,
  selectedCategory = 'ALL',
  selectedSeverity = 'ALL',
  showJurisdictions = false,
  viewMode = 'pins',
  height = '500px'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletInstance = useRef<L.Map | null>(null);
  const markersGroup = useRef<L.LayerGroup | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapRef.current) return;

    if (!leafletInstance.current) {
      // Default center: Bengaluru coordinates
      const map = L.map(mapRef.current, {
        center: [12.9716, 77.5946],
        zoom: 12,
        zoomControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | Suraksha.fyi',
        maxZoom: 19
      }).addTo(map);

      markersGroup.current = L.layerGroup().addTo(map);
      leafletInstance.current = map;
    }

    return () => {
      if (leafletInstance.current) {
        leafletInstance.current.remove();
        leafletInstance.current = null;
      }
    };
  }, []);

  // Update Markers & Filters
  useEffect(() => {
    if (!leafletInstance.current || !markersGroup.current) return;

    markersGroup.current.clearLayers();

    const filtered = incidents.filter((inc) => {
      if (selectedSeverity !== 'ALL' && inc.hazard_severity !== selectedSeverity) return false;
      if (selectedCategory !== 'ALL' && inc.category !== selectedCategory) return false;
      return true;
    });

    if (filtered.length === 0) return;

    const bounds = L.latLngBounds([]);

    filtered.forEach((inc) => {
      let color = '#F59E0B'; // P1 Moderate
      let iconSymbol = '⚠️';

      if (inc.hazard_severity === 'P0_CRITICAL') {
        if (inc.hazard_primary === 'VEG_NONVEG_CONTAMINATION') {
          color = '#7C3AED'; // Purple
          iconSymbol = '🟣';
        } else {
          color = '#DC2626'; // Red
          iconSymbol = '🔴';
        }
      } else if (inc.hazard_severity === 'P2_ADVISORY') {
        color = '#3B82F6'; // Blue
        iconSymbol = '🔵';
      } else if (inc.fso_status === 'Inspected & Action Taken') {
        color = '#16A34A'; // Green
        iconSymbol = '🟢';
      }

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            background-color: ${color};
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.35);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            cursor: pointer;
          ">
            ${iconSymbol}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([inc.lat, inc.lng], { icon: customIcon });

      const popupContent = `
        <div style="padding: 4px; font-family: system-ui, sans-serif; max-width: 220px;">
          <div style="font-weight: 700; font-size: 14px; color: #0F172A; margin-bottom: 4px;">
            ${inc.fbo_name}
          </div>
          <div style="font-size: 11px; color: #64748B; margin-bottom: 6px;">
            📍 ${inc.ward}, ${inc.city}
          </div>
          <div style="margin-bottom: 8px;">
            <span style="background: ${color}20; color: ${color}; border: 1px solid ${color}40; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700;">
              ${inc.hazard_primary.replace('_', ' ')}
            </span>
          </div>
          <div style="font-size: 12px; color: #334155; margin-bottom: 8px; font-style: italic;">
            "${inc.user_description.substring(0, 70)}..."
          </div>
          <button id="btn-popup-${inc.incident_id}" style="
            background-color: #F59E0B;
            color: #000;
            border: none;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 700;
            cursor: pointer;
            width: 100%;
          ">
            View Outlet Profile →
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-popup-${inc.incident_id}`);
        if (btn) {
          btn.onclick = () => {
            navigate(`/restaurant/${inc.fbo_slug}`);
          };
        }
      });

      markersGroup.current?.addLayer(marker);
      bounds.extend([inc.lat, inc.lng]);
    });

    if (leafletInstance.current && filtered.length > 0) {
      leafletInstance.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [incidents, selectedCategory, selectedSeverity, navigate]);

  return (
    <div style={{ position: 'relative', width: '100%', height, borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      {/* Map Legend Overlay */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: '12px',
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        color: '#fff',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '11px',
        zIndex: 999,
        backdropFilter: 'blur(4px)',
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        border: '1px solid #334155'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#DC2626' }}>🔴</span> P0 Critical
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#7C3AED' }}>🟣</span> Veg/Non-Veg Mix
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#F59E0B' }}>🟡</span> P1 Moderate
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#3B82F6' }}>🔵</span> P2 Advisory
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#16A34A' }}>🟢</span> FSO Inspected
        </div>
      </div>
    </div>
  );
};
