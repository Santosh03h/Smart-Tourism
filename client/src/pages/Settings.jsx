import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../hooks/useAuth';
import { Settings as SettingsIcon, Bell, Shield, Globe, LogOut, CheckCircle2, Navigation, Activity } from 'lucide-react';

const Settings = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('app_settings');
    return saved ? JSON.parse(saved) : {
      safetyAlerts: true,
      weatherAlerts: true,
      trafficAlerts: true,
      locationMonitoring: true,
      language: 'English'
    };
  });

  const [saved, setSaved] = useState(false);

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLanguageChange = (e) => {
    setSettings(prev => ({ ...prev, language: e.target.value }));
  };

  const handleSave = () => {
    localStorage.setItem('app_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <MainLayout title="Settings">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <SettingsIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Platform Settings & Preferences</h2>
                <p className="text-xs text-slate-400">Configure safety alerts, GPS telemetry, & language</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

          {saved && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings saved to local storage!</span>
            </div>
          )}

          <div className="space-y-5">
            {/* Toggle 1: Safety Alerts */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>High-Risk & Safety Alerts</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Receive warnings when approaching high-risk zones</p>
              </div>
              <input
                type="checkbox"
                checked={settings.safetyAlerts}
                onChange={() => handleToggle('safetyAlerts')}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Toggle 2: Weather Alerts */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span>Weather Warning Alerts</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Alerts for extreme temperatures, rain, or storms</p>
              </div>
              <input
                type="checkbox"
                checked={settings.weatherAlerts}
                onChange={() => handleToggle('weatherAlerts')}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Toggle 3: Traffic Alerts */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-teal-400" />
                  <span>Traffic Congestion Alerts</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Proactive notifications for heavy road delays</p>
              </div>
              <input
                type="checkbox"
                checked={settings.trafficAlerts}
                onChange={() => handleToggle('trafficAlerts')}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Toggle 4: Location Monitoring */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-400" />
                  <span>Live Location Telemetry</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Continuous GPS background tracking for SOS safety</p>
              </div>
              <input
                type="checkbox"
                checked={settings.locationMonitoring}
                onChange={() => handleToggle('locationMonitoring')}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Language Selector */}
            <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span>Display Language</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">App interface language</p>
              </div>
              <select
                value={settings.language}
                onChange={handleLanguageChange}
                className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Bengali">Bengali</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
              </select>
            </div>

            <button
              onClick={handleSave}
              className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all"
            >
              Save Settings Preferences
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
