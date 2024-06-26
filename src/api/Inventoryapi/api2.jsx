import axios from 'axios';
import { useMutation, useQueryClient,useQuery } from 'react-query';

const API_URL = 'http://localhost:5000/api/v7/items';

export const checkInItem = async ({ id, quantity }) => {
  const response = await axios.post(`${API_URL}/${id}/check-in`, { quantity });
  return response.data;
};

export const checkOutItem = async ({ id, quantity }) => {
  const response = await axios.post(`${API_URL}/${id}/check-out`, { quantity });
  return response.data;
};

export const useCheckInItem = () => {
  const queryClient = useQueryClient();
  return useMutation(checkInItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('items');
    },
  });
};

export const useCheckOutItem = () => {
  const queryClient = useQueryClient();
  return useMutation(checkOutItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('items');
    },
  });
};

export const fetchReport = async () => {
    const response = await axios.get(`http://localhost:5000/api/v7/generate-report`);
    return response.data;
  };
  
  export const useReport = () => {
    return useQuery('report', fetchReport);
  };