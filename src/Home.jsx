import  { useState } from 'react';
import { useGetAllTexts } from './api/textapi/textapi';
import { useGetHomePhotos } from './api/homephotoapi/Homepageapi';
import Header from './component/Header';




const Home = () => {
  const { data: texts, isError, isLoading, error } = useGetAllTexts();
  const { data:photos, isError: imageError, isLoading: imageLoading } = useGetHomePhotos();
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

  return (
    <div>
      <div>
    <Header/>
    </div>


    <div className="flex flex-col items-center">
      <img src={`http://localhost:5000${photo.url}`} alt="Homepage" className="object-cover w-full h-auto" />
      <div className="px-4 mt-8 text-center md:px-8 lg:px-16">
        {texts.map((text) => (
          <div key={text.id} className="p-6 my-4 bg-white rounded-lg shadow-lg">
            <h3 className="mb-2 text-2xl font-bold text-gray-900">{text.title}</h3>
            <ContentWithReadMore content={text.content} />
          </div>
        ))}
      </div>
    </div>
</div>
  );
};

const ContentWithReadMore = ({ content }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div>
     
    <div>
     
      <p className="text-gray-700">
        {showFullContent ? content : `${content.split('\n\n')[0]}... `}
        <span className="text-blue-500 cursor-pointer" onClick={toggleContent}>
          {showFullContent ? 'Read Less' : 'Read More'}
        </span>
      </p>
  
    </div>
    </div>
   
  );
};

export default Home;
