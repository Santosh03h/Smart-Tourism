import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MapPin, AlertTriangle, AlertCircle, Bot } from 'lucide-react';

const BottomNav = () => {
  const items = [
    { path: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { path: '/plan-trip', label: 'Plan', icon: MapPin },
    { path: '/risk-analysis', label: 'Risk', icon: AlertTriangle },
    { path: '/safety-assistant', label: 'AI Chat', icon: Bot },
    { path: '/emergency', label: 'SOS', icon: AlertCircle, color: 'text-rose-500' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-slate-800 md:hidden px-2 py-1.5">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
                  isActive ? (item.color || 'text-blue-400 font-semibold') : 'text-slate-400 hover:text-slate-200'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
