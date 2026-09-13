import React from 'react';
import { Info } from 'lucide-react';

const DemoBadge = ({ isLive = false, text = "DEMO DATA" }) => {
  if (isLive) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        LIVE DATA
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
      <Info className="w-3 h-3" />
      {text}
    </span>
  );
};

export default DemoBadge;
