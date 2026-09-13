import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Shield, Compass, AlertTriangle, Navigation as NavIcon, Bell, 
  AlertCircle, ArrowRight, UserCheck, Bot, CheckCircle, ChevronRight, Zap
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Compass, title: 'AI Trip Planning', desc: 'Generate customized day-by-day itineraries tailored to your budget, dates, and interests.' },
    { icon: AlertTriangle, title: 'Safety Risk Analysis', desc: 'Real-time 0-100 risk scoring based on crime rates, weather, traffic, and time of day.' },
    { icon: NavIcon, title: 'Smart Route Planning', desc: 'Compare Fastest vs. Safest vs. Balanced routes to navigate unfamiliar cities confidently.' },
    { icon: Bell, title: 'Real-Time Alerts', desc: 'Proactive notifications for bad weather, congestion, pickpocket zones, and emergencies.' },
    { icon: AlertCircle, title: 'Emergency SOS', desc: 'One-tap emergency broadcast sharing your location with emergency contacts & services.' },
    { icon: Bot, title: 'Local Recommendations', desc: 'Discover hidden gems, safe food stalls, verified restaurants, and cultural spots.' },
  ];

  const workflowSteps = [
    { title: 'User Access', desc: 'Create your traveler profile & preferences' },
    { title: 'Plan a Trip', desc: 'Enter destination, dates & budget' },
    { title: 'AI Trip Generation', desc: 'Receive instant smart itinerary' },
    { title: 'Live Monitoring', desc: 'GPS & environmental tracking' },
    { title: 'AI Risk Analysis', desc: 'Continuous safety evaluation' },
    { title: 'Safe Route', desc: 'Optimized path recommendation' },
    { title: 'Safety Alerts', desc: 'Instant warnings for hazards' },
    { title: 'Emergency Support', desc: 'Instant 1-tap SOS assistance' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Navbar */}
      <nav className="glass-panel sticky top-0 z-50 border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight">Smart Tourism</span>
              <span className="text-xs text-blue-400 block font-medium">Safety Platform</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-6 animate-pulse">
            <Zap className="w-3.5 h-3.5" />
            <span>AI-POWERED SMART TOURISM & SAFETY</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            AI-Powered Smart Tourism & <span className="gradient-text">Safety Platform</span>
          </h1>

          <p className="text-xl md:text-2xl text-teal-400 font-semibold mb-4">
            Plan Smart • Travel Safe • Explore Freely
          </p>

          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Plan personalized trips, discover places, monitor travel risks, and stay safe with continuous AI-powered tourism assistance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/plan-trip')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-blue-600/30 transition-all hover:scale-105"
            >
              <span>Plan Your Trip</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl glass-card text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/60 transition-all"
            >
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section id="features" className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Core Platform Features</h2>
          <p className="text-slate-400 text-sm">Everything you need for a stress-free and secure journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="glass-card p-6 rounded-2xl border border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-16 px-6 glass-panel border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">How It Works</h2>
            <p className="text-slate-400 text-sm">End-to-end intelligent flow for tourist protection</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="glass-card p-4 rounded-xl border border-slate-800 flex flex-col items-center text-center relative">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-2">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-sm text-white mb-1">{step.title}</h4>
                <p className="text-[11px] text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-slate-500 text-xs border-t border-slate-800">
        <p>© 2026 AI-Powered Smart Tourism & Safety Platform. Built for Safe Travels.</p>
      </footer>
    </div>
  );
};

export default Landing;
