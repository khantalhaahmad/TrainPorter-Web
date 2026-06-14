import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './modules/auth/LandingPage';
import DashboardPage from './modules/dashboard/DashboardPage';
import BookPorterPage from './modules/booking/BookPorterPage';
import FareBreakdownPage from './modules/booking/FareBreakdownPage';
import SearchingPorterPage from './modules/booking/SearchingPorterPage';
import PorterAssignedPage from './modules/booking/PorterAssignedPage';
import ServiceCompletionPage from './modules/booking/ServiceCompletionPage';
import PaymentPage from './modules/payment/PaymentPage';
import RatingPage from './modules/ratings/RatingPage';
import BookingHistoryPage from './modules/profile/BookingHistoryPage';
import Footer from './components/Footer';
import AuthDrawer from './components/AuthDrawer';
import './App.css';
import BecomePorterPage from './modules/porter/BecomePorterPage';

function App() {
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);

  const openAuthDrawer = () => setIsAuthDrawerOpen(true);
  const closeAuthDrawer = () => setIsAuthDrawerOpen(false);

  return (
    <Router>
      <div className="app-wrapper">
        <AuthDrawer isOpen={isAuthDrawerOpen} onClose={closeAuthDrawer} />
        <Routes>
          <Route path="/" element={<><LandingPage openAuth={openAuthDrawer} /><Footer /></>} />
          {/* Legacy routes handled by drawer now, but kept for compatibility or 404 safety */}
          <Route path="/login" element={<LandingPage openAuth={openAuthDrawer} />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/book" element={<BookPorterPage />} />
          <Route path="/fare" element={<FareBreakdownPage />} />
          <Route path="/searching" element={<SearchingPorterPage />} />
          <Route path="/assigned" element={<PorterAssignedPage />} />
          <Route path="/complete" element={<ServiceCompletionPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/rate" element={<RatingPage />} />
          <Route path="/history" element={<BookingHistoryPage />} />
          <Route path="*" element={<LandingPage openAuth={openAuthDrawer} />} />
          <Route
  path="/become-porter"
  element={<BecomePorterPage />}
/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
