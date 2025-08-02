// src/components/dashboardComponents/DashboardMenu.jsx
import React from 'react';

const DashboardMenu = ({
  role,
  setShowUsers,
  setShowAddPost,
  setShowAllPosts,
}) => {
  return (
    <div className="flex flex-col text-sm text-gray-800">
      {role === 'user' || role === 'admin' ? (
        <>
          <button
            onClick={() => {
              setShowAddPost(true);
            }}
            className="px-4 py-2 hover:bg-gray-100 text-left"
          >
            Add Post
          </button>
          <button
            onClick={() => {
              setShowAllPosts(true);
            }}
            className="px-4 py-2 hover:bg-gray-100 text-left"
          >
            Show Posts
          </button>
        </>
      ) : null}

      {role === 'admin' && (
        <button
          onClick={() => {
            setShowUsers(true);
          }}
          className="px-4 py-2 hover:bg-gray-100 text-left"
        >
          Show All Users
        </button>
      )}
    </div>
  );
};

export default DashboardMenu;
