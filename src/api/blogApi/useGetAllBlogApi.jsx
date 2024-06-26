import axios from "axios";
import { useQuery } from "react-query";

const blog = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/v6/admin/blog");
    return response.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw new Error("Failed to fetch blog. Please try again.");
  }
};

export const useGetAllBlogApi = () => {
  return useQuery("blogs", blog, {
    onError: (error) => {
      console.error(`Some error occurred: ${error.message}`);
    },
  });
};