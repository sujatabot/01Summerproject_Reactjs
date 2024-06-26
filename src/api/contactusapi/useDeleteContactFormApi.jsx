import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const deleteContactUs = async (contactId) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/v3/admin/contactus/${contactId}`);
        return response.data;
    } catch (error) {
        console.error(error.response?.data || "Something went wrong");
        throw new Error(error.response?.data || "Something went wrong");
    }
};

export const useDeleteContactFormApi = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteContactUs, {
        onSuccess: (data) => {
            console.log("successfully deleted", data);
            queryClient.invalidateQueries('allcontacts');
        },
        onError: (error) => {
            console.error("Error deleting contact form:", error);
        },
    });
};

