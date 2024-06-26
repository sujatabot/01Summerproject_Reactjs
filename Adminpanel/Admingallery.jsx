import React, { useState } from 'react';
import { useGetAllPhotos, useCreatePhoto, useDeletePhoto } from '../src/api/gallery/galleryapi';

const Admingallery = () => {
  const { data: photos, isLoading, isError } = useGetAllPhotos();
  const createPhotoMutation = useCreatePhoto();
  const deletePhotoMutation = useDeletePhoto();

  const [createForm, setCreateForm] = useState({
    filename: '',
    mimeType: '',
    file: null,
  });

  const handleCreatePhoto = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', createForm.file);
      formData.append('filename', createForm.filename);
      formData.append('mimeType', createForm.mimeType);

      await createPhotoMutation.mutateAsync(formData);
      setCreateForm({ filename: '', mimeType: '', file: null });
    } catch (error) {
      console.error('Error creating photo:', error);
    }
  };

  const handleDeletePhoto = async (id) => {
    try {
      await deletePhotoMutation.mutateAsync(id);
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching photos!</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="mb-6 text-4xl font-extrabold text-center text-red-700">Admin Gallery</h1>

      {/* Create Photo Form */}
      <form onSubmit={handleCreatePhoto} className="p-6 mb-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Create New Photo</h2>
        <div className="mb-4">
          <input
            type="file"
            onChange={(e) => setCreateForm({ ...createForm, file: e.target.files[0] })}
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-300"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={createForm.filename}
            onChange={(e) => setCreateForm({ ...createForm, filename: e.target.value })}
            placeholder="Filename"
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-300"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={createForm.mimeType}
            onChange={(e) => setCreateForm({ ...createForm, mimeType: e.target.value })}
            placeholder="MIME Type"
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-300"
          />
        </div>
        <button type="submit" className="px-3 py-1 text-indigo-600 transition-colors duration-300 bg-transparent border border-indigo-600 rounded-md hover:text-indigo-900 hover:bg-indigo-50 hover:border-indigo-900 focus:outline-none focus:ring focus:ring-indigo-300">Create Photo</button>
      </form>

      {/* Display Photos */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="text-white bg-red-900">
            <tr>
              <th className="px-4 py-2 border-r">ID</th>
              <th className="px-4 py-2 border-r">Filename</th>
              <th className="px-4 py-2 border-r">MIME Type</th>
              <th className="px-4 py-2 border-r">Photo</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {photos.map((photo) => (
              <tr key={photo.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-r">{photo.id}</td>
                <td className="px-4 py-2 border-r">{photo.filename}</td>
                <td className="px-4 py-2 border-r">{photo.mimeType}</td>
                <td className="px-4 py-2 border-r">
                  <img src={`http://localhost:5000${photo.url}`} alt={photo.filename} className="object-cover w-8 h-8" />
                </td>
                <td className="px-4 py-2 border-b border-r">
                  <button
                    className="px-3 py-1 text-red-600 transition-colors duration-300 bg-transparent border border-red-600 rounded-md hover:text-red-900 hover:bg-red-50 hover:border-red-900"
                    onClick={() => handleDeletePhoto(photo.id)}
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
  );
};

export default Admingallery;
