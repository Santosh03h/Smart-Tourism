import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import DemoBadge from '../components/DemoBadge';
import SafetyScoreCircle from '../components/SafetyScoreCircle';
import MapComponent from '../components/MapComponent';
import { useGeolocation } from '../hooks/useGeolocation';
import { Activity, MapPin, CloudSun, Car, Users, RefreshCw, Radio, Shield } from 'lucide-react';

const LiveMonitoring = () => {
  const geo = useGeolocation();
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [monitoringData, setMonitoringData] = useState({
    location: 'Connaught Place, New Delhi',
    lat: 28.6139,
    lng: 77.2090,
    temp: 32,
    condition: 'Partly Cloudy',
    traffic: 'Moderate (24 km/h avg)',
    crowdLevel: 'Moderate (42% density)',
    safetyScore: 82,
    riskLevel: 'LOW'
  });

  useEffect(() => {
    if (geo.coordinates) {
      setMonitoringData(prev => ({
        ...prev,
        lat: geo.coordinates.lat,
        lng: geo.coordinates.lng,
        location: geo.address,
      }));
    }
  }, [geo]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <MainLayout title="Live Monitoring Hub">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center animate-pulse">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Live Environmental Sentinel</h2>
                <DemoBadge isLive={geo.isLive} text={geo.isLive ? 'LIVE GPS' : 'DEMO MODE'} />
              </div>
              <p className="text-xs text-slate-400">Continuous telemetry feed of location, crowd, weather, & safety</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">Last refresh: {lastUpdated}</span>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 text-xs font-semibold"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* 4 Telemetry Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: GPS Location */}
          <div className="glass-card p-5 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-3 text-slate-400">
              <span className="text-xs font-semibold">GPS Telemetry</span>
              <MapPin className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="text-sm font-bold text-white truncate mb-1">{monitoringData.location}</h3>
            <p className="text-xs text-slate-400 font-mono">
              Lat: {monitoringData.lat?.toFixed(4)}, Lng: {monitoringData.lng?.toFixed(4)}
            </p>
          </div>

          {/* Card 2: Weather */}
          <div className="glass-card p-5 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-3 text-slate-400">
              <span className="text-xs font-semibold">Live Weather</span>
              <CloudSun className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-extrabold text-white">{monitoringData.temp}°C</span>
              <span className="text-xs font-medium text-slate-300">{monitoringData.condition}</span>
            </div>
            <p className="text-xs text-slate-400">Wind: 12 km/h • Humidity: 65%</p>
          </div>

          {/* Card 3: Traffic */}
          <div className="glass-card p-5 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-3 text-slate-400">
              <span className="text-xs font-semibold">Traffic Flow</span>
              <Car className="w-4 h-4 text-teal-400" />
            </div>
            <h3 className="text-sm font-bold text-teal-400 mb-1">{monitoringData.traffic}</h3>
            <p className="text-xs text-slate-400">Main arterial roads clear</p>
          </div>

          {/* Card 4: Crowd Level */}
          <div className="glass-card p-5 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-3 text-slate-400">
              <span className="text-xs font-semibold">Crowd Density</span>
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
            <h3 className="text-sm font-bold text-indigo-400 mb-1">{monitoringData.crowdLevel}</h3>
            <p className="text-xs text-slate-400">Optimal visiting conditions</p>
          </div>
        </div>

        {/* Live Map + Safety Score Gauge */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel p-4 rounded-3xl border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center justify-between">
              <span>Live Location Radar</span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                ACTIVE TRACKING
              </span>
            </h3>
            <MapComponent center={[monitoringData.lat, monitoringData.lng]} zoom={14} height="360px" />
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col items-center justify-center text-center">
            <h3 className="font-bold text-base text-white mb-1">Real-Time Risk Rating</h3>
            <p className="text-xs text-slate-400 mb-4">Live composite safety score</p>
            <SafetyScoreCircle score={monitoringData.safetyScore} size={160} />
            <div className="mt-4 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              Current environment is safe. All parameters normal.
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LiveMonitoring;
