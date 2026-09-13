import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import MapComponent from '../components/MapComponent';
import DemoBadge from '../components/DemoBadge';
import { Navigation as NavIcon, Zap, Shield, Scale, Clock, MapPin, AlertCircle, CheckCircle } from 'lucide-react';

const Navigation = () => {
  const [selectedRouteType, setSelectedRouteType] = useState('safest');

  const routes = [
    {
      type: 'safest',
      title: 'Safest Route',
      badge: 'RECOMMENDED',
      icon: Shield,
      time: '55 min',
      distance: '17.8 km',
      safetyScore: 91,
      traffic: 'Low',
      riskFactors: ['Well-lit boulevard roads', 'Police patrol active', 'Avoids congestion zones'],
      coordinates: [
        [28.6139, 77.2090],
        [28.6250, 77.2150],
        [28.6400, 77.2300],
        [28.6562, 77.2410]
      ],
      cardColor: 'border-emerald-500/50 bg-emerald-500/10'
    },
    {
      type: 'fastest',
      title: 'Fastest Route',
      badge: 'SPEED',
      icon: Zap,
      time: '45 min',
      distance: '14.2 km',
      safetyScore: 72,
      traffic: 'High',
      riskFactors: ['Heavy city traffic near Red Fort', 'Narrow lanes', 'Minor pickpocket reports'],
      coordinates: [
        [28.6139, 77.2090],
        [28.6300, 77.2200],
        [28.6562, 77.2410]
      ],
      cardColor: 'border-amber-500/30 bg-amber-500/5'
    },
    {
      type: 'balanced',
      title: 'Balanced Route',
      badge: 'BALANCED',
      icon: Scale,
      time: '50 min',
      distance: '15.5 km',
      safetyScore: 85,
      traffic: 'Moderate',
      riskFactors: ['Moderate traffic flow', 'Standard city street lighting'],
      coordinates: [
        [28.6139, 77.2090],
        [28.6200, 77.2180],
        [28.6480, 77.2350],
        [28.6562, 77.2410]
      ],
      cardColor: 'border-blue-500/30 bg-blue-500/5'
    }
  ];

  const currentRoute = routes.find(r => r.type === selectedRouteType) || routes[0];

  const markers = [
    { lat: 28.6139, lng: 77.2090, title: 'Start Location', popup: 'Connaught Place, New Delhi' },
    { lat: 28.6562, lng: 77.2410, title: 'Destination', popup: 'Red Fort, Old Delhi' }
  ];

  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <MainLayout title="Route & Navigation">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation Guidance Banner */}
        {isNavigating && (
          <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <div>
                <h4 className="font-bold text-xs text-emerald-400">LIVE NAVIGATION ACTIVE</h4>
                <p className="text-xs text-white">
                  Following {currentRoute.title} ({currentRoute.time}, {currentRoute.distance}) — Next turn right in 200m onto Ring Road.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsNavigating(false)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-semibold text-rose-400 border border-rose-500/30"
            >
              End Navigation
            </button>
          </div>
        )}

        {/* Banner */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <NavIcon className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">AI Route Optimization</span>
              <DemoBadge isLive={false} text="SIMULATED MAP DATA" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Connaught Place ➔ Red Fort, Delhi</h2>
            <p className="text-xs text-slate-400">Comparing travel routes based on real-time risk, traffic, and lighting</p>
          </div>
        </div>

        {/* 3 Route Cards Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {routes.map((r) => {
            const Icon = r.icon;
            const isSelected = selectedRouteType === r.type;
            return (
              <div
                key={r.type}
                onClick={() => setSelectedRouteType(r.type)}
                className={`cursor-pointer p-5 rounded-3xl border transition-all ${
                  isSelected ? 'border-blue-500 bg-slate-800/80 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/40' : 'border-slate-800 glass-card hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-xl ${r.type === 'safest' ? 'bg-emerald-500/20 text-emerald-400' : r.type === 'fastest' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-white">{r.title}</h3>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${r.type === 'safest' ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                    {r.badge}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-2xl font-extrabold text-white">{r.time}</span>
                    <span className="text-xs text-slate-400 ml-1 font-medium">({r.distance})</span>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-xl ${r.safetyScore >= 85 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}>
                    {r.safetyScore} Safety
                  </span>
                </div>

                <div className="space-y-1 pt-3 border-t border-slate-700/50">
                  {r.riskFactors.map((factor, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                      <span>{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Route Info + Leaflet Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel p-4 rounded-3xl border border-slate-800">
            <h3 className="font-bold text-sm text-white mb-3 flex items-center justify-between">
              <span>Interactive Navigation Map</span>
              <span className="text-xs text-blue-400 font-normal">Active Path: {currentRoute.title}</span>
            </h3>
            <MapComponent center={[28.6350, 77.2250]} zoom={12} markers={markers} routes={currentRoute.coordinates} height="400px" />
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-4">Selected Path Details</h3>

              <div className="space-y-4">
                <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50">
                  <span className="text-xs text-slate-400 block mb-1">Estimated Travel Time</span>
                  <span className="text-lg font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    {currentRoute.time}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50">
                  <span className="text-xs text-slate-400 block mb-1">Total Distance</span>
                  <span className="text-lg font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-400" />
                    {currentRoute.distance}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50">
                  <span className="text-xs text-slate-400 block mb-1">Safety Index</span>
                  <span className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    {currentRoute.safetyScore} / 100
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsNavigating(!isNavigating)}
              className={`mt-6 w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
                isNavigating ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isNavigating ? 'Stop Navigation' : 'Start Navigation'}</span>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Navigation;
