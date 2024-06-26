import axios from "axios";
import { useMutation } from "react-query";

const submitRegistrationForm = async ({name, phonenumber, email, currentaddress, gender, medicalcondition, query,age}) => {
  console.log("Submitting registration form:", name, phonenumber, email, currentaddress, gender, medicalcondition, query,age);
  try {
    const response = await axios.post("http://localhost:5000/api/v4/Submit", {name, phonenumber, email, currentaddress, gender, medicalcondition, query,age});

    console.log("Registration form submitted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Registration form submission failed:", error);
    throw new Error("Regiistration form submission failed. Please try again.");
  }
};

export const SubmitRegistrationFormApi = () => {
  return useMutation(submitRegistrationForm, {
    onSuccess: () => {
      console.log("Registration form submitted successfully");
    },
    onError: (error) => {
      console.error(`Some error occurred: ${error.message}`);
    },
  });
};
