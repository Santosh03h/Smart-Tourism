import React from 'react';
import { AlertCircle, AlertTriangle, Info, CheckCircle2, MapPin, Clock, AlertOctagon } from 'lucide-react';

const AlertCard = ({ alert, onRead }) => {
  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return { icon: AlertOctagon, color: 'text-rose-500', bg: 'bg-rose-500/10 border-rose-500/30', badge: 'bg-rose-600' };
      case 'HIGH':
        return { icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30', badge: 'bg-orange-500' };
      case 'MEDIUM':
        return { icon: AlertCircle, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30', badge: 'bg-amber-500' };
      default:
        return { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30', badge: 'bg-blue-500' };
    }
  };

  const style = getSeverityStyle(alert.severity);
  const Icon = style.icon;

  return (
    <div className={`p-4 rounded-2xl border ${style.bg} transition-all duration-200 relative`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-xl bg-slate-900/60 ${style.color} shrink-0 mt-0.5`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded text-white ${style.badge}`}>
              {alert.severity} RISK
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {alert.time || alert.timestamp ? new Date(alert.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
            </span>
          </div>

          <h4 className="font-bold text-sm text-white mb-1">{alert.title}</h4>
          <p className="text-xs text-slate-300 mb-2 leading-relaxed">{alert.description}</p>

          {alert.location && (
            <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-2">
              <MapPin className="w-3 h-3 text-blue-400" />
              <span>{alert.location}</span>
            </div>
          )}

          {alert.action && (
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/50 text-xs text-slate-200 flex items-start gap-2">
              <span className="text-amber-400 font-bold">Recommended:</span>
              <span className="text-slate-300">{alert.action}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
