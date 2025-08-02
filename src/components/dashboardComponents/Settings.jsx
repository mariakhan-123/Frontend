// components/dashboardComponents/Settings.jsx

import React from 'react';
import { Settings } from 'lucide-react';

const SettingsMenu = () => {
  return (
    <div className="relative group">
      {/* Settings Icon */}
      <button className="p-2 rounded hover:bg-gray-200">
        Settings
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity duration-200 z-50">
        <ul className="py-1">
          <li>
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              Update Info
            </button>
          </li>
          <li>
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              Update Username
            </button>
          </li>
          {/* Add more items here */}
        </ul>
      </div>
    </div>
  );
};

export default SettingsMenu;
