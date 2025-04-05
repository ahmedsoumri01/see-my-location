import React, { useState } from "react";

const LocationFinder = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(position.timestamp).toLocaleString(),
        });
        setLoading(false);
      },
      (err) => {
        setError(`Error getting location: ${err.message}`);
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          📍 Location Finder
        </h1>

        <div className="flex justify-center">
          <button
            onClick={getLocation}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 disabled:bg-blue-300 transition duration-300"
          >
            {loading ? "Getting location..." : "Get My Location"}
          </button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {location && (
          <div className="mt-8 space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                📌 Location Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-gray-700">
                <div className="font-medium">Latitude:</div>
                <div>{location.latitude.toFixed(6)}</div>

                <div className="font-medium">Longitude:</div>
                <div>{location.longitude.toFixed(6)}</div>

                <div className="font-medium">Accuracy:</div>
                <div>{location.accuracy.toFixed(2)} meters</div>

                <div className="font-medium">Timestamp:</div>
                <div>{location.timestamp}</div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg shadow">
              <div className="w-full aspect-video">
                <iframe
                  title="User Location Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                    location.longitude - 0.01
                  }%2C${location.latitude - 0.01}%2C${
                    location.longitude + 0.01
                  }%2C${location.latitude + 0.01}&layer=mapnik&marker=${
                    location.latitude
                  }%2C${location.longitude}`}
                  className="w-full h-full border-0"
                ></iframe>
              </div>
              <a
                href={`https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}#map=15/${location.latitude}/${location.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="block p-3 text-center text-blue-600 bg-blue-50 hover:bg-blue-100 font-medium"
              >
                🔎 View larger map
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationFinder;
