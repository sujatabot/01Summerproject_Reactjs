import axios from 'axios';
import { useQuery } from 'react-query';

// Define the data fetching function
const useGetImageApi = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/v5/admin/images');
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch images');
    }
}

// Create a custom hook using useQuery
const useGetImages = () => {
    return useQuery('allimages', useGetImageApi);
}

export { useGetImages };