import React from 'react';
import { useGetHomePhotos, useDeleteHomePhoto } from '../src/api/homephotoapi/Homepageapi';

const AdminHome = () => {
  
  const { data: photos, isLoading, isError, error } = useGetHomePhotos();
  const { mutate: deletePhoto } = useDeleteHomePhoto();

  const handleDelete = async (id) => {
    try {
      await deletePhoto(id);
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  if (isLoading) return <div className="mt-8 text-center">Loading...</div>;
  if (isError) return <div className="mt-8 text-center">Error: {error.message}</div>;

  return (
    <div className="p-4 mx-auto">
      <div className="w-full max-w-screen-md mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Home Photos</h1>
        <div className="overflow-x-auto">
          <table className="w-full overflow-hidden text-sm bg-white rounded-lg shadow-md table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-1/4 px-4 py-2 text-gray-800 uppercase border-b border-r border-gray-300">Photo</th>
                <th className="w-1/2 px-4 py-2 text-gray-800 uppercase border-b border-r border-gray-300">Title</th>
                <th className="w-1/4 px-4 py-2 text-gray-800 uppercase border-b border-r border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {photos.map((photo) => (
                <tr key={photo.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">
                    <div className="flex items-center justify-center">
                      <img
                        src={`http://localhost:5000${photo.url}`}
                        alt={photo.title}
                        className="object-cover w-8 h-8 border border-gray-300"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2 text-gray-700 border border-gray-300">{photo.title}</td>
                  <td className="px-4 py-2 border border-gray-300">
                  <button
  onClick={() => handleDelete(photo.id)}
  className="px-3 py-1 text-xs font-semibold text-black text-red-600 transition-colors duration-300 bg-transparent border border-red-600 rounded-md hover:text-red-900 hover:bg-red-50 hover:border-red-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
>
  Delete
</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;




