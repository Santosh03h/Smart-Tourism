import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import SafetyScoreCircle from '../components/SafetyScoreCircle';
import AlertCard from '../components/AlertCard';
import PlaceCard from '../components/PlaceCard';
import DemoBadge from '../components/DemoBadge';
import { useAuth } from '../hooks/useAuth';
import { useGeolocation } from '../hooks/useGeolocation';
import { CLIENT_DEMO_DATA } from '../utils/demoData';
import API from '../services/api';
import { 
  MapPin, CloudSun, Shield, AlertTriangle, Phone, AlertOctagon, 
  Calendar, ArrowRight, Compass, Activity, Thermometer, Wind, Droplets
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const geo = useGeolocation();

  const [currentTrip, setCurrentTrip] = useState(CLIENT_DEMO_DATA.currentTrip);
  const [alerts, setAlerts] = useState(CLIENT_DEMO_DATA.recentAlerts);
  const [weather, setWeather] = useState(CLIENT_DEMO_DATA.currentTrip.weather);
  const [safetyScore, setSafetyScore] = useState(81);
  const [loading, setLoading] = useState(false);

  // Safety trend mock chart data
  const safetyTrend = [
    { time: '08:00 AM', score: 92 },
    { time: '11:00 AM', score: 85 },
    { time: '02:00 PM', score: 78 },
    { time: '05:00 PM', score: 81 },
    { time: '08:00 PM', score: 74 },
  ];

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const { data } = await API.get('/weather?location=Jaipur');
        if (data?.success && data.weather) {
          setWeather(data.weather);
        }
      } catch (err) {
        console.log('Using demo weather on dashboard');
      }
    };
    loadDashboardData();
  }, []);

  return (
    <MainLayout title="Dashboard">
      {/* Welcome Banner */}
      <div className="mb-6 glass-panel p-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-900/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">Smart Travel Hub</span>
              <DemoBadge isLive={geo.isLive} text={geo.isLive ? 'GPS LIVE' : 'DEMO MODE'} />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Welcome back, <span className="gradient-text">{user?.name || 'Explorer'}</span>! 👋
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1">
              Here is your live safety status and active travel plan for today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/plan-trip')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Plan New Trip</span>
            </button>
            <button
              onClick={() => navigate('/emergency')}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 animate-pulse"
            >
              <AlertOctagon className="w-4 h-4" />
              <span>Quick SOS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 6 Visual Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        {/* Card 1: Current Trip */}
        <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Current Trip</span>
            <MapPin className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-base font-bold text-white truncate">{currentTrip.destination}</h3>
          <p className="text-[11px] text-slate-400">{currentTrip.estimatedTravelTime}</p>
        </div>

        {/* Card 2: Safety Score */}
        <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Safety Score</span>
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-emerald-400">{safetyScore}</span>
            <span className="text-[10px] text-slate-400">/ 100</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded w-max">
            LOW RISK
          </span>
        </div>

        {/* Card 3: Location */}
        <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Current Location</span>
            <Activity className="w-4 h-4 text-teal-400" />
          </div>
          <h3 className="text-xs font-bold text-white truncate">{geo.address || 'Jaipur, Rajasthan'}</h3>
          <span className="text-[10px] text-slate-400">{geo.isLive ? 'Real GPS' : 'Demo Coordinates'}</span>
        </div>

        {/* Card 4: Weather */}
        <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Weather</span>
            <CloudSun className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-white">{weather.temp}°C</span>
            <span className="text-[10px] text-slate-400">{weather.condition}</span>
          </div>
          <span className="text-[10px] text-slate-400">Humidity: {weather.humidity}%</span>
        </div>

        {/* Card 5: Active Alerts */}
        <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Active Alerts</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-xl font-extrabold text-amber-400">{alerts.length}</span>
          <span className="text-[10px] text-slate-400">1 Moderate, 1 Info</span>
        </div>

        {/* Card 6: Emergency Contact */}
        <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Emergency</span>
            <Phone className="w-4 h-4 text-rose-400" />
          </div>
          <h3 className="text-xs font-bold text-white truncate">
            {user?.emergencyContact?.name || 'Priya Sharma'}
          </h3>
          <span className="text-[10px] text-rose-400 font-mono">
            {user?.emergencyContact?.phone || '+91-9876543211'}
          </span>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Itinerary Overview */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-white">Today's Itinerary</h3>
                <p className="text-xs text-slate-400">Scheduled places for {currentTrip.destination}</p>
              </div>
              <button
                onClick={() => navigate(`/itinerary/${currentTrip._id}`)}
                className="text-xs font-semibold text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Full Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {CLIENT_DEMO_DATA.todayItinerary.map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-semibold text-teal-400 shrink-0 w-16">{item.time}</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-400">{item.location}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
                    {item.safety}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Score Trend Chart */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-white">Live Safety Trend</h3>
                <p className="text-xs text-slate-400">Score variations throughout the day</p>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                Stable (81 Avg)
              </span>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={safetyTrend}>
                  <defs>
                    <linearGradient id="safetyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                  <YAxis domain={[50, 100]} stroke="#64748b" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#safetyGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col wide) */}
        <div className="space-y-6">
          {/* Circular Safety Score Gauge */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-800 flex flex-col items-center text-center">
            <h3 className="font-bold text-base text-white mb-1">Safety Index</h3>
            <p className="text-xs text-slate-400 mb-4">Current location risk evaluation</p>
            <SafetyScoreCircle score={safetyScore} size={150} />
            <button
              onClick={() => navigate('/risk-analysis')}
              className="mt-4 w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-blue-400 flex items-center justify-center gap-1 border border-slate-700/60"
            >
              <span>Detailed Risk Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Recent Safety Alerts */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-base text-white">Recent Alerts</h3>
              <button onClick={() => navigate('/alerts')} className="text-xs text-blue-400 hover:underline font-semibold">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {alerts.slice(0, 2).map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
