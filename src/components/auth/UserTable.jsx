import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserTable = () => {
  const [allUsers, setAllUsers] = useState([]);

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

      // Update local state after toggle
      setAllUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isActive: res.data.isActive } : user
        )
      );
    } catch (err) {
      console.error('Failed to toggle user status:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 bg-white p-6 rounded shadow">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
