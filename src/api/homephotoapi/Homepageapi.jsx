import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v9', // Adjust the base URL as necessary
});

export const useGetHomePhotos = () => {
  return useQuery('homePhotos', async () => {
    const { data } = await api.get('/photos');
    return data;
    // console.log("home photo",data[0])
  });
};

export const useCreateHomePhoto = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (formData) => {
      const { data } = await api.post('/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('homePhotos');
      },
      onError: (error) => {
        console.error('Error creating photo:', error);
      },
    }
  );
};

export const useDeleteHomePhoto = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id) => {
      const { data } = await api.delete(`/photos/${id}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('homePhotos');
      },
      onError: (error) => {
        console.error('Error deleting photo:', error);
      },
    }
  );
};
export const useUpdateHomePhoto = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, title, file }) => {
      const formData = new FormData();
      formData.append('title', title);
      if (file) {
        formData.append('photo', file);
      }

      const { data } = await api.put(`/photos/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('homePhotos');
      },
      onError: (error) => {
        console.error('Error updating photo:', error);
      },
    }
  );
};