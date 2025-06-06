import React from 'react';
import './Loader.css';

export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="dots-loader">
        <div></div><div></div><div></div>
      </div>
      <p style={{ marginTop: '10px', color: '#40916c', fontWeight: 'bold' }}>Carregando...</p>
    </div>
  );
}
