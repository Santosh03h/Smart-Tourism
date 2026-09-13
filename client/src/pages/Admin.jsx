import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import DemoBadge from '../components/DemoBadge';
import API from '../services/api';
import { Shield, Users, MapPin, Bell, AlertOctagon, Trash2, CheckCircle2 } from 'lucide-react';

const Admin = () => {
  const [stats, setStats] = useState({
    totalUsers: 142,
    activeTrips: 28,
    totalAlerts: 5,
    averageSafetyScore: 78
  });

  const [usersList, setUsersList] = useState([
    { id: 'u1', name: 'Rahul Sharma', email: 'demo@tourism.com', role: 'user', trips: 3, status: 'Active' },
    { id: 'u2', name: 'Priya Patel', email: 'priya@gmail.com', role: 'user', trips: 1, status: 'Active' },
    { id: 'u3', name: 'Amit Singh', email: 'amit@yahoo.com', role: 'user', trips: 4, status: 'Active' },
    { id: 'u4', name: 'Admin User', email: 'admin@tourism.com', role: 'admin', trips: 0, status: 'Active' }
  ]);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const { data } = await API.get('/admin/stats');
        if (data?.success && data.stats) {
          setStats(data.stats);
          if (data.users) setUsersList(data.users);
        }
      } catch (err) {
        console.log('Using admin demo stats');
      }
    };
    fetchAdminStats();
  }, []);

  const handleDeleteUser = (id) => {
    setUsersList(prev => prev.filter(u => u.id !== id));
  };

  return (
    <MainLayout title="Admin Console & Demo Data Control">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Banner */}
        <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900 to-purple-950/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-600/30 text-purple-400 border border-purple-500/40">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">System Administration</h2>
                <DemoBadge isLive={false} text="ADMIN PRIVILEGES" />
              </div>
              <p className="text-xs text-slate-400">View platform analytics, active users, alert telemetry, and demo seed data</p>
            </div>
          </div>
        </div>

        {/* Stats Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Registered Users</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-2xl font-extrabold text-white">{stats.totalUsers}</span>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Active Itineraries</span>
              <MapPin className="w-4 h-4 text-teal-400" />
            </div>
            <span className="text-2xl font-extrabold text-teal-400">{stats.activeTrips}</span>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">System Alerts</span>
              <Bell className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-2xl font-extrabold text-amber-400">{stats.totalAlerts}</span>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Platform Avg Safety</span>
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-2xl font-extrabold text-emerald-400">{stats.averageSafetyScore} / 100</span>
          </div>
        </div>

        {/* Users Management Table */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800">
          <h3 className="text-base font-bold text-white mb-1">User Management</h3>
          <p className="text-xs text-slate-400 mb-4">Registered accounts and role access</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/80 text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="p-3">User Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Trips Created</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-white">{u.name}</td>
                    <td className="p-3 text-slate-300">{u.email}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-blue-600/20 text-blue-400'}`}>
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 text-slate-300">{u.trips}</td>
                    <td className="p-3 text-emerald-400 font-medium">{u.status}</td>
                    <td className="p-3 text-right">
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Admin;
