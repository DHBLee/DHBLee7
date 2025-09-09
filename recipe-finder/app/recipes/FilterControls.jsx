// app/recipes/FilterControls.js
'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const FilterControls = ({
  searchTerm,
  setSearchTerm,
  maxPrepTime,
  setMaxPrepTime,
  maxCookTime,
  setMaxCookTime,
}) => {
  const timeOptions = [0, 5, 10, 15, 20];
  const [isPrepOpen, setIsPrepOpen] = useState(false);
  const [isCookOpen, setIsCookOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounce logic for the search term
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
    setDebouncedSearchTerm(searchTerm);
  }, [searchTerm]);

  // Debounce logic: Update debouncedSearchTerm after a delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(localSearchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [localSearchTerm]);

  // Trigger parent setSearchTerm when debouncedSearchTerm changes
  useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) {
      setSearchTerm(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, setSearchTerm, searchTerm]);


  const renderFilterDropdown = (label, isOpen, setIsOpen, timeState, setTimeState, name) => (
    <div className="relative flex flex-col items-center">
      <h3 
        className="py-2 px-4 bg-Neutral0 rounded-lg text-preset6 text-Neutral900 cursor-pointer flex items-center gap-2"
        onClick={() => {
          setIsOpen(!isOpen);
          // Close the other filter when one is opened
          if (name === 'maxPrepTime') setIsCookOpen(false);
          if (name === 'maxCookTime') setIsPrepOpen(false);
        }}
      >
        {label}
        <Image src="/assets/images/icon-chevron-down.svg" alt="Arrow" width={24} height={24} />
      </h3>
      {isOpen && (
        <div className="absolute top-full space-y-1 p-3 mt-4 left-0 w-[130%] bg-white rounded-lg shadow-lg z-10">
          {timeOptions.map((time) => (
              <div key={time} className="flex items-center gap-2 relative">
              <input
                type="radio"
                id={`${name}-${time}`}
                name={name}
                value={time}
                checked={timeState === time.toString()}
                onChange={(e) => setTimeState(e.target.value)}
                className="appearance-none peer absolute inset-0 z-10 cursor-pointer"
              />
              <span className="w-4 h-4 rounded-full border border-Neutral400 flex items-center justify-center transition-colors duration-200 peer-checked:border-Neutral900 before:block before:w-2 before:h-2 before:rounded-full before:bg-Neutral900 before:scale-0 before:transition-transform before:duration-200 peer-checked:before:scale-100"></span>
              <label htmlFor={`${name}-${time}`} className="text-preset6 text-Neutral800 cursor-pointer">
                {time} min
              </label>
            </div>
          ))}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setTimeState('');
                setIsOpen(false);
              }}
              className="text-preset9 text-Neutral800 cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
  return (
    <div className="mb-8 md:mb-12 flex flex-col md:flex-row gap-4 justify-center lg:justify-between items-center p-4 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4">

      {renderFilterDropdown(
          'Max Prep Time',
          isPrepOpen,
          setIsPrepOpen,
          maxPrepTime,
          setMaxPrepTime,
          'maxPrepTime'
        )}
        {renderFilterDropdown(
          'Max Cook Time',
          isCookOpen,
          setIsCookOpen,
          maxCookTime,
          setMaxCookTime,
          'maxCookTime'
        )}

        {/* Search Input */}
      </div>
        <div className="relative w-full md:w-auto">
          <input
            type="search"
            placeholder="Search recipes..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
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