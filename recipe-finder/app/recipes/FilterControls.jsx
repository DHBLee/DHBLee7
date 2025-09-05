// app/recipes/FilterControls.js

import React from 'react';

const FilterControls = ({
  searchTerm,
  setSearchTerm,
  maxPrepTime,
  setMaxPrepTime,
  maxCookTime,
  setMaxCookTime,
}) => {
  const timeOptions = [0, 5, 10, 15, 20];

  return (
    <div className="mb-8 md:mb-12 flex flex-col md:flex-row gap-4 justify-center items-center p-4 rounded-lg">
      {/* Max Prep Time Dropdown */}
      <div className="w-full md:w-auto">
        <select
          value={maxPrepTime}
          onChange={(e) => setMaxPrepTime(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-Neutral900"
        >
          <option value="" disabled>Max Prep Time</option>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time} minutes
            </option>
          ))}
          <option value="" onClick={() => setMaxPrepTime('')}>Clear</option>
        </select>
      </div>

      {/* Max Cook Time Dropdown */}
      <div className="w-full md:w-auto">
        <select
          value={maxCookTime}
          onChange={(e) => setMaxCookTime(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-Neutral900"
        >
          <option value="" disabled>Max Cook Time</option>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time} minutes
            </option>
          ))}
          <option value="" onClick={() => setMaxCookTime('')}>Clear</option>
        </select>
      </div>

      {/* Search Input */}
      <div className="relative w-full md:w-auto">
        <input
          type="search"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-Neutral900"
        />
        <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
};

export default FilterControls;