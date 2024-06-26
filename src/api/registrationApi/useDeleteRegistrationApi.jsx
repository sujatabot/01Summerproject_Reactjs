import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const deleteRegistration = async (registerId) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/v4/admin/register/${registerId}`);
        return response.data;
    } catch (error) {
        console.error(error.response?.data || "Something went wrong");
        throw new Error(error.response?.data || "Something went wrong");
    }
};

export const useDeleteRegistrationApi = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteRegistration, {
        onSuccess: (data) => {
            console.log("successfully deleted", data);
            queryClient.invalidateQueries('allregisters');
        },
        onError: (error) => {
            console.error("Error deleting registeration form:", error);
        },
    });
};
