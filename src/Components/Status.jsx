import React from 'react';

const Status = ({loading, error,city}) => {
    return (
        <div>
            <div
            className={`text-xs font-bold mt-4 transition-all duration-500 h-6 flex items-center justify-center
      ${loading ? "text-secondary animate-pulse" :
                error ? "text-error animate-bounce" : "text-primary animate-pulse"}
    `}
          >
            {loading ? (
              <span>[ SIGNAL_SEARCH: ESTABLISHING_HANDSHAKE... ]</span>
            ) : error ? (
              <span className="bg-error text-error-content px-2 py-0.5 border border-black shadow-[2px_2px_0px_black]">
                [ ! ] CRITICAL_FAILURE: CONNECTION_LOST_
              </span>
            ) : (
              <span className="tracking-tight">
                [ STATUS: <span className="text-green-600 italic ">ONLINE</span> //
                LOCATION: <span className="italic text-fuchsia-600">{city.name.toUpperCase()}</span> ]
              </span>
            )}
          </div>
        </div>
    );
};

export default Status;