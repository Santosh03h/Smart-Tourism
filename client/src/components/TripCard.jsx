import React from 'react';
import { MapPin, Calendar, Users, Shield, ArrowRight } from 'lucide-react';
import { formatDate, formatCurrency, getSafetyLevelDetails } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

const TripCard = ({ trip }) => {
  const navigate = useNavigate();
  const safety = getSafetyLevelDetails(trip.safetyScore || 75);

  return (
    <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-blue-500/40 group">
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white group-hover:text-blue-400 transition-colors">
                {trip.destination}
              </h3>
              <span className="text-xs text-slate-400 font-medium">
                {trip.transport ? `${trip.transport} Travel` : 'Trip'}
              </span>
            </div>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${safety.badge}`}>
            {trip.safetyScore || 75} Score
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 my-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{formatDate(trip.startDate)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{trip.numberOfPeople} {trip.numberOfPeople > 1 ? 'People' : 'Person'}</span>
          </div>
        </div>

        {trip.budget && (
          <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800">
            <span className="text-slate-400">Budget:</span>
            <span className="font-semibold text-emerald-400">{formatCurrency(trip.budget)}</span>
          </div>
        )}
      </div>

      <button
        onClick={() => navigate(`/itinerary/${trip._id}`)}
        className="mt-4 w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all"
      >
        <span>View Itinerary</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default TripCard;
