import React, { useState } from 'react';
import { useGetAllTexts, useCreateText, useUpdateText, useDeleteText } from '../../src/api/textapi/textapi';

const Admintext = () => {
  const { data: texts, isError, isLoading } = useGetAllTexts();
  const createText = useCreateText();
  const updateTextMutation = useUpdateText();
  const deleteText = useDeleteText();

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    content: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateText = (e) => {
    e.preventDefault();
    createText.mutate(formData);
    setFormData({ id: '', title: '', content: '' });
  };

  const handleEdit = (text) => {
    setFormData({ id: text.id, title: text.title, content: text.content });
  };

  const handleUpdateText = (e) => {
    e.preventDefault();
    updateTextMutation.mutate({textId:formData.id,newText:{title:formData.title,content:formData.content}});
    setFormData({ id: '', title: '', content: '' });
  };

  const handleDelete = (textId) => {
    deleteText.mutate(textId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching texts!</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="mb-6 text-3xl font-extrabold text-center text-gray-900">Home Page - Texts</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {texts.map((text) => (
          <div key={text.id} className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
            <h3 className="mb-2 text-lg font-bold text-gray-900">{text.title}</h3>
            <p className="mb-4 text-sm text-gray-800">{text.content}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(text)}
                className="px-4 py-2 text-sm font-semibold text-black text-blue-600 bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(text.id)}
                className="px-4 py-2 text-sm font-semibold text-black text-red-600 bg-red-500 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={formData.id ? handleUpdateText : handleCreateText} className="p-6 mt-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-gray-900">{formData.id ? 'Edit Text' : 'Create New Text'}</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 text-sm font-bold text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2 text-sm font-bold text-gray-700">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <button 
  type="submit" 
  className="px-3 py-1 font-semibold text-indigo-600 transition-colors duration-300 bg-transparent border border-indigo-600 rounded-md shadow-md hover:text-indigo-900 hover:bg-indigo-50 hover:border-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
>
  {formData.id ? 'Update Text' : 'Create Text'}
</button>

      </form>
    </div>
  );
};

export default Admintext;
