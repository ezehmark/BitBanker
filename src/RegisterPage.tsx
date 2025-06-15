// File: pages/RegisterPage.tsx
import React, { useState } from 'react';

export default function RegisterPage() {
  const [photo, setPhoto] = useState<string | null>(null);

  const capturePhoto = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = mediaStream;
      video.play();

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      document.body.appendChild(video);

      setTimeout(() => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx?.drawImage(video, 0, 0);

        const imgData = canvas.toDataURL('image/png');
        setPhoto(imgData);

        video.pause();
        mediaStream.getTracks().forEach(track => track.stop());
        document.body.removeChild(video);
      }, 2000);
    } catch (err) {
      console.error('Camera access denied or error:', err);
    }
  };

  return (
    <div style={{ background: 'url(/svg/register-bg.svg)', padding: '40px' }}>
      <h2>Register</h2>
      <button onClick={capturePhoto} style={{ padding: '10px', background: '#00d4d4', color: '#fff', border: 'none', borderRadius: '5px' }}>
        Capture Photo
      </button>
      {photo && (
        <div style={{ marginTop: '20px' }}>
          <p>Photo Preview:</p>
          <img src={photo} alt="Captured" style={{ width: '200px', borderRadius: '10px' }} />
        </div>
      )}
    </div>
  );
}
