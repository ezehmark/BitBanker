// File: App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';
import ServicesPage from './ServicesPage';
import DataPurchasePage from './DataPurchasePage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/services/:type" element={<ServicesPage />} />
        <Route path="/services/data/:network" element={<DataPurchasePage />} />
      </Routes>
    </Router>
  );
}
