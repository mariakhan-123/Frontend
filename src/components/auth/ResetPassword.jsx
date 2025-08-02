import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SetNewPasswordButton } from '../reusableComponents/buttons';
const ResetPasswordForm = () => {
  const [input, setInput] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.newPassword !== input.confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      await axios.post('http://localhost:8000/users/reset-password', {
        email,
        newPassword: input.newPassword,
      });

      alert("Password reset successful!");
      localStorage.removeItem('email'); // cleanup
      navigate('/login');
    } catch (error) {
      console.error("Reset error:", error.response?.data || error.message);
      alert("Password reset failed. Try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Reset Password
      </h2>

      <p className="text-sm text-gray-600 text-center">
        Enter a new password for your account.
      </p>

      <div>
        <input
          type="password"
          name="newPassword"
          value={input.newPassword}
          onChange={handleChange}
          placeholder="New Password"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <input
          type="password"
          name="confirmPassword"
          value={input.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <SetNewPasswordButton />
      <p className="text-center text-sm text-gray-600">
        Remembered your password?{' '}
        <a href="/login" className="text-emerald-700 hover:underline">
          Login
        </a>
      </p>
    </form>
  );
};

export default ResetPasswordForm;
