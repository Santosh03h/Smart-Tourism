export const getSafetyLevelDetails = (score) => {
  if (score >= 76) {
    return { label: 'Low Risk', level: 'LOW', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30', badge: 'bg-emerald-500 text-white' };
  } else if (score >= 51) {
    return { label: 'Moderate Risk', level: 'MODERATE', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30', badge: 'bg-amber-500 text-white' };
  } else if (score >= 26) {
    return { label: 'High Risk', level: 'HIGH', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30', badge: 'bg-orange-500 text-white' };
  } else {
    return { label: 'Critical Risk', level: 'CRITICAL', color: 'text-rose-500', bg: 'bg-rose-500/10 border-rose-500/30', badge: 'bg-rose-600 text-white' };
  }
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0);
};
