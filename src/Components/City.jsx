import React from 'react';

const City = ({locations, city, setCity}) => {
    return (
            <div className="flex flex-wrap justify-center gap-2 mb-10">
          {locations.map((loc) => (
            <button
              key={loc.name}
              className={`btn btn-outline btn-sm md:btn-md ${city.name === loc.name ? "btn-active btn-primary shadow-[0_0_15px_rgba(255,117,175,0.5)]" : ""
                }`}
              onClick={() => setCity(loc)}
            >
              {loc.name}
            </button>
          ))}
        </div>
    );
};

export default City;