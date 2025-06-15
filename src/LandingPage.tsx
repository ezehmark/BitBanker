// File: pages/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div style={{
      background: 'url(/svg/landing-bg.svg)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', color: '#00d4d4' }}>Welcome to BiggerData</h1>
      <p>Your one-stop platform for airtime, data & TV subscriptions</p>
      <Link
        to="/register"
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          background: '#00d4d4',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none'
        }}
      >
        Get Started
      </Link>
    </div>
  );
}
