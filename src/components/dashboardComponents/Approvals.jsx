import React from 'react';

const Approvals = () => {
  const pending = ['Zainab', 'Omar'];

  return (
    <div className="mt-6 p-4 bg-white shadow rounded-lg max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold mb-2">Pending Approvals</h2>
      <ul className="list-disc pl-6">
        {pending.map((user, i) => (
          <li key={i}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default Approvals;
