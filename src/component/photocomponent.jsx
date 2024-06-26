import  { useState } from 'react';
import { useGetAboutusPhotos } from '../api/aboutusphotoapi/AboutusPhotoApi';

 export const Photocomponent = () =>{

    const { data:photos, isError: imageError, isLoading: imageLoading } = useGetAboutusPhotos();
    console.log("photo",photos)

  if (isLoading || imageLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (isError || imageError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error: {error ? error.message : 'Failed to fetch data'}
        <br />
        Image Error: {imageError ? imageError.message : 'Failed to fetch image'}
      </div>
    );
  }
  const photo = photos[0];
    return(
     
    );
};