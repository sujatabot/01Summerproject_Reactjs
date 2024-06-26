import axios from "axios";
import { useQuery } from "react-query";

const contactForm = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/v3/admin/contactus");
    return response.data;
  } catch (error) {
    console.error("Error fetching contact forms:", error);
    throw new Error("Failed to fetch contact forms. Please try again.");
  }
};

export const useGetContactFormApi = () => {
  return useQuery("contactForms", contactForm, {
    onError: (error) => {
      console.error(`Some error occurred: ${error.message}`);
    },
  });
};
