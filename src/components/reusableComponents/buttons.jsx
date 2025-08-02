import React from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';

export const SendOtpButton = ({ onClick, type = "submit" }) => (
  <button
    type={type}
    onClick={onClick}
    className="w-full py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition duration-200"
  >
    Send OTP
  </button>
);

export const LoginButton = ({ disabled = false }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full py-2 text-white rounded-md transition duration-200 ${
        disabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-emerald-600 hover:bg-emerald-700'
      }`}
    >
      Login
    </button>
  );
};

export const VerifyOtpButton = ({ type = "submit" }) => (
  <button
    type={type}
    className="w-full py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition duration-200"
  >
    Verify OTP
  </button>
);

export const SetNewPasswordButton = ({ type = "submit" }) => (
  <button
    type={type}
    className="w-full py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition duration-200"
  >
    Set New Password
  </button>
);

export const SignupButton = ({ disabled = false }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full py-2 text-white rounded-md transition duration-200 ${
        disabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-emerald-700'
      }`}
    >
      Signup
    </button>
  );
};

export const ToggleUserListButton = ({ showUsers, onClick }) => (
  <button
    onClick={onClick}
    className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
  >
    {showUsers ? 'Hide Users' : 'Show All Users'}
  </button>
);

export const LogoutButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-red-500 hover:underline"
  >
    Logout
  </button>
);

export const SettingsButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-blue-500 hover:underline"
  >
    Settings
  </button>
);

export const ToggleStatusButton = ({ isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded text-sm font-medium ${
      isActive
        ? 'bg-red-500 text-white hover:bg-red-600'
        : 'bg-green-500 text-white hover:bg-green-600'
    }`}
  >
    {isActive ? 'Deactivate' : 'Activate'}
  </button>
);

export const EditUserButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
    title="Edit"
  >
    <FaEdit size={14} />
  </button>
);

export const DeleteUserButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
    title="Delete"
  >
    <FaTrash size={14} />
  </button>
);

export const SaveChangesButton = () => (
  <button
    type="submit"
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    Save Changes
  </button>
);

export const CancelEditButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
  >
    Cancel
  </button>
);