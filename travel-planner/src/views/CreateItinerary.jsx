import React, { useState } from 'react';
import Header from "./Navbar";

const CreateItinerary = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, location, startDate, endDate });
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center" style={{ color: '#34e0a1' }}>Create New Itinerary</h2>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Itinerary Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: '#34e0a1' }}
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Main Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: '#34e0a1' }}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  id="start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="mt-2 block w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: '#34e0a1' }}
                />
              </div>
              <div>
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  id="end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="mt-2 block w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: '#34e0a1' }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-6 font-semibold text-white rounded-lg transition-all focus:outline-none focus:ring-2"
              style={{ backgroundColor: '#34e0a1' }}
            >
              Create Itinerary
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateItinerary;
