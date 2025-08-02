import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  HandThumbUpIcon,
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

const ShowPosts = ({ publicView }) => {
  console.log(publicView)
  const [posts, setPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [menuOpenId, setMenuOpenId] = useState(null);

  const token = localStorage.getItem('token');
  let currentUserId = '';
  try {
    currentUserId = JSON.parse(atob(token.split('.')[1])).id;
  } catch (err) {
    console.error('Invalid token');
  }

  const fetchPosts = async () => {
    try {

      const url = publicView
        ? 'http://localhost:8000/posts/get-public-posts'
        : 'http://localhost:8000/posts/get-post';

      const headers = publicView
        ? { Authorization: `Bearer ${token}` }// No token needed for public view
        : { Authorization: `Bearer ${token}` };

      const res = await axios.get(url, { headers });
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const toggleExpand = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(`http://localhost:8000/posts/delete-post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (err) {
      alert(err.response?.data?.msg || 'Error deleting post');
    }
  };

  const handleEditClick = (post) => {
    setEditingPostId(post._id);
    setEditedDescription(post.description);
    setMenuOpenId(null);
  };

  const handleUpdate = async (postId) => {
    try {
      await axios.put(
        `http://localhost:8000/posts/update-post/${postId}`,
        { description: editedDescription },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingPostId(null);
      fetchPosts();
    } catch (err) {
      alert(err.response?.data?.msg || 'Error updating post');
    }
  };

  const toggleMenu = (postId) => {
    setMenuOpenId(menuOpenId === postId ? null : postId);
  };

  const toggleLike = async (postId) => {
    if (!postId) {
      console.error(' postId is missing!');
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8000/likes/toggle/${postId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
              ...post,
              liked: res.data.liked,
              likeCount: res.data.liked
                ? post.likeCount + 1
                : post.likeCount - 1,
            }
            : post
        )
      );
    } catch (err) {
      console.error('Failed to toggle like:', err);
    }
  };


  return (
    <div className="max-w-2xl mx-auto mt-6 p-4">
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post) => {
            const isExpanded = expandedPosts[post._id];
            const shouldTruncate = post.description?.length > 200;
            const displayText = isExpanded
              ? post.description
              : post.description?.slice(0, 200);
            const isAuthor = post.createdBy?._id === currentUserId;

            return (
              <div
                key={post._id}
                className="bg-white rounded-xl border shadow-sm p-4 relative"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <img
                      src={`http://localhost:8000/${post.createdBy?.profileImage || 'default-profile.png'}`}
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">
                        {post.createdBy?.fullName || 'Anonymous'}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {post.createdBy?.jobTitle || 'Post Author'}
                      </p>
                    </div>
                  </div>

                  {/* 3-dot menu */}
                  {isAuthor && (
                    <div className="relative">
                      <button
                        onClick={() => toggleMenu(post._id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        &#x22EE;
                      </button>
                      {menuOpenId === post._id && (
                        <div className="absolute right-0 mt-2 bg-white border shadow rounded w-28 z-10">
                          <button
                            onClick={() => handleEditClick(post)}
                            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                          >
                            Delete
                          </button>
                          <button

                            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                          >
                            Add Friend
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Description */}
                {editingPostId === post._id ? (
                  <div className="mt-3">
                    <textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="w-full border p-2 rounded"
                      rows={4}
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        onClick={() => setEditingPostId(null)}
                        className="text-gray-600 hover:underline text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleUpdate(post._id)}
                        className="text-blue-600 hover:underline font-semibold text-sm"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ) : (
                  post.description && (
                    <p className="text-sm text-gray-800 mt-3 whitespace-pre-wrap">
                      {displayText}
                      {shouldTruncate && (
                        <span
                          onClick={() => toggleExpand(post._id)}
                          className="text-blue-600 cursor-pointer ml-2 text-xs"
                        >
                          {isExpanded ? 'Show less' : '...Show more'}
                        </span>
                      )}
                    </p>
                  )
                )}

                {/* Media */}
                {post.mediaType === 'image' && post.mediaUrl && (
                  <img
                    src={`http://localhost:8000/${post.mediaUrl}`}
                    alt="Post"
                    className="w-full max-h-[450px] object-cover mt-3 rounded-lg"
                  />
                )}
                {post.mediaType === 'video' && post.mediaUrl && (
                  <video
                    src={`http://localhost:8000/${post.mediaUrl}`}
                    controls
                    className="w-full max-h-[450px] object-contain mt-3 rounded-lg"
                  />
                )}
                {post.mediaType === 'article' && post.mediaUrl && (
                  <div className="mt-3 bg-gray-100 p-3 rounded-md">
                    <a
                      href={`http://localhost:8000/${post.mediaUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm underline"
                    >
                      View Attached Article
                    </a>
                  </div>
                )}

                {/* Action Icons */}
                <div className="mt-4 flex justify-around text-gray-600 text-sm border-t pt-3">
                  <button
                    onClick={() => toggleLike(post._id)}
                    className={`flex items-center gap-1 hover:text-blue-500 ${post.liked ? 'text-blue-600 font-semibold' : ''
                      }`}
                  >
                    <HandThumbUpIcon className="h-5 w-5" />
                    <span>{post.likeCount || 0}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-500">
                    <ChatBubbleOvalLeftIcon className="h-5 w-5" />
                    <span>Comment</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-500">
                    <ArrowPathRoundedSquareIcon className="h-5 w-5" />
                    <span>Repost</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-500">
                    <ShareIcon className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default ShowPosts;
