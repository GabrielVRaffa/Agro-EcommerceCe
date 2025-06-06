import React from 'react';
import './Loader.css';

export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="dots-loader">
        <div></div><div></div><div></div>
      </div>
      <p style={{ marginTop: '10px', color: '#2d6a4f', fontWeight: 'bold' }}>Carregando...</p>
    </div>
  );
}
