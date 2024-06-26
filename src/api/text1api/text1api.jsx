import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const fetchTexts1 = async () => {
  const response = await axios.get('http://localhost:5000/api/v11/admin/text');
  return response.data;
};

const createText1 = async (newText) => {
  const response = await axios.post('http://localhost:5000/api/v11/admin/text', newText);
  return response.data;
};

const updateText1 = async ({ textId,newText }) => {
  const response = await axios.put(`http://localhost:5000/api/v11/admin/text/${textId}`,newText );
  return response.data;
};

const deleteText1 = async (textId) => {
  const response = await axios.delete(`http://localhost:5000/api/v11/admin/text/${textId}`);
  return response.data;
};

export const useGetAllTexts1 = () => {
  return useQuery('texts', fetchTexts1, {
    onError: (error) => {
      console.error('Error fetching texts:', error);
    },
  });
};

 const useCreateTextss = () => {
  const queryClient = useQueryClient();
  return useMutation(createText1, {
    onSuccess: () => {
      queryClient.invalidateQueries('texts');
    },
    onError: (error) => {
      console.error('Error creating text:', error);
    },
  });
};
export{useCreateTextss}
export const useUpdateTexts1 = () => {
  const queryClient = useQueryClient();
  return useMutation(updateText1, {
    onSuccess: () => {
      queryClient.invalidateQueries('texts');
    },
    onError: (error) => {
      console.error('Error updating text:', error);
    },
  });
};

export const useDeleteTexts1 = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteText1, {
    onSuccess: () => {
      queryClient.invalidateQueries('texts');
    },
    onError: (error) => {
      console.error('Error deleting text:', error);
    },
  });
};
