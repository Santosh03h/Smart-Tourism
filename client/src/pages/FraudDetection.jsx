import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import DemoBadge from '../components/DemoBadge';
import { ShieldAlert, DollarSign, Calculator, AlertTriangle, CheckCircle2, Info, Sparkles } from 'lucide-react';

const FraudDetection = () => {
  const [serviceType, setServiceType] = useState('Taxi');
  const [quotedPrice, setQuotedPrice] = useState(800);
  const [distanceKm, setDistanceKm] = useState(12);

  const safeQuoted = Math.max(0, Number(quotedPrice) || 0);
  const safeDistance = Math.max(1, Number(distanceKm) || 1);

  // Fair benchmark calculation rules
  const calculateFairPrice = () => {
    switch (serviceType) {
      case 'Taxi':
        return Math.round(50 + safeDistance * 15); // Base ₹50 + ₹15/km
      case 'Hotel':
        return 2500; // Average moderate hotel
      case 'Restaurant':
        return 350; // Standard meal per head
      case 'Ticket':
        return 500; // Standard monument ticket
      case 'Local Guide':
        return 800; // Half-day guide rate
      default:
        return 500;
    }
  };

  const fairPrice = calculateFairPrice();
  const diff = safeQuoted - fairPrice;
  const percentDiff = fairPrice > 0 ? Math.round((diff / fairPrice) * 100) : 0;

  let statusLabel = 'FAIR PRICE';
  let statusColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  let statusDesc = 'Quoted price matches standard market rates.';

  if (percentDiff > 50) {
    statusLabel = 'VERY HIGH / POTENTIAL OVERCHARGE';
    statusColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    statusDesc = `Quoted price is ${percentDiff}% above standard fair rate. High risk of tourist overcharging!`;
  } else if (percentDiff > 15) {
    statusLabel = 'SLIGHTLY HIGH';
    statusColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    statusDesc = `Quoted price is ${percentDiff}% above typical rate. Negotiate before accepting.`;
  }

  const futureFeatures = [
    { title: 'Taxi Fare Anomaly Engine', desc: 'Real-time GPS ride fare audit against official municipal meter tariffs.' },
    { title: 'Hotel Price Fraud Shield', desc: 'Cross-checks listed online room rates against peak-season benchmarks.' },
    { title: 'Tourist Scam Reporting Portal', desc: 'Community-driven crowdsourced reporting for active touts & fake ticket counters.' },
    { title: 'Area Scam Heatmaps', desc: 'High-risk scam hotspot warnings for markets, railway stations, and monuments.' }
  ];

  return (
    <MainLayout title="Scam & Fraud Detection">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Banner */}
        <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-indigo-950/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/40">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Scam & Fraud Protection Module</h2>
                <DemoBadge isLive={false} text="PRICE AUDIT ENGINE" />
              </div>
              <p className="text-xs text-slate-400">Detect tourist price gouging, overcharging, and fraudulent services</p>
            </div>
          </div>
        </div>

        {/* Interactive Demo Price Checker Tool */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
            <Calculator className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">Price Anomaly Checker (Demo Calculator)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Service Type</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs font-medium"
              >
                <option value="Taxi">Taxi / Auto Fare</option>
                <option value="Hotel">Hotel Room Rate</option>
                <option value="Restaurant">Restaurant Meal</option>
                <option value="Ticket">Monument Ticket</option>
                <option value="Local Guide">Local Tour Guide</option>
              </select>
            </div>

            {serviceType === 'Taxi' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Distance (km)</label>
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Quoted Price (₹ INR)</label>
              <input
                type="number"
                step="50"
                value={quotedPrice}
                onChange={(e) => setQuotedPrice(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white text-xs"
              />
            </div>
          </div>

          {/* Audit Results Box */}
          <div className={`p-5 rounded-3xl border ${statusColor} space-y-3`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">{statusLabel}</span>
              <span className="text-xs font-mono">Price Difference: {diff > 0 ? `+₹${diff}` : `₹${diff}`}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-700/50">
              <div>
                <span className="text-xs text-slate-400 block">Quoted Price</span>
                <span className="text-xl font-extrabold text-white">₹{safeQuoted}</span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block">Estimated Fair Rate</span>
                <span className="text-xl font-extrabold text-emerald-400">₹{fairPrice}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 pt-1">{statusDesc}</p>
          </div>

          <p className="text-[11px] text-slate-500 mt-4 flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            <span>Note: This calculation is an ESTIMATE based on general market averages and not a legal price guarantee.</span>
          </p>
        </div>

        {/* Future Scope Roadmap Cards */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800">
          <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Future Fraud Prevention Scope</span>
          </h3>
          <p className="text-xs text-slate-400 mb-4">Planned AI scam detection modules in upcoming release</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {futureFeatures.map((feat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50">
                <h4 className="font-bold text-xs text-white mb-1">{feat.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FraudDetection;
