import React, { useState, useEffect } from 'react';

function WeatherAnimation({ condition, darkMode }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      const particleCount = condition === 'Rain' || condition === 'Snow' ? 100 : 50;
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 1,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [condition]);

  const getParticleStyle = (particle) => {
    let baseStyle = {
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      animationDuration: `${particle.speed}s`,
    };

    switch (condition) {
      case 'Rain':
        return {
          ...baseStyle,
          backgroundColor: darkMode ? '#4A5568' : '#87CEFA',
          boxShadow: `0 0 5px ${darkMode ? '#4A5568' : '#87CEFA'}`,
          height: '15px',
          width: '1px',
        };
      case 'Snow':
        return {
          ...baseStyle,
          backgroundColor: darkMode ? '#CBD5E0' : 'white',
          boxShadow: `0 0 5px ${darkMode ? '#CBD5E0' : 'white'}`,
          borderRadius: '50%',
        };
      case 'Clear':
        return {
          ...baseStyle,
          backgroundColor: darkMode ? '#F6E05E' : '#FFD700',
          boxShadow: `0 0 5px ${darkMode ? '#F6E05E' : '#FFD700'}`,
          borderRadius: '50%',
          opacity: 0.7,
        };
      case 'Clouds':
        return {
          ...baseStyle,
          backgroundColor: darkMode ? '#718096' : '#E6E6FA',
          boxShadow: `0 0 10px ${darkMode ? '#718096' : '#E6E6FA'}`,
          borderRadius: '50%',
          opacity: 0.5,
          width: `${particle.size * 5}px`,
          height: `${particle.size * 3}px`,
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.5)',
          boxShadow: `0 0 5px ${darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.5)'}`,
          borderRadius: '50%',
        };
    }
  };

  return (
    <div className="particle-container">
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={getParticleStyle(particle)}
          className={`particle ${condition ? condition.toLowerCase() : 'default'}-particle`}
        />
      ))}
    </div>
  );
}

export default WeatherAnimation;
