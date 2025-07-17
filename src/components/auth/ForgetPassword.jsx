import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // ✅ For navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert('Please enter your email.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/users/forgot-password', {
        email,
      });

      alert(response.data.message); // e.g., "OTP sent to your email."

      // ✅ Save email to localStorage or navigate with state
      localStorage.setItem('email', email); // or use context/state if you prefer

      // ✅ Navigate to verify-otp page
      navigate('/verify-otp');
    } catch (error) {
      console.error('Forgot password error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Forgot Password
      </h2>

      <p className="text-sm text-gray-600 text-center">
        Enter your registered email to receive an OTP.
      </p>

      <div>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition duration-200"
      >
        Send OTP
      </button>

      <div className="flex justify-between items-center text-sm">
        <Link to="/login" className="text-emerald-700 hover:underline">
          Back to Login
        </Link>
        <Link to="/signup" className="text-emerald-700 hover:underline">
          Create New Account
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
