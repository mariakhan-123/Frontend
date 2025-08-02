// src/pages/PublicPage.jsx
import React from 'react';
import ShowPosts from '../components/dashboardComponents/showPosts';

const PublicPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-center mt-6 mb-4 text-blue-700">All Public Posts</h1>
      <ShowPosts publicView={true} />
    </div>
  );
};

export default PublicPage;
