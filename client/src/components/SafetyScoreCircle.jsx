import React from 'react';
import { getSafetyLevelDetails } from '../utils/helpers';

const SafetyScoreCircle = ({ score = 80, size = 160, strokeWidth = 12 }) => {
  const details = getSafetyLevelDetails(score);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = '#10b981'; // Green
  if (score < 76) strokeColor = '#f59e0b'; // Amber
  if (score < 51) strokeColor = '#f97316'; // Orange
  if (score < 26) strokeColor = '#ef4444'; // Red

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1e293b"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Score Content in Center */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-extrabold text-white tracking-tight">{score}</span>
        <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Out of 100</span>
        <span className={`mt-0.5 text-xs font-bold ${details.color}`}>{details.level} RISK</span>
      </div>
    </div>
  );
};

export default SafetyScoreCircle;
