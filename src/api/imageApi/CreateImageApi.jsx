import { useMutation } from "react-query";
import axios from "axios";

const createImage = async (data) => {
    const formData = new FormData();
    formData.append('filename', data.filename);
    formData.append('url', data.url);
    formData.append('mimeType', data.mimeType);

    try {
        const response = await axios({
            url: "http://localhost:5000/api/v5/admin/images",
            data: formData,
            method: "POST",
            headers: { "Content-Type": "multipart/form-data"},
        });

        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || "Unknown error occurred";
        console.error("Error creating image:", errorMessage);
        throw new Error(errorMessage);
    }
};

export const useCreateImageApi = () => {
    return useMutation(createImage,{
        
        onSuccess: () => {
            console.log('Image created successfully');
        },
        onError: (error) => {
            console.error('Error creating photo:', error);
        },
    });
};