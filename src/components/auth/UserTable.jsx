import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const UserTable = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ fullName: '', email: '' });

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8000/users/get-all-users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const handleToggle = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:8000/users/toggle-user/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAllUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isActive: res.data.isActive } : user
        )
      );
    } catch (err) {
      console.error('Failed to toggle user status:', err);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditFormData({ fullName: user.fullName, email: user.email });
  };

  const handleDelete = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:8000/users/${userId}/delete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        alert("User deleted successfully!");
        fetchAllUsers();
      } else {
        alert(data.message || "Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8000/users/edit/${editingUser._id}`,
        editFormData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("User updated successfully!");
      setEditingUser(null);
      fetchAllUsers();
    } catch (err) {
      alert("Failed to update user.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 bg-white p-6 rounded shadow relative">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3 border">Full Name</th>
              <th className="text-left p-3 border">Email</th>
              <th className="text-left p-3 border">Status</th>
              <th className="text-left p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((u) => (
              <tr key={u._id} className="border-t hover:bg-gray-50">
                <td className="p-3 border">{u.fullName}</td>
                <td className="p-3 border">{u.email}</td>
                <td className="p-3 border">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      u.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {u.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-3 border">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleToggle(u._id)}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        u.isActive
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {u.isActive ? 'Deactivate' : 'Activate'}
                    </button>

                    <button
                      onClick={() => handleEdit(u)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                      title="Edit"
                    >
                      <FaEdit size={14} />
                    </button>

                    <button
                      onClick={() => handleDelete(u._id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                      title="Delete"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Popup for Editing */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <h3 className="text-lg font-semibold mb-3">Edit User</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  value={editFormData.fullName}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, fullName: e.target.value })
                  }
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, email: e.target.value })
                  }
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* Close Button Top Right */}
            <button
              onClick={() => setEditingUser(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
