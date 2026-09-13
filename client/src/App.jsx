import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PlanTrip from './pages/PlanTrip';
import Itinerary from './pages/Itinerary';
import RiskAnalysis from './pages/RiskAnalysis';
import Navigation from './pages/Navigation';
import LiveMonitoring from './pages/LiveMonitoring';
import Alerts from './pages/Alerts';
import Emergency from './pages/Emergency';
import Recommendations from './pages/Recommendations';
import TravelHistory from './pages/TravelHistory';
import SafetyAssistant from './pages/SafetyAssistant';
import Settings from './pages/Settings';
import Admin from './pages/Admin';
import FraudDetection from './pages/FraudDetection';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/plan-trip" element={<ProtectedRoute><PlanTrip /></ProtectedRoute>} />
          <Route path="/itinerary/:id" element={<ProtectedRoute><Itinerary /></ProtectedRoute>} />
          <Route path="/risk-analysis" element={<ProtectedRoute><RiskAnalysis /></ProtectedRoute>} />
          <Route path="/navigation" element={<ProtectedRoute><Navigation /></ProtectedRoute>} />
          <Route path="/live-monitoring" element={<ProtectedRoute><LiveMonitoring /></ProtectedRoute>} />
          <Route path="/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
          <Route path="/emergency" element={<ProtectedRoute><Emergency /></ProtectedRoute>} />
          <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
          <Route path="/travel-history" element={<ProtectedRoute><TravelHistory /></ProtectedRoute>} />
          <Route path="/safety-assistant" element={<ProtectedRoute><SafetyAssistant /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/fraud-detection" element={<ProtectedRoute><FraudDetection /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly={true}><Admin /></ProtectedRoute>} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
