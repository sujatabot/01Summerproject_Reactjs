import axios from "axios";

import { useMutation } from "react-query";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const login = async (data) => {
  console.log("Logging in:", data);
  try {
    const response = await axios.post("http://localhost:5000/api/v1/login", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (response?.data?.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.isAdmin?"isAdmin":"user");
    }

    console.log("Login successful:", response.data.isAdmin);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login failed. Please try again."); // Throw an error for React Query to handle
  }
};

export const useUserLogin = () => {
  return useMutation(login, {
    onSuccess: () => {
      toast.success("Welcome to the dashboard");
    },
    onError: (error) => {
      toast.error(`Give your correct credential: ${error.message}`);
    },
  });
};
