import React from 'react'
import { useState } from 'react';

const PriorityDropdown = () => {
        
      const [selectedPriority, setSelectedPriority] = useState("Priority");
      const [isPriorityOpen, setPriorityOpen] = useState(false);
      const togglePriorityDropdown = () => {
        setPriorityOpen(!isPriorityOpen);
      };
      const handlePrioritySelect = (priority) => {
        setSelectedPriority(priority);
        setPriorityOpen(false); // Close the dropdown after selecting
      };
  return (
    <a
      href="#"
      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    >
      <div className="relative">
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-3 mb-2"
          type="button"
          onClick={togglePriorityDropdown}
        >
          {selectedPriority}
          <svg
            className={`w-2.5 h-2.5 ms-3 ${isPriorityOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {isPriorityOpen && (
          <div
            id="dropdown"
            className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 ">
              <li>
                <button
                  onClick={() => handlePrioritySelect("Low")}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                >
                  Low
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePrioritySelect("Medium")}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                >
                  Medium
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePrioritySelect("High")}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                >
                  High
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </a>
  );
}

export default PriorityDropdown