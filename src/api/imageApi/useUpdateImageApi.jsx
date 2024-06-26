import { useMutation } from "react-query";
import axios from "axios";

const updateImageById = async ({ id, filename, url, mimeType }) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/v5/images/${id}`, { filename, url, mimeType });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Error updating image");
  }
};

export const useUpdateImageApi = () => {
  return useMutation(updateImageById);
};
