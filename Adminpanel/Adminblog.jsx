import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useDeleteBlogApi } from '../src/api/blogApi/useDeleteBlogApi';
import { useCreateBlogApi } from '../src/api/blogApi/useCreateBlogApi';
import { useGetAllBlogApi } from '../src/api/blogApi/useGetAllBlogApi';

const AdminBlog = () => {
  const queryClient = useQueryClient();
  const { data: blogs, isError, isLoading } = useGetAllBlogApi();
  const { mutate: deleteBlog } = useDeleteBlogApi();
  const { mutate: createBlog } = useCreateBlogApi();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, file } = formData;

    await createBlog({ title, content, file });

    queryClient.invalidateQueries('blogs');
    setFormData({ title: '', content: '', file: null });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching blogs!</div>;
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold text-center">All Blogs</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog.id} className="overflow-hidden border border-gray-300 rounded-lg">
            <div className="p-4">
              <h3 className="mb-2 text-sm font-bold text-gray-900">{blog.title}</h3>
              <p className="mb-4 text-xs text-gray-600">{blog.content.substring(0, 50)}...</p>
              {blog.imageUrl && (
                <a href={`http://localhost:5000${blog.imageUrl}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500">
                  View Blog Image
                </a>
              )}
            </div>
            <div className="flex justify-end p-4 bg-gray-100">
              <button
                onClick={() => deleteBlog(blog.id)}
                className="px-3 py-1 text-red-600 transition-colors duration-300 bg-transparent border border-red-600 rounded-md hover:text-red-900 hover:bg-red-50 hover:border-red-900"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 mt-8 bg-gray-100 rounded-lg shadow-md">
        <h2 className="mb-4 text-lg font-bold">Create New Blog</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 text-sm font-bold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2 text-sm font-bold">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="file" className="block mb-2 text-sm font-bold">Image (Optional)</label>
          <input
            type="file"
            id="file-input"
            name="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button 
          type="submit" 
          className="px-3 py-1 text-indigo-600 transition-colors duration-300 bg-transparent border border-indigo-600 rounded-md hover:text-indigo-900 hover:bg-indigo-50 hover:border-indigo-900"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default AdminBlog;
