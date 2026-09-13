import React from 'react';
import { Menu, Bell, AlertOctagon, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import DemoBadge from './DemoBadge';

const Header = ({ toggleSidebar, title = 'Dashboard' }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 glass-panel border-b border-slate-800 px-4 py-3 md:px-6">
      <div className="flex items-center justify-between">
        {/* Left Side: Mobile Menu Button & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 md:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Right Side: Demo Badge, Location Indicator, Notifications & SOS Quick Trigger */}
        <div className="flex items-center gap-3">
          <DemoBadge isLive={false} text="DEMO MODE" />

          {/* Quick SOS Trigger */}
          <button
            onClick={() => navigate('/emergency')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all animate-pulse"
          >
            <AlertOctagon className="w-4 h-4" />
            <span>SOS</span>
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => navigate('/alerts')}
            className="relative p-2 rounded-xl bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/50 transition-colors"
            title="Safety Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
