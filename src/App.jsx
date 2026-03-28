import { useState, useEffect } from 'react';
import Info from './Components/Info';
import Status from './Components/Status';
import City from './Components/City';
import { TriangleAlert } from "lucide-react";
import { XCircle } from "lucide-react";
function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState({ name: "Chattogram", lat: 22.3569, lon: 91.7832 });
  const [error, setError] = useState(null); // Add error state

  const locations = [
    // Cities
    { name: "Chattogram", lat: 22.3569, lon: 91.7832 },
    { name: "Dhaka", lat: 23.8103, lon: 90.4125 },
    { name: "Tokyo", lat: 35.67, lon: 139.65 },
    { name: "Berlin", lat: 52.52, lon: 13.41 },
    { name: "London", lat: 51.50, lon: -0.12 },

    // South Asia
    { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
    { name: "Delhi", lat: 28.6139, lon: 77.2090 },
    { name: "Karachi", lat: 24.8607, lon: 67.0011 },
    { name: "Colombo", lat: 6.9271, lon: 79.8612 },
    { name: "Kathmandu", lat: 27.7172, lon: 85.3240 },

    // Southeast Asia
    { name: "Singapore", lat: 1.3521, lon: 103.8198 },
    { name: "Bangkok", lat: 13.7367, lon: 100.5231 },
    { name: "Jakarta", lat: -6.2088, lon: 106.8456 },
    { name: "Hanoi", lat: 21.0285, lon: 105.8542 },
    { name: "Manila", lat: 14.5995, lon: 120.9842 },

    // East Asia
    { name: "Beijing", lat: 39.9042, lon: 116.4074 },
    { name: "Seoul", lat: 37.5665, lon: 126.9780 },
    { name: "Shanghai", lat: 31.2304, lon: 121.4737 },

    // Middle East
    { name: "Dubai", lat: 25.2048, lon: 55.2708 },
    { name: "Riyadh", lat: 24.7136, lon: 46.6753 },
    { name: "Tehran", lat: 35.6892, lon: 51.3890 },
    { name: "Istanbul", lat: 41.0082, lon: 28.9784 },

    // Europe
    { name: "Paris", lat: 48.8566, lon: 2.3522 },
    { name: "Rome", lat: 41.9028, lon: 12.4964 },
    { name: "Moscow", lat: 55.7558, lon: 37.6173 },
    { name: "Oslo", lat: 59.9139, lon: 10.7522 },
    { name: "Athens", lat: 37.9838, lon: 23.7275 },

    // North America
    { name: "New York", lat: 40.7128, lon: -74.0060 },
    { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
    { name: "Chicago", lat: 41.8781, lon: -87.6298 },
    { name: "Mexico City", lat: 19.4326, lon: -99.1332 },
    { name: "Toronto", lat: 43.6532, lon: -79.3832 },

    // South America
    { name: "São Paulo", lat: -23.5505, lon: -46.6333 },
    { name: "Buenos Aires", lat: -34.6037, lon: -58.3816 },
    { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729 },
    { name: "Bogotá", lat: 4.7110, lon: -74.0721 },
    { name: "Santiago", lat: -33.4489, lon: -70.6693 },

    // Africa
    { name: "Cairo", lat: 30.0444, lon: 31.2357 },
    { name: "Lagos", lat: 6.5244, lon: 3.3792 },
    { name: "Nairobi", lat: -1.2864, lon: 36.8172 },
    { name: "Cape Town", lat: -33.9249, lon: 18.4241 },
    { name: "Casablanca", lat: 33.5731, lon: -7.5898 },

    // Oceania
    { name: "Sydney", lat: -33.8688, lon: 151.2093 },
    { name: "Melbourne", lat: -37.8136, lon: 144.9631 },
    { name: "Auckland", lat: -36.8485, lon: 174.7633 },

    // Polar/Arctic regions
    { name: "Reykjavik", lat: 64.1466, lon: -21.9426 },
    { name: "Murmansk", lat: 68.9585, lon: 33.0827 },

    // Desert climates
    { name: "Las Vegas", lat: 36.1699, lon: -115.1398 },
    { name: "Phoenix", lat: 33.4484, lon: -112.0740 },

    // Tropical islands
    { name: "Honolulu", lat: 21.3069, lon: -157.8583 },
    { name: "Bali", lat: -8.3405, lon: 115.0920 }
  ];

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null); // Reset error on new fetch
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,apparent_temperature,wind_speed_10m,relative_humidity_2m&timezone=auto`
        );

        // Check if response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Link Terminated. Error:", error);
        setError(error.message);
        setWeather(null); // Clear weather data on error
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  return (
    <div data-theme="cyberpunk" className="min-h-screen bg-base-300 p-4 md:p-10 font-mono">
      <div className="max-w-5xl mx-auto">

        {/* Neon Header */}
        <header className="text-center mb-12 border-b-4 border-primary pb-6">
          <h1 className="text-5xl font-black italic tracking-tighter text-secondary uppercase">
            System_Weather // v3.0
          </h1>
          <p className="text-primary font-bold mt-2 tracking-widest uppercase text-sm">
            Global Climate Data_
          </p>

          {/* Dynamic Status Bar */}
          <Status loading={loading} error={error} city={city} />
        </header>

        {/* City Switcher (Tabs) */}
        <div>
          <City locations={locations} city={city} setCity={setCity} />
        </div>
        {/* Data Matrix */}
        <main className="grid place-items-center">
          {loading ? (
            <div className="flex flex-col items-center py-20">
              <span className="loading loading-bars loading-lg text-secondary"></span>
              <p className="text-secondary mt-4 animate-pulse uppercase tracking-widest">Decrypting signals...</p>
            </div>
          ) : error ? (
            // Show error message if there's an error
            <div className="alert alert-error shadow-lg max-w-2xl">
              <div>
                <XCircle className="stroke-current shrink-0 h-6 w-6" />
                <span>Error: Failed to fetch weather data. Please try again.</span>
              </div>
            </div>
          ) : weather && weather.current ? ( // Check if weather and weather.current exist
            <div className="card w-full max-w-2xl bg-base-100 rounded-none border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
              <div className="card-body">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="card-title text-4xl font-black uppercase italic">{city.name}</h2>
                  <div className="badge badge-secondary font-bold animate-pulse">LIVE_FEED</div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-black text-primary p-4 border-l-8 border-primary">
                    <div className="text-xs uppercase font-bold">Temperature</div>
                    <div className="text-3xl font-black">{weather.current.temperature_2m}°C</div>
                  </div>

                  <div className="bg-black text-secondary p-4 border-l-8 border-secondary">
                    <div className="text-xs uppercase font-bold">Wind_Speed</div>
                    <div className="text-3xl font-black">{weather.current.wind_speed_10m}</div>
                    <div className="text-[10px]">KM/H</div>
                  </div>

                  <div className="bg-black text-accent p-4 border-l-8 border-accent">
                    <div className="text-xs uppercase font-bold">Humidity</div>
                    <div className="text-3xl font-black">{weather.current.relative_humidity_2m}%</div>
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-label font-bold uppercase text-xs text-secondary">Feels_Like</div>
                  <div className="stat-value text-secondary">{weather.current.apparent_temperature}°C</div>
                </div>

                {/* System Info */}
                <Info weather={weather} city={city} />
              </div>
            </div>
          ) : (
            // Fallback if weather data is incomplete
            <div className="alert alert-warning shadow-lg max-w-2xl">
              <div>
                <TriangleAlert className="stroke-current shrink-0 h-6 w-6" />
                <span>No weather data available.</span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
