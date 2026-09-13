import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const MapComponent = ({ 
  center = [28.6139, 77.2090], 
  zoom = 13, 
  markers = [], 
  routes = [],
  height = '350px' 
}) => {
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Fix marker icons in Leaflet
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    if (!mapRef.current) {
      if (containerRef.current._leaflet_id) {
        containerRef.current._leaflet_id = null;
      }
      mapRef.current = L.map(containerRef.current).setView(center, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    } else {
      mapRef.current.setView(center, zoom);
    }

    const map = mapRef.current;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    // Add Markers
    if (markers.length > 0) {
      markers.forEach((m) => {
        if (m.lat && m.lng) {
          const marker = L.marker([m.lat, m.lng]).addTo(map);
          if (m.title || m.popup) {
            marker.bindPopup(`<b>${m.title || ''}</b><p>${m.popup || ''}</p>`);
          }
        }
      });
    } else {
      // Default center marker
      L.marker(center).addTo(map).bindPopup('<b>Current Location</b><br>Connaught Place, New Delhi');
    }

    // Add Polyline Route if available
    if (routes.length > 0) {
      const line = L.polyline(routes, { color: '#3b82f6', weight: 4, opacity: 0.8 }).addTo(map);
      map.fitBounds(line.getBounds(), { padding: [20, 20] });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, zoom, markers, routes]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
      <div ref={containerRef} style={{ height, width: '100%', zIndex: 10 }}></div>
    </div>
  );
};

export default MapComponent;
