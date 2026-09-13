import React from 'react';
import { MapPin, Clock, Tag, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const PlaceCard = ({ place }) => {
  return (
    <div className="p-4 rounded-2xl glass-card border border-slate-800 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-bold text-sm text-white">{place.name}</h4>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
            {place.category || 'Attraction'}
          </span>
        </div>

        <p className="text-xs text-slate-400 mb-3 line-clamp-2">{place.description}</p>

        <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>{place.visitTime || '1-2 hrs'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-emerald-400" />
            <span>{place.estimatedCost ? formatCurrency(place.estimatedCost) : 'Free Entry'}</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1 text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{place.safetyLevel || 'Safe'}</span>
        </span>
        <span>{place.bestTime ? `Best: ${place.bestTime}` : ''}</span>
      </div>
    </div>
  );
};

export default PlaceCard;
