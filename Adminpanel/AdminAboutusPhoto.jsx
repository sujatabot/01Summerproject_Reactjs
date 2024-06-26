import React, { useState } from 'react';
import { useCreateAboutusPhoto, useDeleteAboutusPhoto, useGetAboutusPhotos } from '../src/api/aboutusphotoapi/AboutusPhotoApi';

const Admincreatephotoaboutus = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const { mutate: createPhoto, isLoading: isCreating, isError: isCreateError, error: createError } = useCreateAboutusPhoto();
  const { data: photos, isLoading: isPhotosLoading, isError: isPhotosError, error: photosError } = useGetAboutusPhotos();
  const { mutate: deletePhoto } = useDeleteAboutusPhoto();

  const handleDelete = async (id) => {
    try {
      await deletePhoto(id);
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    try {
      await createPhoto(formData);
    } catch (error) {
      console.error('Error creating photo:', error);
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
      <h1 className="mb-4 text-3xl font-bold text-center">Create Photo</h1>
      {isCreateError && <div className="mb-4 text-red-500">Error: {createError.message}</div>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
        />
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])} 
          className="mb-4"
        />
        <button 
  type="submit" 
  disabled={isCreating} 
  className={`px-3 py-1 font-semibold text-indigo-600 transition-colors duration-300 bg-transparent border border-indigo-600 rounded-md shadow-md hover:text-indigo-900 hover:bg-indigo-50 hover:border-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${isCreating ? 'opacity-50 cursor-not-allowed' : ''}`}
>
  {isCreating ? 'Creating...' : 'Create'}
</button>

      </form>

      <div className="p-4 mx-auto">
        <div className="w-full max-w-screen-md mx-auto">
          <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Top Photos</h1>
          {isPhotosLoading && <div>Loading photos...</div>}
          {isPhotosError && <div>Error: {photosError.message}</div>}
          {!isPhotosLoading && !isPhotosError && photos && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Admincreatephotoaboutus;
