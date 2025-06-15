// File: pages/DataPurchasePage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function DataPurchasePage() {
  const { network } = useParams();
  const [form, setForm] = useState({
    phone: '',
    amount: '',
    pin: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    alert(`Processing ${form.amount}MB for ${form.phone} on ${network?.toUpperCase()}`);
    // TODO: send data to backend
  };

  return (
    <div style={{
      background: 'url(/svg/data-bg.svg)',
      padding: '40px',
      maxWidth: '500px',
      margin: 'auto',
      minHeight: '100vh'
    }}>
      <h2 style={{ marginBottom: '20px', color: '#00d4d4' }}>
        Buy Data - {network?.toUpperCase()}
      </h2>

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        style={inputStyle}
      />
      <input
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount (MB)"
        style={inputStyle}
      />
      <input
        name="pin"
        value={form.pin}
        onChange={handleChange}
        placeholder="Transaction PIN"
        type="password"
        style={inputStyle}
      />

      <button onClick={handleSubmit} style={buttonStyle}>
        Buy Now
      </button>
    </div>
  );
}

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '12px',
  marginBottom: '15px',
  borderRadius: '8px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  padding: '12px 20px',
  background: '#00d4d4',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  width: '100%'
};
