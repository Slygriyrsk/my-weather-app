import React from 'react';

function WeatherBox({ icon, label, value }) {
  return (
    <div className="data-item">
      <div className="data-icon">{icon}</div>
      <p className="data-label">{label}</p>
      <p className="data-value">{value}</p>
    </div>
  );
}

export default WeatherBox;
