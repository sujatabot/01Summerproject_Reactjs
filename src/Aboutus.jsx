import React from 'react';
import Header from './component/Header';
import { useGetAllBlogApi } from './api/blogApi/useGetAllBlogApi';

const Aboutus = () => {
  const { data: blogs, isLoading, isError } = useGetAllBlogApi();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error fetching blogs!</div>;
  }

  return (
    <>
      <Header />
      <div className='flex'>
    <img src="/photos/coverpage.jpg" className='w-full pl-10 pr-10 h-80' alt="Cover" />
  </div>
      <div className="p-6 mx-auto">
        <h1 className="pt-20 mb-8 text-5xl font-bold text-center text-red-600">Facilities at Srinavas</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-2xl"
            >
              {blog.imageUrl && (
                <img
                  src={`http://localhost:5000${blog.imageUrl}`}
                  alt="Blog"
                  className="object-cover w-full h-64 mb-4 rounded-lg"
                />
              )}
              <h3 className="mb-2 text-2xl font-bold text-red-600">{blog.title}</h3>
              <p className="text-lg text-gray-700">{blog.content}</p>
              
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Aboutus;
