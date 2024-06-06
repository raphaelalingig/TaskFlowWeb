import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DueDateDropdown = ({ setSelectedStartDate, setSelectedEndDate }) => {
  const [selected1stDate, setSelected1stDate] = useState(null);
  const [selected2ndDate, setSelected2ndDate] = useState(null);

  // When a date is selected, update the corresponding state
  const handleFirstDateChange = (date) => {
    setSelected1stDate(date);
    const formattedDate = date ? date.toISOString().split("T")[0] : null; // Format date to "YYYY-MM-DD"
    setSelectedStartDate(formattedDate); // Update start date state in AddProject.js
  };

  const handleSecondDateChange = (date) => {
    setSelected2ndDate(date);
    const formattedDate = date ? date.toISOString().split("T")[0] : null; // Format date to "YYYY-MM-DD"
    setSelectedEndDate(formattedDate); // Update end date state in AddProject.js
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        <DatePicker
          selected={selected1stDate}
          onChange={(date) => handleFirstDateChange(date)}
          dateFormat="yyyy-MM-dd"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholderText="Select date start"
        />
      </div>
      <span className="mx-4 text-gray-500">to</span>
      <div className="relative">
        <DatePicker
          selected={selected2ndDate}
          onChange={(date) => handleSecondDateChange(date)}
          dateFormat="yyyy-MM-dd"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholderText="Select date end"
        />
      </div>
    </div>
  );
};

export default DueDateDropdown;
