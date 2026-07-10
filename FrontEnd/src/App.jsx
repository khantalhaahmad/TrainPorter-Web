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

import BecomePorterPage from './modules/porter/BecomePorterPage';
import AboutPage from './modules/company/AboutPage';
import BlogPage from './modules/company/BlogPage';

import Footer from './components/Footer';
import AuthDrawer from './components/AuthDrawer';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import BecomePorterApplyPage from './modules/porter/BecomePorterApplyPage';
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "sonner";
function App() {
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);

  const openAuthDrawer = () => setIsAuthDrawerOpen(true);
  const closeAuthDrawer = () => setIsAuthDrawerOpen(false);

  return (
    <Router>

  <ScrollToTop />

  <div className="app-wrapper">

    <AuthDrawer
      isOpen={isAuthDrawerOpen}
      onClose={closeAuthDrawer}
    />

    <Routes>

          {/* Home */}
          <Route
            path="/"
            element={
              <>
                <LandingPage openAuth={openAuthDrawer} />
                <Footer />
              </>
            }
          />

          {/* Auth Compatibility */}
          <Route
            path="/login"
            element={
              <>
                <LandingPage openAuth={openAuthDrawer} />
                <Footer />
              </>
            }
          />

          {/* Dashboard */}
         <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>

          {/* Booking Flow */}
          <Route
  path="/book"
  element={
    <ProtectedRoute>
      <BookPorterPage />
    </ProtectedRoute>
  }
/>
          <Route
            path="/fare"
            element={<FareBreakdownPage />}
          />

          <Route
            path="/searching"
            element={<SearchingPorterPage />}
          />

          <Route
            path="/assigned"
            element={<PorterAssignedPage />}
          />

          <Route
            path="/complete"
            element={<ServiceCompletionPage />}
          />

          {/* Payment */}
          <Route
            path="/payment"
            element={<PaymentPage />}
          />

          {/* Rating */}
          <Route
            path="/rate"
            element={<RatingPage />}
          />

          {/* Profile */}
         <Route
  path="/history"
  element={
    <ProtectedRoute>
      <BookingHistoryPage />
    </ProtectedRoute>
  }
/>
          {/* Footer Pages */}

          <Route
            path="/become-porter"
            element={
              <>
                <BecomePorterPage />
                <Footer />
              </>
            }
          />
<Route
  path="/become-porter/apply"
  element={
    <ProtectedRoute>
      <>
        <BecomePorterApplyPage />
        <Footer />
      </>
    </ProtectedRoute>
  }
/>
          <Route
            path="/about"
            element={
              <>
                <AboutPage />
                <Footer />
              </>
            }
          />
<Route
  path="/blog"
  element={
    <>
      <BlogPage />
      <Footer />
    </>
  }
/>
                    {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <>
                <LandingPage openAuth={openAuthDrawer} />
                <Footer />
              </>
            }
          />

        </Routes>

        {/* Global Toast Notifications */}
        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={3000}
        />

      </div>
    </Router>
  );
}

export default App;