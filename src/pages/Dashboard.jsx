import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogoutButton } from '../components/reusableComponents/buttons';
import ShowAllUsers from '../components/dashboardComponents/ShowAllUsers';
import AddPost from '../components/dashboardComponents/AddPost';
import ShowPosts from '../components/dashboardComponents/showPosts';
import SettingsMenu from '../components/dashboardComponents/Settings';

import PublicPage from './PublicPage'

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgKey, setImgKey] = useState(Date.now());
  const [showUsers, setShowUsers] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showPublicPosts, setShowPublicPosts] = useState(false);


  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found. Please login.');

      const response = await axios.get('http://localhost:8000/users/get-user', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImg', file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:8000/users/update-profile-image',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setUser(response.data);
      setImgKey(Date.now());
    } catch (err) {
      alert('Failed to update profile image');
      console.error(err);
    }
  };

  const handleCoverImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('coverImg', file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:8000/users/update-cover-image',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setUser(response.data);
      setImgKey(Date.now());
    } catch (err) {
      alert('Failed to update cover image');
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  const profileImageSrc = user.profileImg
    ? `http://localhost:8000${user.profileImg}`
    : 'http://localhost:8000/defaults/default-profile.png';

  const coverImageSrc = user.coverImg
    ? `http://localhost:8000${user.coverImg}`
    : 'http://localhost:8000/defaults/default-cover.png';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="space-x-4 flex items-center">
          <SettingsMenu />
          <LogoutButton onClick={handleLogout} />
        </div>
      </nav>

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto mt-6 bg-white rounded-lg shadow relative">
        <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden relative">
          <img
            key={`cover-${imgKey}`}
            src={coverImageSrc}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <label className="absolute top-4 right-4 bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded cursor-pointer hover:bg-opacity-75">
            Change Cover
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="absolute top-[160px] left-6 z-10 group">
          <img
            key={`profile-${imgKey}`}
            src={profileImageSrc}
            alt="Profile"
            className="w-24 h-24 object-cover border-4 border-white rounded-full shadow-md bg-white"
          />
          <label className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 cursor-pointer">
            Edit
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="pt-20 pb-6 px-6">
          <h2 className="text-2xl font-bold">{user.fullName}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Superadmin: Show Users Button */}
      {user.role === 'superadmin' && (
        <div className="max-w-4xl mx-auto mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              setShowUsers(!showUsers);
              setShowAllPosts(false);
            }}
            className="px-6 py-2 border border-green-500 text-green-700 font-semibold rounded-full transition duration-300 hover:bg-green-100 hover:text-green"
          >
            {showUsers ? 'Hide Users' : 'Show Users'}
          </button>
        </div>
      )}

      {/* User: Create & Show Posts Buttons */}
      {user.role === 'user' && (
        <div className="max-w-4xl mx-auto mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setShowPostModal(true)}
           className="px-6 py-2 border border-blue-500 text-blue-500 font-semibold rounded-full transition duration-300 hover:bg-blue-500 hover:text-white"
          >
            Create Post
          </button>
          <button
            onClick={() => {
              setShowAllPosts(!showAllPosts);
              setShowPublicPosts(false);
              setShowUsers(false);
            }}
            className="px-6 py-2 border border-purple-500 text-purple-500 font-semibold rounded-full transition duration-300 hover:bg-purple-500 hover:text-white"
          >
            {showAllPosts ? 'Hide Posts' : 'Show Posts'}
          </button>
          <button
            onClick={() => {
              setShowPublicPosts(!showPublicPosts);
              setShowAllPosts(false);  // to hide other sections when this one is shown
              setShowUsers(false);
            }}
             className="px-6 py-2 border border-indigo-500 text-indigo-500 font-semibold rounded-full transition duration-300 hover:bg-indigo-500 hover:text-white"

          >
            {showPublicPosts ? 'Hide Public Posts' : 'Public Posts'}
          </button>

        </div>
      )}

      {/* Conditional Sections */}
      {showPostModal && (
        <AddPost handleClose={() => setShowPostModal(false)} />
      )}
      {showAllPosts && <ShowPosts />}
      {showUsers && <ShowAllUsers />}
      {showPublicPosts && <PublicPage />}

    </div>
  );
};

export default Dashboard;
