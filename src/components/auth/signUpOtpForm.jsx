import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpOtpForm = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigate = useNavigate();

  // Option 1: Get email from localStorage (or replace with props/context)
  const email = localStorage.getItem('email');

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return; // Only allow numbers or empty

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next box automatically
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join('');
    if (finalOtp.length !== 4) {
      alert('Please enter a 4-digit OTP.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/users/verify-signup-otp', {
        email,
        otp: finalOtp,
      });

      alert(response.data.message);
      navigate('/login'); // Redirect after success
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'OTP verification failed.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Verify OTP
      </h2>

      <p className="text-sm text-gray-600 text-center">
        Enter the 4-digit code sent to your email.
      </p>

      {/* OTP input boxes */}
      <div className="flex justify-center gap-3">
        {otp.map((digit, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            className="w-12 h-12 text-xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition duration-200"
      >
        Verify OTP
      </button>

      <p className="text-center text-sm text-gray-600">
        Didn’t receive the code?{' '}
        <Link to="/forgot-password" className="text-emerald-700 hover:underline">
          Resend
        </Link>
      </p>
    </form>
  );
};

export default SignUpOtpForm;