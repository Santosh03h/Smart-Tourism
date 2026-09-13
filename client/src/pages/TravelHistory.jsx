import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import TripCard from '../components/TripCard';
import DemoBadge from '../components/DemoBadge';
import API from '../services/api';
import { CLIENT_DEMO_DATA } from '../utils/demoData';
import { History, Calendar, MapPin, Plus } from 'lucide-react';

const TravelHistory = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data } = await API.get('/trips');
        if (data?.success && data.trips?.length > 0) {
          setTrips(data.trips);
        } else {
          setTrips([
            { _id: 'trip001', destination: 'Delhi', startDate: '2024-12-20', endDate: '2024-12-23', numberOfPeople: 2, budget: 15000, transport: 'Train', status: 'completed', safetyScore: 68 },
            { _id: 'trip002', destination: 'Agra', startDate: '2025-01-15', endDate: '2025-01-17', numberOfPeople: 1, budget: 8000, transport: 'Bus', status: 'completed', safetyScore: 74 },
            { _id: 'trip003', destination: 'Jaipur', startDate: '2025-02-10', endDate: '2025-02-14', numberOfPeople: 4, budget: 40000, transport: 'Car', status: 'active', safetyScore: 81 }
          ]);
        }
      } catch (err) {
        setTrips([
          { _id: 'trip001', destination: 'Delhi', startDate: '2024-12-20', endDate: '2024-12-23', numberOfPeople: 2, budget: 15000, transport: 'Train', status: 'completed', safetyScore: 68 },
          { _id: 'trip002', destination: 'Agra', startDate: '2025-01-15', endDate: '2025-01-17', numberOfPeople: 1, budget: 8000, transport: 'Bus', status: 'completed', safetyScore: 74 },
          { _id: 'trip003', destination: 'Jaipur', startDate: '2025-02-10', endDate: '2025-02-14', numberOfPeople: 4, budget: 40000, transport: 'Car', status: 'active', safetyScore: 81 }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  return (
    <MainLayout title="Travel History">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Banner */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <History className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Your Travel Logbook</h2>
                <DemoBadge isLive={false} text="PERSISTED TRIPS" />
              </div>
              <p className="text-xs text-slate-400">Review past journeys, safety metrics, and generated itineraries</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/plan-trip')}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Trip</span>
          </button>
        </div>

        {/* Trips Grid or Empty State */}
        {trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 space-y-4">
            <MapPin className="w-12 h-12 text-blue-400 mx-auto opacity-80" />
            <h3 className="text-base font-bold text-white">No trips found. Start planning your first smart journey.</h3>
            <button
              onClick={() => navigate('/plan-trip')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>Plan Your First Trip</span>
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TravelHistory;
