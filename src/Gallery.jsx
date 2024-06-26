import React, { useState } from 'react';
import { useGetAllPhotos } from './api/gallery/galleryapi';

import Header from './component/Header';

const Gallery = () => {
  const { data: photos, isLoading, isError } = useGetAllPhotos();


  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const openModal = (index) => {
    setSelectedPhotoIndex(index);
  };

  const closeModal = () => {
    setSelectedPhotoIndex(null);
  };

  const goToPrevious = () => {
    setSelectedPhotoIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setSelectedPhotoIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-lg text-gray-600">Loading...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center h-screen text-lg text-red-600">Error fetching photos!</div>;
  }

  return (
    <>
      <Header />
      <div className='flex'>
    <img src="/photos/coverpage.jpg" className='w-full pl-10 pr-10 h-80' alt="Cover" />
  </div>
  <h1 className="pt-3 pb-3 text-3xl font-bold text-center text-red-600"> Our Gallery </h1>
      <div className="min-h-screen p-6 bg-gradient-to-r from-blue-100 to-blue-50">
 
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo, index) => (
            <div key={photo.id} className="overflow-hidden transition-shadow duration-200 transform rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1">
              <img
                className="object-cover w-full h-48 transition-transform duration-200 transform cursor-pointer sm:h-56 md:h-64 lg:h-72 hover:scale-105"
                src={`http://localhost:5000${photo.url}`}
                alt={photo.filename}
                onClick={() => openModal(index)}
              />
            </div>
          ))}
        </div>

        {selectedPhotoIndex !== null && (
          <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-80">
            <div className="relative w-full h-full max-w-screen-lg p-4">
              <img
                src={`http://localhost:5000${photos[selectedPhotoIndex].url}`}
                alt={photos[selectedPhotoIndex].filename}
                className="max-w-full max-h-full mx-auto rounded-lg shadow-lg"
              />
              <button
                className="absolute p-2 text-gray-800 transform -translate-y-1/2 bg-white rounded-full top-1/2 -left-10 hover:bg-gray-200"
                onClick={goToPrevious}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                className="absolute p-2 text-gray-800 transform -translate-y-1/2 bg-white rounded-full top-1/2 -right-10 hover:bg-gray-200"
                onClick={goToNext}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button
                className="absolute top-0 right-0 p-2 m-4 text-gray-800 bg-white rounded-full hover:bg-gray-200"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;


