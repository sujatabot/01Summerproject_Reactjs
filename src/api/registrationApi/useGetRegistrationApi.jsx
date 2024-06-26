import axios from "axios";
import { useQuery } from "react-query";

const registrationForm = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/v4/admin/register");
    return response.data;
  } catch (error) {
    console.error("Error fetching registration forms:", error);
    throw new Error("Failed to fetch registration forms. Please try again.");
  }
};

export const useGetRegistrationApi = () => {
  return useQuery("contactForms", registrationForm, {
    onError: (error) => {
      console.error(`Some error occurred: ${error.message}`);
    },
  });
};