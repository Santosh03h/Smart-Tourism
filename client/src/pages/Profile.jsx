import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../hooks/useAuth';
import API from '../services/api';
import { User, Mail, Phone, ShieldAlert, Globe, Compass, DollarSign, CheckCircle2, Save } from 'lucide-react';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+91-9876543210',
    emergencyName: user?.emergencyContact?.name || 'Priya Sharma',
    emergencyPhone: user?.emergencyContact?.phone || '+91-9876543211',
    emergencyRelation: user?.emergencyContact?.relation || 'Sister',
    preferredLanguage: user?.preferredLanguage || 'English',
    travelType: user?.travelType || 'Solo',
    budgetRange: user?.budgetRange || 'Moderate (₹5000–₹15000)',
    interests: user?.interests || ['Historical', 'Food', 'Photography'],
  });

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const allInterests = ['Historical', 'Food', 'Adventure', 'Nature', 'Shopping', 'Culture', 'Photography', 'Religious Places'];

  const handleInterestToggle = (interest) => {
    setFormData((prev) => {
      const current = prev.interests || [];
      const updated = current.includes(interest)
        ? current.filter((i) => i !== interest)
        : [...current, interest];
      return { ...prev, interests: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');

    const payload = {
      name: formData.name,
      phone: formData.phone,
      emergencyContact: {
        name: formData.emergencyName,
        phone: formData.emergencyPhone,
        relation: formData.emergencyRelation,
      },
      preferredLanguage: formData.preferredLanguage,
      travelType: formData.travelType,
      interests: formData.interests,
      budgetRange: formData.budgetRange,
    };

    try {
      await API.put('/users/profile', payload);
      updateUserProfile(payload);
      setSuccessMsg('Profile updated successfully!');
    } catch (err) {
      // Local fallback for demo mode
      updateUserProfile(payload);
      setSuccessMsg('Profile saved (Demo Mode)!');
    } finally {
      setSaving(false);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  return (
    <MainLayout title="User Profile">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Banner */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center text-white text-3xl font-extrabold shadow-xl shadow-blue-500/20">
            {formData.name.charAt(0) || 'U'}
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl font-bold text-white">{formData.name}</h2>
            <p className="text-xs text-slate-400">{formData.email}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                {formData.travelType} Traveler
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/30">
                {formData.preferredLanguage}
              </span>
            </div>
          </div>
        </div>

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" />
              <span>Personal Details</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email (Read Only)</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-3 py-2 rounded-xl bg-slate-800/30 border border-slate-700/40 text-slate-400 text-xs cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Preferred Language</label>
                <select
                  value={formData.preferredLanguage}
                  onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Telugu">Telugu</option>
                </select>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 text-amber-400">
              <ShieldAlert className="w-4 h-4" />
              <span>Emergency Contact</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Contact Name</label>
                <input
                  type="text"
                  value={formData.emergencyName}
                  onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Relation</label>
                <input
                  type="text"
                  value={formData.emergencyRelation}
                  onChange={(e) => setFormData({ ...formData, emergencyRelation: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs"
                />
              </div>
            </div>
          </div>

          {/* Travel Preferences */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-teal-400" />
              <span>Travel Style & Preferences</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Travel Type</label>
                <select
                  value={formData.travelType}
                  onChange={(e) => setFormData({ ...formData, travelType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs"
                >
                  <option value="Solo">Solo</option>
                  <option value="Couple">Couple</option>
                  <option value="Family">Family</option>
                  <option value="Friends">Friends</option>
                  <option value="Group">Group</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Typical Budget Range</label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs"
                >
                  <option value="Budget (< ₹5000)">Budget (&lt; ₹5,000)</option>
                  <option value="Moderate (₹5000–₹15000)">Moderate (₹5,000–₹15,000)</option>
                  <option value="Comfortable (₹15000–₹30000)">Comfortable (₹15,000–₹30,000)</option>
                  <option value="Luxury (> ₹30000)">Luxury (&gt; ₹30,000)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Travel Interests</label>
              <div className="flex flex-wrap gap-2">
                {allInterests.map((interest) => {
                  const selected = formData.interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        selected
                          ? 'bg-blue-600 text-white border border-blue-500'
                          : 'bg-slate-800/60 text-slate-400 border border-slate-700/60 hover:text-white'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default Profile;
