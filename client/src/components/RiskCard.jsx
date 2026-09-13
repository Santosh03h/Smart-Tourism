import React from 'react';

const RiskCard = ({ title, score, icon: Icon, description }) => {
  let scoreColor = 'text-emerald-400';
  let barColor = 'bg-emerald-500';

  if (score > 60) {
    scoreColor = 'text-rose-400';
    barColor = 'bg-rose-500';
  } else if (score > 35) {
    scoreColor = 'text-amber-400';
    barColor = 'bg-amber-500';
  }

  return (
    <div className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="p-2 rounded-xl bg-slate-800 text-blue-400">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <h4 className="font-semibold text-sm text-slate-200">{title}</h4>
        </div>
        <span className={`text-base font-extrabold ${scoreColor}`}>{score}/100</span>
      </div>

      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full ${barColor} transition-all duration-500 rounded-full`}
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        ></div>
      </div>

      {description && <p className="text-xs text-slate-400 mt-1 line-clamp-2">{description}</p>}
    </div>
  );
};

export default RiskCard;
