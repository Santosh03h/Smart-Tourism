import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, MapPin, AlertTriangle, Navigation, Activity, 
  Bell, AlertCircle, Compass, History, Bot, User, Settings, 
  ShieldAlert, Shield, LogOut, ChevronRight
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/plan-trip', label: 'Plan a Trip', icon: MapPin },
    { path: '/risk-analysis', label: 'Risk Analysis', icon: AlertTriangle },
    { path: '/navigation', label: 'Route & Nav', icon: Navigation },
    { path: '/live-monitoring', label: 'Live Monitoring', icon: Activity },
    { path: '/alerts', label: 'Safety Alerts', icon: Bell },
    { path: '/emergency', label: 'Emergency / SOS', icon: AlertCircle, badge: 'SOS', badgeColor: 'bg-rose-600' },
    { path: '/recommendations', label: 'Recommendations', icon: Compass },
    { path: '/travel-history', label: 'Travel History', icon: History },
    { path: '/safety-assistant', label: 'AI Assistant', icon: Bot, badge: 'AI', badgeColor: 'bg-blue-600' },
    { path: '/fraud-detection', label: 'Price & Fraud', icon: ShieldAlert },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  if (user?.role === 'admin') {
    navItems.push({ path: '/admin', label: 'Admin Console', icon: Shield, badge: 'Admin', badgeColor: 'bg-purple-600' });
  }

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 glass-panel border-r border-slate-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-base text-white leading-tight">Smart Tourism</h1>
            <span className="text-xs text-blue-400 font-medium">Safety Platform</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => toggleSidebar && toggleSidebar(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.badgeColor} text-white`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/60">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 font-semibold text-sm">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="truncate max-w-[110px]">
                <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email || 'user@demo.com'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
