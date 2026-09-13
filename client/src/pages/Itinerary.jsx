import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import PlaceCard from '../components/PlaceCard';
import SafetyScoreCircle from '../components/SafetyScoreCircle';
import DemoBadge from '../components/DemoBadge';
import API from '../services/api';
import { CLIENT_DEMO_DATA } from '../utils/demoData';
import { formatCurrency } from '../utils/helpers';
import { 
  MapPin, Calendar, Clock, DollarSign, ShieldCheck, AlertTriangle, 
  RefreshCw, CheckCircle2, ArrowRight, Sparkles, Navigation
} from 'lucide-react';

const Itinerary = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dynamicUpdateActive, setDynamicUpdateActive] = useState(false);
  const [updateAccepted, setUpdateAccepted] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { data } = await API.get(`/trips/${id || 'trip003'}`);
        if (data?.success && data.trip) {
          setTrip(data.trip);
        } else {
          setTrip(CLIENT_DEMO_DATA.currentTrip);
        }
      } catch (err) {
        setTrip(CLIENT_DEMO_DATA.currentTrip);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  // Demo day-by-day schedule data if itinerary missing on object
  const daysPlan = [
    {
      day: 1,
      date: 'Day 1 — Arrival & Highlights',
      morning: [
        { name: 'Amber Fort', category: 'Historical', description: 'Hilltop fort famous for its artistic Hindu style elements.', estimatedCost: 550, visitTime: '3 hours', safetyLevel: 'Safe', bestTime: 'Morning 8–11 AM' }
      ],
      afternoon: [
        { name: 'Rawat Mishtan Bhandar', category: 'Food', description: 'Famous for Pyaz Kachori and traditional sweets.', estimatedCost: 200, visitTime: '1 hour', safetyLevel: 'Safe', bestTime: 'Lunch' }
      ],
      evening: [
        { name: 'Nahargarh Fort Sunset', category: 'Adventure', description: 'Panoramic views over the entire Pink City at dusk.', estimatedCost: 100, visitTime: '2 hours', safetyLevel: 'Safe', bestTime: 'Sunset 5–7 PM' }
      ]
    },
    {
      day: 2,
      date: 'Day 2 — Culture & Shopping',
      morning: [
        { name: 'City Palace & Jantar Mantar', category: 'Historical', description: 'Royal courtyard complex and UNESCO astronomical observatory.', estimatedCost: 700, visitTime: '3 hours', safetyLevel: 'Safe', bestTime: 'Morning' }
      ],
      afternoon: [
        { name: 'LMB Sweets & Thali', category: 'Food', description: 'Authentic Rajasthani Dal Baati Churma thali.', estimatedCost: 450, visitTime: '1.5 hours', safetyLevel: 'Safe', bestTime: 'Lunch' }
      ],
      evening: [
        { name: updateAccepted ? 'Agrasen Market (Safer Alternative)' : 'Bapu Bazaar Market', category: 'Shopping', description: updateAccepted ? 'Rerouted to safer, less crowded traditional craft market.' : 'Bustling bazaar famous for leather goods and textiles.', estimatedCost: 1000, visitTime: '2 hours', safetyLevel: updateAccepted ? 'Safe' : 'Moderate', bestTime: 'Evening' }
      ]
    }
  ];

  const [savedFeedback, setSavedFeedback] = useState('');
  const [regenerating, setRegenerating] = useState(false);

  const handleSaveTrip = () => {
    setSavedFeedback('Trip saved to your travel logbook!');
    setTimeout(() => setSavedFeedback(''), 3000);
  };

  const handleRegeneratePlan = () => {
    setRegenerating(true);
    setTimeout(() => {
      setRegenerating(false);
      setSavedFeedback('AI Itinerary regenerated with updated parameters!');
      setTimeout(() => setSavedFeedback(''), 3000);
    }, 1200);
  };

  return (
    <MainLayout title="AI Trip Itinerary">
      {/* Feedback Banner */}
      {savedFeedback && (
        <div className="mb-4 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{savedFeedback}</span>
        </div>
      )}

      {/* Dynamic Condition Alert Banner */}
      {!updateAccepted && (
        <div className="mb-6 p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Dynamic Safety Alert: Weather & Traffic Reroute Available</h4>
              <p className="text-xs text-slate-300">
                Increased evening traffic detected near Bapu Bazaar. AI suggests rerouting to Agrasen Market at 5 PM for optimal safety.
              </p>
            </div>
          </div>
          <button
            onClick={() => setUpdateAccepted(true)}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shrink-0 flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Accept Safe Alternative</span>
          </button>
        </div>
      )}

      {updateAccepted && (
        <div className="mb-6 p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-semibold text-emerald-300">
            Itinerary successfully updated with AI Safe Reroute! High-risk areas bypassed.
          </p>
        </div>
      )}

      {/* Header Info */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">AI Generated Plan</span>
            <DemoBadge isLive={false} text="AI MOCK DATA" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {trip?.destination || 'Jaipur'} Vacation Plan
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-blue-400" /> 5 Days</span>
            <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Est. Cost: {formatCurrency(trip?.estimatedCost || 32000)}</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> Safety Score: {trip?.safetyScore || 81}/100</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSaveTrip}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 border border-slate-700"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Save Trip</span>
          </button>

          <button
            onClick={handleRegeneratePlan}
            disabled={regenerating}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 border border-slate-700"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${regenerating ? 'animate-spin' : ''}`} />
            <span>{regenerating ? 'Regenerating...' : 'Regenerate'}</span>
          </button>

          <button
            onClick={() => navigate('/navigation')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/20"
          >
            <Navigation className="w-4 h-4" />
            <span>View Safe Navigation Routes</span>
          </button>
        </div>
      </div>

      {/* Day by Day Plan */}
      <div className="space-y-6">
        {daysPlan.map((d) => (
          <div key={d.day} className="glass-panel p-6 rounded-3xl border border-slate-800">
            <h3 className="text-base font-bold text-white mb-4 pb-2 border-b border-slate-800 flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs font-bold">
                {d.day}
              </span>
              <span>{d.date}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Morning */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-400 block uppercase tracking-wider">Morning</span>
                {d.morning.map((p, i) => (
                  <PlaceCard key={i} place={p} />
                ))}
              </div>

              {/* Afternoon */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-teal-400 block uppercase tracking-wider">Afternoon</span>
                {d.afternoon.map((p, i) => (
                  <PlaceCard key={i} place={p} />
                ))}
              </div>

              {/* Evening */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-indigo-400 block uppercase tracking-wider">Evening</span>
                {d.evening.map((p, i) => (
                  <PlaceCard key={i} place={p} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Itinerary;
