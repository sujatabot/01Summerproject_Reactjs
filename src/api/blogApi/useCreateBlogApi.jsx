import { useMutation } from 'react-query';
import axios from 'axios';

const uploadBlog = async (data) => {
  const formData = new FormData();
  formData.append('title', data.get('title'));
  formData.append('content', data.get('content'));
  
  if (data.get('file')) {
    formData.append('file', data.get('file'));
  }

  try {
    const response = await axios.post('http://localhost:5000/api/v6/admin/blog', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('Response:', response);
    return response.data;
  } catch (err) {
    console.error('Something went wrong', err);
    throw new Error(err.response?.data);
  }
};

export const useCreateBlogApi = () => {
  return useMutation(uploadBlog, {
    onSuccess: (data) => {
      console.log('Blog created successfully', data);
    },
    onError: (error) => {
      console.error('Creating blog Error', error);
    },
  });
};
