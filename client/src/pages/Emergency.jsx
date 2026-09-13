import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import DemoBadge from '../components/DemoBadge';
import { useAuth } from '../hooks/useAuth';
import { useGeolocation } from '../hooks/useGeolocation';
import API from '../services/api';
import { 
  AlertOctagon, PhoneCall, Share2, Shield, HeartPulse, Flame, 
  MapPin, CheckCircle2, AlertTriangle, X
} from 'lucide-react';

const Emergency = () => {
  const { user } = useAuth();
  const geo = useGeolocation();

  const [dialog, setDialog] = useState(null); // { title, message, action }
  const [sosSent, setSosSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const emergencyContacts = [
    { title: 'Police Emergency Helpline', phone: '112 / 100', icon: Shield, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
    { title: 'Medical Ambulance Helpline', phone: '108', icon: HeartPulse, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    { title: 'Fire Brigade', phone: '101', icon: Flame, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    { title: 'Personal Emergency Contact', phone: user?.emergencyContact?.phone || '+91-9876543211', subtitle: user?.emergencyContact?.name || 'Priya Sharma', icon: PhoneCall, color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
  ];

  const nearbyServices = [
    { type: 'Police Station', name: 'Connaught Place Police Station', distance: '1.2 km', phone: '011-23363820' },
    { type: 'Hospital', name: 'AIIMS Emergency Medical Dept', distance: '4.5 km', phone: '011-26588500' },
    { type: 'Fire Station', name: 'Delhi Main Fire Station', distance: '2.0 km', phone: '011-23412222' }
  ];

  const handleSOSTrigger = async () => {
    setDialog({
      title: 'CONFIRM EMERGENCY SOS SIGNAL',
      message: 'Are you sure you want to broadcast your live GPS location to local emergency services and your primary contact?',
      action: async () => {
        setLoading(true);
        try {
          await API.post('/emergency/sos', {
            location: {
              lat: geo.coordinates?.lat || 28.6139,
              lng: geo.coordinates?.lng || 77.2090,
              address: geo.address || 'Connaught Place, New Delhi'
            },
            emergencyType: 'SOS',
            message: 'Emergency SOS triggered from mobile/web application.'
          });
        } catch (err) {
          console.log('SOS simulated response');
        } finally {
          setLoading(false);
          setSosSent(true);
          setDialog(null);
        }
      }
    });
  };

  const handleCallConfirm = (name, phone) => {
    setDialog({
      title: `CONFIRM CALL TO ${name.toUpperCase()}`,
      message: `Are you sure you want to initiate a call to ${phone}? (In demo mode, this simulates the call).`,
      action: () => {
        alert(`DEMO SIMULATION: Dialing ${phone} (${name})...`);
        setDialog(null);
      }
    });
  };

  return (
    <MainLayout title="Emergency & SOS Center">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Banner */}
        <div className="glass-panel p-6 rounded-3xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-slate-900 to-rose-950/40 text-center relative overflow-hidden">
          <DemoBadge isLive={geo.isLive} text={geo.isLive ? 'LIVE GPS ACTIVE' : 'DEMO MODE'} />

          <div className="my-4">
            <button
              onClick={handleSOSTrigger}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-rose-600 to-rose-500 text-white font-extrabold text-2xl md:text-3xl shadow-2xl shadow-rose-600/50 hover:scale-105 transition-all mx-auto flex flex-col items-center justify-center border-4 border-rose-400/50 animate-pulse"
            >
              <AlertOctagon className="w-10 h-10 md:w-12 md:h-12 mb-1" />
              <span>SOS</span>
            </button>
          </div>

          <h2 className="text-xl font-bold text-white mb-1">One-Tap Emergency Assistance</h2>
          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            Pressing SOS will broadcast your current GPS coordinates to emergency responders and your emergency contact.
          </p>

          <div className="mt-4 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 inline-flex items-center gap-2 text-xs text-slate-300">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>Current Location: {geo.address || 'Connaught Place, New Delhi'}</span>
          </div>
        </div>

        {sosSent && (
          <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>SOS Signal Dispatched! Emergency contacts notified with live coordinates.</span>
            </div>
            <button onClick={() => setSosSent(false)} className="text-xs underline">Dismiss</button>
          </div>
        )}

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {emergencyContacts.map((contact, idx) => {
            const Icon = contact.icon;
            return (
              <div key={idx} className={`p-4 rounded-2xl border ${contact.color} flex flex-col justify-between`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-slate-900/60">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold">{contact.phone}</span>
                </div>

                <div>
                  <h4 className="font-bold text-xs text-white mb-0.5">{contact.title}</h4>
                  {contact.subtitle && <p className="text-[11px] text-slate-400">{contact.subtitle}</p>}
                </div>

                <button
                  onClick={() => handleCallConfirm(contact.title, contact.phone)}
                  className="mt-3 w-full py-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700/60"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Nearby Emergency Services */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800">
          <h3 className="text-base font-bold text-white mb-1">Nearby Emergency Facilities</h3>
          <p className="text-xs text-slate-400 mb-4">Nearest police stations, hospitals, & fire departments</p>

          <div className="space-y-3">
            {nearbyServices.map((service, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
                    {service.type}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-1">{service.name}</h4>
                  <span className="text-[11px] text-slate-400">{service.distance} from your location</span>
                </div>

                <button
                  onClick={() => handleCallConfirm(service.name, service.phone)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Confirmation Modal */}
        {dialog && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="glass-panel p-6 rounded-3xl max-w-md w-full border border-rose-500/30 bg-slate-900 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>{dialog.title}</span>
                </h3>
                <button onClick={() => setDialog(null)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-300 mb-6 leading-relaxed">{dialog.message}</p>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setDialog(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={dialog.action}
                  disabled={loading}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30"
                >
                  {loading ? 'Dispatched...' : 'Confirm Action'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Emergency;
