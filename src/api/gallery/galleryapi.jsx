import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const API_URL = 'http://localhost:5000/api/v2/admin/photos';

export const useGetAllPhotos = () => {
  return useQuery('photos', async () => {
    const { data } = await axios.get(API_URL);
    return data;
  });
};

export const useCreatePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation(async (formData) => {
    const { data } = await axios.post(API_URL, formData);
    return data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('photos');
    },
    onError: (error) => {
      console.error('Error creating photo:', error);
    },
  });
};



export const useDeletePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation(async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('photos');
    },
    onError: (error) => {
      console.error('Error deleting photo:', error);
    },
  });
};
