import React, { useState, useEffect, useCallback } from 'react';
import { Sun, Moon, Cloud, CloudRain, CloudSnow, Wind, Droplet, Thermometer, Sunrise, Sunset, Search, MapPin, RefreshCcw, CloudLightning, CloudDrizzle } from 'lucide-react';
import '../styles/styles.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [unit, setUnit] = useState('metric');
  const [recentSearches, setRecentSearches] = useState([]);

  const fetchWeather = useCallback(async (cityName = city) => {
    if (!cityName.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}${cityName}&appid=${API_KEY}&units=${unit}`);
      const data = await response.json();
      if (data.cod === '404') {
        setError('City not found. Please try again.');
      } else {
        setWeather(data);
        setRecentSearches(prev => [cityName, ...prev.filter(c => c !== cityName)].slice(0, 5));
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
    setLoading(false);
  }, [city, unit]);

  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city, fetchWeather]);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <Sun className="weather-icon text-yellow-400" />;
      case 'Clouds':
        return <Cloud className="weather-icon text-gray-400" />;
      case 'Rain':
        return <CloudRain className="weather-icon text-blue-400" />;
      case 'Snow':
        return <CloudSnow className="weather-icon text-white" />;
      case 'Thunderstorm':
        return <CloudLightning className="weather-icon text-yellow-500" />;
      case 'Drizzle':
        return <CloudDrizzle className="weather-icon text-blue-300" />;
      case 'Mist':
      case 'Smoke':
      case 'Haze':
      case 'Dust':
      case 'Fog':
        return <Cloud className="weather-icon text-gray-300" />;
      default:
        return <Cloud className="weather-icon text-gray-400" />;
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    if (weather) {
      fetchWeather(weather.name);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${unit}`)
          .then(response => response.json())
          .then(data => {
            setWeather(data);
            setCity(data.name);
          })
          .catch(() => {
            setError('Unable to fetch weather for your location.');
          });
      }, () => {
        setError('Unable to retrieve your location.');
      });
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className={`futuristic-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="glass-panel">
        <div className="panel-header">
          <h1 className="panel-title">Weather Forecast</h1>
          <div className="panel-controls">
            <button onClick={toggleDarkMode} className="futuristic-button" aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
            <button onClick={toggleUnit} className="futuristic-button" aria-label={unit === 'metric' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}>
              {unit === 'metric' ? '°F' : '°C'}
            </button>
            <button onClick={getLocation} className="futuristic-button" aria-label="Get weather for current location">
              <MapPin className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter city name"
            className="futuristic-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
          />
          <button onClick={() => fetchWeather()} className="futuristic-button" aria-label="Search">
            <Search className="w-6 h-6" />
          </button>
        </div>
        {loading && <p className="loading-message">Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {weather && (
          <div className="weather-info">
            <div className="weather-main">
              <h2 className="weather-location">{weather.name}, {weather.sys.country}</h2>
              <div className="weather-icon-container floating">
                {getWeatherIcon(weather.weather[0].main)}
              </div>
            </div>
            <p className="weather-temp">
              {Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
            </p>
            <p className="weather-desc">{weather.weather[0].description}</p>
            <div className="data-grid">
              <WeatherBox
                icon={<Thermometer className="w-6 h-6" />}
                label="Feels Like"
                value={`${Math.round(weather.main.feels_like)}°${unit === 'metric' ? 'C' : 'F'}`}
              />
              <WeatherBox
                icon={<Droplet className="w-6 h-6" />}
                label="Humidity"
                value={`${weather.main.humidity}%`}
              />
              <WeatherBox
                icon={<Wind className="w-6 h-6" />}
                label="Wind Speed"
                value={`${weather.wind.speed} ${unit === 'metric' ? 'm/s' : 'mph'}`}
              />
              <WeatherBox
                icon={<Sunrise className="w-6 h-6" />}
                label="Sunrise"
                value={new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
              />
              <WeatherBox
                icon={<Sunset className="w-6 h-6" />}
                label="Sunset"
                value={new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
              />
              <WeatherBox
                icon={<RefreshCcw className="w-6 h-6" />}
                label="Pressure"
                value={`${weather.main.pressure} hPa`}
              />
            </div>
          </div>
        )}
        {recentSearches.length > 0 && (
          <div className="recent-searches">
            <h3>Recent Searches</h3>
            <div className="recent-search-list">
              {recentSearches.map((search, index) => (
                <button key={index} className="recent-search-item" onClick={() => fetchWeather(search)}>
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <WeatherAnimation condition={weather?.weather[0].main} darkMode={darkMode} />
    </div>
  );
}

function WeatherBox({ icon, label, value }) {
  return (
    <div className="data-item">
      <div className="data-icon">{icon}</div>
      <p className="data-label">{label}</p>
      <p className="data-value">{value}</p>
    </div>
  );
}

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