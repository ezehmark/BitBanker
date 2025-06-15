// File: pages/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const services = ['airtime', 'data', 'tv'];

  return (
    <div style={{
      background: 'url(/svg/home-bg.svg)',
      padding: '30px',
      minHeight: '100vh'
    }}>
      <h2 style={{ marginBottom: '20px', color: '#00d4d4' }}>Select a Service</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {services.map((service) => (
          <div
            key={service}
            onClick={() => navigate(`/services/${service}`)}
            style={{
              cursor: 'pointer',
              background: '#e0f7f7',
              padding: '30px',
              borderRadius: '12px',
              minWidth: '120px',
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#333',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            {service.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}
