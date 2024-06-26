import { useMutation } from "react-query";
import axios from "axios";

const getImageById = async (id) => {  
  try {
    const response = await axios.get(`http://localhost:5000/api/v5/images/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Error fetching image");
  }
};

export const useGetImageByIdApi = () => {
  return useMutation(getImageById);
};
