
import { useQuery } from "react-query"; 
import axios from "axios";

const fetchUsers = async () => {
  try {
    const response = await axios({
      url: "http://localhost:5000/api/v1/admin/users",
      method: "GET",
    });
    console.log("response",response?.data);
    return response?.data;
  } catch (error) {
    console.error("Something went wrong", error);
    throw new Error("Failed to fetch users");
  }
};

const useUserDetail = () => {
  return useQuery("allusers", fetchUsers); 
};
export  {useUserDetail};