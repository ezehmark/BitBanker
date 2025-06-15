// File: pages/ServicesPage.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ServicesPage() {
  const { type } = useParams();
  const navigate = useNavigate();

  const networks = ['MTN', 'GLO', 'AIRTEL', '9MOBILE'];

  return (
    <div style={{
      background: 'url(/svg/service-bg.svg)',
      padding: '30px',
      minHeight: '100vh'
    }}>
      <h2 style={{ marginBottom: '20px', color: '#00d4d4' }}>
        {type?.toUpperCase()} Networks
      </h2>

      {type === 'data' ? (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {networks.map((network) => (
            <div
              key={network}
              onClick={() => navigate(`/services/data/${network.toLowerCase()}`)}
              style={{
                cursor: 'pointer',
                background: '#f0f0f0',
                padding: '20px',
                borderRadius: '10px',
                minWidth: '100px',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#333',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
            >
              {network}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: '#888' }}>Feature for "{type}" is under development.</p>
      )}
    </div>
  );
}
