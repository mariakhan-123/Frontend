import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [input, setInput] = useState({
    fullName: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    phoneNumber: '',
    profileImg: null,
    coverImg: null,
  });

  const [errors, setErrors] = useState({
    fullName: null,
    email: null,
    password: null,
    dob: null,
    gender: null,
    phoneNumber: null,
  });

  const navigate = useNavigate();

  // Regexes
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const phoneRegex = /^\+\d{1,3}\d{7,14}$/;

  // Validate a single field
  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required.';
        return null;

      case 'email':
        if (!emailRegex.test(value)) return 'Enter a valid email address.';
        return null;

      case 'password':
        if (!passwordRegex.test(value))
          return 'Password must be ≥8 chars, include an uppercase letter and a number.';
        return null;

      case 'dob':
        if (!value) return 'Date of birth is required.';
        const age = new Date().getFullYear() - new Date(value).getFullYear();
        if (age < 16) return 'You must be at least 16 years old.';
        return null;

      case 'gender':
        if (!value) return 'Please select your gender.';
        return null;

      case 'phoneNumber':
        if (!phoneRegex.test(value))
          return 'Phone must start with +<country code> and be 8–17 digits total.';
        return null;

      default:
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const fieldValue = type === 'file' ? files[0] : value;

    setInput((prev) => ({ ...prev, [name]: fieldValue }));

    if (
      ['fullName', 'email', 'password', 'dob', 'gender', 'phoneNumber'].includes(name)
    ) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, fieldValue),
      }));
    }
  };

  const isFormValid =
    Object.values(errors).every((err) => err === null) &&
    input.fullName &&
    input.email &&
    input.password &&
    input.dob &&
    input.gender &&
    input.phoneNumber;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const formData = new FormData();
      formData.append('fullName', input.fullName);
      formData.append('email', input.email);
      formData.append('password', input.password);
      formData.append('DOB', input.dob);
      formData.append('gender', input.gender);
      formData.append('phoneNumber', input.phoneNumber);
      if (input.profileImg) formData.append('profileImg', input.profileImg);
      if (input.coverImg) formData.append('coverImg', input.coverImg);

      const response = await axios.post(
        'http://localhost:8000/users/signup',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      console.log('Server response:', response.data);
      localStorage.setItem('email', input.email);
      alert('Form submitted successfully!');
      navigate('/signup-otp-form'); // Redirect to login
    } catch (err) {
      console.error('Error submitting form:', err.response?.data || err.message);
      alert('Signup failed. See console for details.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">Signup</h2>

      {/* FULL NAME */}
      <div>
        <input
          type="text"
          name="fullName"
          value={input.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* EMAIL */}
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

      {/* PASSWORD */}
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

      {/* DOB */}
      <div>
        <input
          type="date"
          name="dob"
          value={input.dob}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.dob && (
          <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
        )}
      </div>

      {/* GENDER */}
      <div>
        <select
          name="gender"
          value={input.gender}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="custom">Custom</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
        )}
      </div>

      {/* PHONE */}
      <div>
        <input
          type="tel"
          name="phoneNumber"
          value={input.phoneNumber}
          onChange={handleChange}
          placeholder="+92..."
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
        )}
      </div>

      {/* IMAGES */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Profile Image</label>
          <input
            type="file"
            name="profileImg"
            onChange={handleChange}
            accept="image/*"
            className="block w-full text-sm text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Cover Image</label>
          <input
            type="file"
            name="coverImg"
            onChange={handleChange}
            accept="image/*"
            className="block w-full text-sm text-gray-500"
          />
        </div>
      </div>

      {/* LOGIN LINK */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-emerald-700">Already have an account?</span>
        <Link to="/signup-otp-form" className="text-emerald-600 hover:underline">
          Login
        </Link>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`
          w-full py-2 text-white rounded-md transition duration-200
          ${isFormValid
            ? 'bg-blue-600 hover:bg-emerald-700'
            : 'bg-gray-400 cursor-not-allowed'}
        `}
      >
        Signup
      </button>
    </form>
  );
};

export default SignupForm;