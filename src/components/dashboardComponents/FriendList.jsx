import React from 'react';

const FriendList = () => {
  const friends = ['Ali', 'Fatima', 'John', 'Sara'];

  return (
    <div className="mt-6 p-4 bg-white shadow rounded-lg max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold mb-2">Friend List</h2>
      <ul className="list-disc pl-6">
        {friends.map((friend, i) => (
          <li key={i}>{friend}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
