import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import SafetyScoreCircle from '../components/SafetyScoreCircle';
import RiskCard from '../components/RiskCard';
import DemoBadge from '../components/DemoBadge';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, MapPin, Sun, Car, 
  Clock, Users, Compass, CheckCircle2, Info
} from 'lucide-react';

const RiskAnalysis = () => {
  const [selectedCity, setSelectedCity] = useState('Delhi');

  const cityRiskData = {
    Delhi: {
      score: 68,
      level: 'MODERATE',
      factors: [
        { title: 'Crime Risk', score: 38, icon: ShieldAlert, desc: 'Moderate petty crime risk near high-density markets like Chandni Chowk.' },
        { title: 'Weather Risk', score: 22, icon: Sun, desc: 'Mild temperature, acceptable air quality index.' },
        { title: 'Traffic Risk', score: 55, icon: Car, desc: 'Heavy rush-hour delays on Outer Ring Road and Connaught Place.' },
        { title: 'Time Risk', score: 20, icon: Clock, desc: 'Daytime conditions are safe. Heightened caution recommended past 11 PM.' },
        { title: 'Crowd Risk', score: 45, icon: Users, desc: 'High crowd density at metro stations and spice markets.' },
        { title: 'Location Risk', score: 30, icon: MapPin, desc: 'Central Delhi is well-patrolled by Delhi Police.' },
      ],
      recommendations: [
        'Avoid carrying large amounts of cash near crowded bazaar areas.',
        'Use Delhi Metro or official app cabs (Uber/Ola) for late night transit.',
        'Keep emergency helpline 112 saved on speed dial.'
      ],
      zones: [
        { area: 'Connaught Place', score: 85, status: 'Low Risk' },
        { area: 'Chandni Chowk', score: 52, status: 'Moderate Risk' },
        { area: 'Paharganj', score: 48, status: 'Moderate Risk' },
        { area: 'South Delhi (Hauz Khas)', score: 82, status: 'Low Risk' },
      ]
    },
    Agra: {
      score: 74,
      level: 'MODERATE',
      factors: [
        { title: 'Crime Risk', score: 28, icon: ShieldAlert, desc: 'Low violent crime rate; keep an eye out for touts near Taj East Gate.' },
        { title: 'Weather Risk', score: 15, icon: Sun, desc: 'Clear skies, optimal sightseeing weather.' },
        { title: 'Traffic Risk', score: 32, icon: Car, desc: 'Moderate tourist coach traffic near monument corridors.' },
        { title: 'Time Risk', score: 18, icon: Clock, desc: 'Monuments close at sunset. Taj Mahal early morning is quietest.' },
        { title: 'Crowd Risk', score: 38, icon: Users, desc: 'Heavy weekend tourist influx at main entrance gates.' },
        { title: 'Location Risk', score: 22, icon: MapPin, desc: 'Tourist police active along Taj corridor.' },
      ],
      recommendations: [
        'Buy Taj Mahal tickets online in advance to bypass unauthorized guide touts.',
        'Visit Mehtab Bagh at sunset for safer, uncrowded photography.',
      ],
      zones: [
        { area: 'Taj Mahal Complex', score: 92, status: 'Low Risk' },
        { area: 'Agra Fort Area', score: 85, status: 'Low Risk' },
        { area: 'Sadaria Bazaar', score: 65, status: 'Moderate Risk' },
      ]
    },
    Jaipur: {
      score: 81,
      level: 'LOW',
      factors: [
        { title: 'Crime Risk', score: 20, icon: ShieldAlert, desc: 'Very low violent crime; peaceful tourist environment.' },
        { title: 'Weather Risk', score: 35, icon: Sun, desc: 'Afternoon heat can reach 38°C. Heatstroke precaution advised.' },
        { title: 'Traffic Risk', score: 28, icon: Car, desc: 'Smooth highway traffic; minor bottleneck near Johari Bazaar.' },
        { title: 'Time Risk', score: 15, icon: Clock, desc: 'Pink city main avenues remain safe until late evening.' },
        { title: 'Crowd Risk', score: 30, icon: Users, desc: 'Moderate tourist numbers at Amer Fort.' },
        { title: 'Location Risk', score: 18, icon: MapPin, desc: 'High police visibility across major heritage forts.' },
      ],
      recommendations: [
        'Drink plenty of water and carry sun protection during noon hours.',
        'Pre-negotiate auto-rickshaw fares or stick to Uber/Ola.'
      ],
      zones: [
        { area: 'Amer Fort Hill', score: 94, status: 'Low Risk' },
        { area: 'Pink City Central', score: 88, status: 'Low Risk' },
        { area: 'Bapu Bazaar', score: 72, status: 'Moderate Risk' },
      ]
    }
  };

  const currentData = cityRiskData[selectedCity] || cityRiskData.Delhi;

  return (
    <MainLayout title="Risk Analysis Engine">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* City Switcher */}
        <div className="glass-panel p-4 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Select Location for Analysis</h2>
            <p className="text-xs text-slate-400">Calculated composite travel risk index</p>
          </div>
          <div className="flex items-center gap-2">
            {['Delhi', 'Agra', 'Jaipur'].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCity === city
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Top Summary Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gauge Column */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col items-center justify-center text-center">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Overall Safety Index</h3>
            <SafetyScoreCircle score={currentData.score} size={170} />
            <p className="text-xs text-slate-400 mt-4">
              Normalized score based on weighted risk parameters (Crime, Weather, Traffic, Time, Crowd, Location).
            </p>
          </div>

          {/* Safety Recommendations */}
          <div className="md:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">AI Safety Recommendations</h3>
              </div>
              <div className="space-y-3">
                {currentData.recommendations.map((rec, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-200 leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-blue-400" />
                Updated 5 mins ago
              </span>
              <DemoBadge isLive={false} text="MOCK CRIME & RISK DATA" />
            </div>
          </div>
        </div>

        {/* 6 Risk Factor Cards Grid */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Detailed Risk Factor Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentData.factors.map((f, idx) => (
              <RiskCard
                key={idx}
                title={f.title}
                score={f.score}
                icon={f.icon}
                description={f.desc}
              />
            ))}
          </div>
        </div>

        {/* Area-Wise Risk Heatmap Table */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800">
          <h3 className="text-base font-bold text-white mb-1">Area-Wise Risk Heatmap ({selectedCity})</h3>
          <p className="text-xs text-slate-400 mb-4">Micro-zone security assessment</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {currentData.zones.map((zone, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{zone.area}</h4>
                  <span className="text-[10px] text-slate-400">{zone.status}</span>
                </div>
                <span className={`text-sm font-extrabold px-2.5 py-1 rounded-xl ${
                  zone.score >= 76 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}>
                  {zone.score}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RiskAnalysis;
