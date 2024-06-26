import { useMutation } from "react-query";
import axios from "axios";

const Register = async (data) => {
    console.log("I am here", data);
    try {
        const response = await axios.post(
            "http://localhost:5000/api/v1/register", data
        );
        console.log("Registration successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("Registration failed:", error);
        throw error.response?.data?.error || "Registration failed";
    }
};

export const useUserRegister = () => {
    return useMutation(Register, {
        onSuccess: (data)=> {
            console.log("Successfully registered:", data);
        },
        onError: (error) => {
            console.error("registration error:", error);
        },
    });
};