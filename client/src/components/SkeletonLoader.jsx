import React from 'react';

const SkeletonLoader = ({ count = 3, height = 'h-24' }) => {
  return (
    <div className="space-y-4 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`w-full ${height} rounded-2xl bg-slate-800/50 animate-pulse border border-slate-800`}
        ></div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
