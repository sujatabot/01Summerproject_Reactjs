import React, { useState } from 'react';
import { useUserDetail } from "../src/api/useUserDetail";
import { UserDelete } from "../src/api/UserDelete";
import { useQueryClient } from "react-query";
import { UseupdateUser } from "../src/api/UseupdateUser";

const Admin = () => {
  const { data: users, isLoading, isError } = useUserDetail();
  const queryClient = useQueryClient();
  const { mutate: handleDelete } = UserDelete();
  const { mutate: updateUser } = UseupdateUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');

  const openModal = (user) => {
    setCurrentUser(user);
    setUpdatedUsername(user.username);
    setUpdatedEmail(user.email);
    setIsModalOpen(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      if (!updatedUsername || !updatedEmail) return;
      updateUser({
        userId: currentUser.id,
        username: updatedUsername,
        email: updatedEmail,
      });
      queryClient.invalidateQueries('users');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
    setUpdatedUsername('');
    setUpdatedEmail('');
  };

  return (
    <div className="flex items-start justify-center min-h-screen p-8 bg-gray-100">
      <div className="container max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-4xl font-extrabold text-center text-gray-800">Admins</h1>

        {isLoading && <div className="text-center text-gray-600">Loading users...</div>}
        {isError && <div className="text-center text-red-600">Error fetching users.</div>}
        {users && users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="text-gray-700 bg-gray-100">
                  <th className="px-6 py-3 text-sm font-medium text-left border border-gray-300">Username</th>
                  <th className="px-6 py-3 text-sm font-medium text-left border border-gray-300">Email</th>
                  <th className="px-6 py-3 text-sm font-medium text-left border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border border-gray-300">{user.username}</td>
                    <td className="px-6 py-4 border border-gray-300">{user.email}</td>
                    <td className="px-6 py-4 border border-gray-300">
                      <button
                        className="px-4 py-2 mr-2 text-sm font-semibold text-black text-blue-500 transition-transform duration-200 transform rounded shadow-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105"
                        onClick={() => openModal(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-2 text-sm font-semibold text-black text-red-600 transition-transform duration-200 transform rounded shadow-md bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 hover:scale-105"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 text-center text-gray-500">No users found.</div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Edit User</h3>
            </div>
            <form onSubmit={handleEdit} className="px-4 py-3">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 mt-1 border rounded-md"
                  value={updatedUsername}
                  onChange={(e) => setUpdatedUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 mt-1 border rounded-md"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                />
              </div>
              <div className="px-4 py-3 border-t border-gray-200">
                <button
                  type="submit"
                  className="px-4 py-2 mr-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
