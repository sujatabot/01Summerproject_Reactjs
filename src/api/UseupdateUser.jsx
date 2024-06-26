import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const edit = async ({userId,email,username}) => {
    try {
        const response = await axios.put(
            `http://localhost:5000/api/v1/admin/users/${userId}`,{email,username}, 
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}`},
            }
        );
        return response.data;
    } catch (error) {
        console.error("Something went wrong", error);
        throw new Error(error?.response?.data || "Something is wrong");
    }
};
export const UseupdateUser = () => {
    const queryclient = useQueryClient();
    return useMutation(edit,{
      
        onSuccess: (data) => {
            console.log(`${data.message}`);
             queryclient.invalidateQueries("allusers")
        },
        onError: (error) => {
            console.error("Something went wrong", error);
        },
    });
};