import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(1);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setItinerary(null);

    try {
      const response = await axios.post('http://localhost:5000/api/itinerary', { destination, days });
      setItinerary(response.data);
      console.log("response.data: ", response.data);
    } catch (error) {
      setError('No itinerary found or server error occurred');
      console.error('Error fetching itinerary', error);
    }
  };

  return (
    <div className="App">
      <div className="min-h-screen bg-green-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Travel Planner</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Destination</label>
              <input
                type="text"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Number of Days</label>
              <input
                type="number"
                min="1"
                max="10"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
              Get Plan
            </button>
          </form>
          {error && (
            <div className="mt-4 text-red-600 font-semibold">
              {error}
            </div>
          )}
          {itinerary && (
            <div className={`mt-8 bg-gray-100 p-6 rounded-lg shadow-inner transition-opacity duration-500 ease-in-out ${itinerary.itinerary ? 'opacity-100' : 'opacity-0'}`}>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Your Plans for {itinerary.destination}</h2>
              <div className="space-y-4">
                {itinerary.itinerary.map((dayPlan, index) => (
                  <div key={index} className="bg-white p-4 rounded-md shadow-sm">
                    <h3 className="text-lg font-bold text-indigo-600">Day {index + 1}</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {Object.values(dayPlan)[0].map((place, i) => (
                        <li key={i}>{place}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
