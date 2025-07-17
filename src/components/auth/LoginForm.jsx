import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  // Validation Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!emailRegex.test(value)) return 'Enter a valid email address.';
        return null;

      case 'password':
        if (!passwordRegex.test(value))
          return 'Password must be ≥8 chars, include an uppercase letter and a number.';
        return null;

      default:
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (['email', 'password'].includes(name)) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const isFormValid =
    Object.values(errors).every((err) => err === null) &&
    input.email &&
    input.password;

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!isFormValid) return;

  try {
    const response = await axios.post('http://localhost:8000/users/login', {
      email: input.email,
      password: input.password,
    });

    const { token, email } = response.data;

    if (token && email) {
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);

      alert('Login successful!');
      navigate('/dashboard'); // ✅ Now redirect
    } else {
      alert('Unexpected response from server.');
    }
  } catch (err) {
    console.error('Login failed:', err.response?.data || err.message);
    alert('Login failed. Please check your credentials.');
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>

      {/* Email */}
      <div>
        <input
          type="email"
          name="email"
          value={input.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {/* Links */}
      <div className="flex justify-between items-center text-sm">
        <Link to="/signup" className="text-emerald-700 hover:underline">
          Don’t have an account? Signup
        </Link>
        <Link to="/forgot-password" className="text-emerald-700 hover:underline">
          Forgot Password?
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full py-2 text-white rounded-md transition duration-200 ${
          isFormValid
            ? 'bg-emerald-600 hover:bg-emerald-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
