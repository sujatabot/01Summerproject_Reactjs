import { useMutation, use, useQueryClient } from "react-query";
import axios from "axios";

const deleteImage = async (id) => {
    try {
        const response = await axios.delete('http://localhost:5000/ap1/v5/admin/images/${id}');
        return response.data;
    } catch(error) {
        throw new Error(error?.response?.data?.message || "Error deleting image");
    }
};

export const useDeleteImageApi = () => {
    const queryClient = useQueryClient();
   return useMutation(deleteImage, {
    onSuccess: () => {
        console.log("Image deleted successfully");
        queryClient.invalidateQueries("images");
    },
    onError: () => {
        console.error("Error deleting image");
    },
   });
};