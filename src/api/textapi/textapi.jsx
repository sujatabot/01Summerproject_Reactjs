import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const fetchTexts = async () => {
  const response = await axios.get('http://localhost:5000/api/v8/admin/text');
  return response.data;
};

const createText = async (newText) => {
  const response = await axios.post('http://localhost:5000/api/v8/admin/text', newText);
  return response.data;
};

const updateText = async ({ textId,newText }) => {
  const response = await axios.put(`http://localhost:5000/api/v8/admin/text/${textId}`,newText );
  return response.data;
};

const deleteText = async (textId) => {
  const response = await axios.delete(`http://localhost:5000/api/v8/admin/text/${textId}`);
  return response.data;
};

export const useGetAllTexts = () => {
  return useQuery('texts', fetchTexts, {
    onError: (error) => {
      console.error('Error fetching texts:', error);
    },
  });
};

export const useCreateText = () => {
  const queryClient = useQueryClient();
  return useMutation(createText, {
    onSuccess: () => {
      queryClient.invalidateQueries('texts');
    },
    onError: (error) => {
      console.error('Error creating text:', error);
    },
  });
};

export const useUpdateText = () => {
  const queryClient = useQueryClient();
  return useMutation(updateText, {
    onSuccess: () => {
      queryClient.invalidateQueries('texts');
    },
    onError: (error) => {
      console.error('Error updating text:', error);
    },
  });
};

export const useDeleteText = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteText, {
    onSuccess: () => {
      queryClient.invalidateQueries('texts');
    },
    onError: (error) => {
      console.error('Error deleting text:', error);
    },
  });
};
