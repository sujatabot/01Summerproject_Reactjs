import axios from "axios";
import { useMutation } from "react-query";

const submitContactForm = async (data) => {
  console.log("Submitting contact form:", data);
  try {
    const response = await axios.post("http://localhost:5000/api/v3/Submit", data);

    console.log("Contact form submitted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Contact form submission failed:", error);
    throw new Error("Contact form submission failed. Please try again.");
  }
};

export const SubmitContactFormApi = () => {
  return useMutation(submitContactForm, {
    onSuccess: () => {
      console.log("Contact form submitted successfully");
    },
    onError: (error) => {
      console.error(`Some error occurred: ${error.message}`);
    },
  });
};
