import React, { useState, useEffect } from 'react';

const Info = ({ weather, city }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="mt-5 pt-2 border-t-2 border-dashed border-base-300 flex flex-col gap-1">
        <p className="text-xs">COORD_LAT: <span className="text-secondary">{city.lat}</span></p>
        <p className="text-xs">COORD_LON: <span className="text-secondary">{city.lon}</span></p>
        <p className="text-xs mt-2 opacity-50 font-bold uppercase">
          Current_Time: {now.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          }).toUpperCase()}
        </p>
        <p className="text-xs opacity-50 font-bold uppercase">
          Data_Sync: {weather.current.time
            ? new Date(weather.current.time).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              }).toUpperCase()
            : 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default Info;