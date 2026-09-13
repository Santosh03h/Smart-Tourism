import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import DemoBadge from '../components/DemoBadge';
import { Compass, Utensils, Sparkles, ShoppingBag, Clock, ShieldCheck, MapPin, Tag } from 'lucide-react';

const Recommendations = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const recommendations = [
    {
      id: 'r1',
      name: 'Moti Mahal Restaurant',
      category: 'Restaurants',
      description: 'Legendary Daryaganj eatery — birthplace of butter chicken and dal makhani.',
      estimatedPrice: '₹400–₹700 / person',
      distance: '3.5 km',
      safetyScore: 92,
      recommendedTime: 'Dinner (8 PM – 10 PM)',
      location: 'Delhi'
    },
    {
      id: 'r2',
      name: 'Paranthe Wali Gali',
      category: 'Local Food',
      description: 'Historic Old Delhi street serving deep-fried stuffed parathas with spicy gravies.',
      estimatedPrice: '₹150 / person',
      distance: '3.0 km',
      safetyScore: 78,
      recommendedTime: 'Breakfast / Lunch',
      location: 'Delhi'
    },
    {
      id: 'r3',
      name: 'Agrasen Ki Baoli',
      category: 'Hidden Gems',
      description: 'Ancient 108-step stepwell tucked away near Connaught Place — haunting & serene.',
      estimatedPrice: 'Free Entry',
      distance: '1.5 km',
      safetyScore: 88,
      recommendedTime: 'Morning (9 AM – 11 AM)',
      location: 'Delhi'
    },
    {
      id: 'r4',
      name: 'Panna Meena Ka Kund',
      category: 'Hidden Gems',
      description: 'Symmetrical geometric stepwell near Amber Fort — photogenic and peaceful.',
      estimatedPrice: 'Free Entry',
      distance: '12 km',
      safetyScore: 90,
      recommendedTime: 'Morning',
      location: 'Jaipur'
    },
    {
      id: 'r5',
      name: 'Bapu Bazaar Handicrafts',
      category: 'Shopping',
      description: 'Famous market for Rajasthani textiles, mojaris (leather shoes), and lac bangles.',
      estimatedPrice: '₹500–₹3,000',
      distance: '2.0 km',
      safetyScore: 82,
      recommendedTime: 'Afternoon / Evening',
      location: 'Jaipur'
    },
    {
      id: 'r6',
      name: 'Taj Mahal Sunrise Walking Tour',
      category: 'Activities',
      description: 'Guided early morning tour avoiding afternoon heat & massive tour bus crowds.',
      estimatedPrice: '₹1,100 ticket + ₹500 guide',
      distance: '0.5 km',
      safetyScore: 96,
      recommendedTime: 'Sunrise (5:30 AM)',
      location: 'Agra'
    }
  ];

  const categories = ['ALL', 'Restaurants', 'Local Food', 'Hidden Gems', 'Shopping', 'Activities'];

  const filtered = activeCategory === 'ALL'
    ? recommendations
    : recommendations.filter(r => r.category === activeCategory);

  return (
    <MainLayout title="Local Recommendations">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Banner */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Compass className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">AI Local Guide</span>
              <DemoBadge isLive={false} text="VERIFIED SPOTS" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Curated Local Experiences</h2>
            <p className="text-xs text-slate-400">Discover safe dining, hidden architectural gems, & traditional markets</p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div key={item.id} className="glass-card p-5 rounded-3xl border border-slate-800 flex flex-col justify-between hover:border-blue-500/40">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">{item.name}</h3>
                  </div>
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
                    {item.safetyScore} Safety
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-4 leading-relaxed">{item.description}</p>

                <div className="space-y-2 text-xs text-slate-300 mb-4">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Est. Cost: <strong className="text-white">{item.estimatedPrice}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Best Visit: <strong className="text-white">{item.recommendedTime}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    <span>Location: <strong className="text-white">{item.location} ({item.distance})</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  Verified Safe Spot
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Recommendations;
