import React from 'react';

const ImageDisplay = ({ imageUrl, alt }) => {
  return (
    <img src={imageUrl} alt={alt} className="w-full h-auto" />
  );
};

export default ImageDisplay;
