import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import API from '../services/api';
import { MapPin, Calendar, Users, DollarSign, Car, Compass, Sparkles, ArrowRight } from 'lucide-react';

const PlanTrip = () => {
  const navigate = useNavigate();

  const [destination, setDestination] = useState('Jaipur');
  const [startDate, setStartDate] = useState('2025-02-10');
  const [endDate, setEndDate] = useState('2025-02-14');
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [budget, setBudget] = useState(25000);
  const [transport, setTransport] = useState('Car');
  const [interests, setInterests] = useState(['Historical', 'Food', 'Culture']);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const destinationsList = ['Delhi', 'Agra', 'Jaipur', 'Goa', 'Udaipur', 'Varanasi', 'Kerala', 'Manali'];
  const transportOptions = ['Car', 'Bus', 'Train', 'Flight', 'Bike', 'Other'];
  const allInterests = ['Historical', 'Food', 'Adventure', 'Nature', 'Shopping', 'Culture', 'Photography'];

  const toggleInterest = (interest) => {
    setInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!destination || !startDate || !endDate) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    const payload = {
      destination,
      startDate,
      endDate,
      numberOfPeople: Number(numberOfPeople),
      budget: Number(budget),
      interests,
      transport,
    };

    try {
      // 1. Call AI Itinerary Generator
      const aiRes = await API.post('/ai/generate-itinerary', payload);
      const itineraryData = aiRes.data;

      // 2. Save trip to database
      const tripRes = await API.post('/trips', {
        ...payload,
        itinerary: itineraryData.itinerary,
        estimatedCost: itineraryData.estimatedCost,
        estimatedTravelTime: itineraryData.estimatedTravelTime,
        safetyScore: itineraryData.safetyScore,
      });

      const savedTrip = tripRes.data?.trip;
      navigate(`/itinerary/${savedTrip?._id || 'trip003'}`);
    } catch (err) {
      console.error('Trip generation error, using demo fallback', err);
      navigate('/itinerary/trip003');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout title="Plan a New Trip">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Banner */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-900/40 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/40">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">AI-Powered Trip Generator</h2>
          </div>
          <p className="text-xs text-slate-300">
            Tell us your destination, dates, budget, and travel preferences. Our AI engine will curate an optimized, safe itinerary.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
          {/* Destination & Transport */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Destination *</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs font-medium focus:outline-none focus:border-blue-500"
                >
                  {destinationsList.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mode of Transport *</label>
              <div className="relative">
                <Car className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  value={transport}
                  onChange={(e) => setTransport(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs font-medium focus:outline-none focus:border-blue-500"
                >
                  {transportOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Travel Start Date *</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Travel End Date *</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs"
                />
              </div>
            </div>
          </div>

          {/* People & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Number of People</label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Total Budget (₹ INR)</label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="number"
                  step="1000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs"
                />
              </div>
            </div>
          </div>

          {/* Interests Checkboxes */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-400" />
              <span>Select Your Interests</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {allInterests.map((interest) => {
                const selected = interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      selected
                        ? 'bg-blue-600 text-white border border-blue-500 shadow-md shadow-blue-600/20'
                        : 'bg-slate-800/60 text-slate-400 border border-slate-700/60 hover:text-white'
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition-all"
          >
            {loading ? (
              <span>Generating AI Itinerary...</span>
            ) : (
              <>
                <span>Generate My Trip</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default PlanTrip;
