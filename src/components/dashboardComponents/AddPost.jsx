import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const AddPost = ({ handleClose }) => {
  const [description, setDescription] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [user, setUser] = useState(null);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem('token');

  let userId = '';
  try {
    userId = JSON.parse(atob(token.split('.')[1])).id;
  } catch {
    console.error('Invalid token');
  }

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      const type = file.type;
      if (type.startsWith('image')) setMediaType('image');
      else if (type.startsWith('video')) setMediaType('video');
      else setMediaType('article');
    }
  };

  const handleCancel = () => {
    if (typeof handleClose === 'function') {
      handleClose();
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('createdBy', userId);

    if (mediaFile) {
      formData.append('media', mediaFile);
      formData.append('mediaType', mediaType || 'unknown');
    }

    const postId = uuidv4();
    formData.append('postLink', `http://localhost:3000/posts/${postId}`);

    try {
      await axios.post('http://localhost:8000/posts/create-post', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Post created successfully!');
      handleCancel();
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={handleCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-4">Create a Post</h2>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What do you want to talk about?"
          className="w-full h-28 border rounded p-3 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* File Upload */}
        <label className="block mb-2 font-medium text-gray-700">Upload Image, Video or Article</label>
        <input
          type="file"
          className="mb-4"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCancel}
            className="bg-gray-200 text-gray-800 px-5 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!description && !mediaFile}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
