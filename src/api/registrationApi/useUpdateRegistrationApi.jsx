import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const updateregistrationform = async ({RegisterId , name, email, phonenumber, currentaddress, age,gender,medicalcondition,query}) => {
    try {
        const response = await axios.put(
            `http:localhost:5000/api/v3/admin/contactus/${RegisterId}`,{name, email, phonenumber, currentaddress, age,gender,medicalcondition,query}, 
      
        );
        return response.data;
    } catch (error) {
        console.error("Something went wrong", error);
        throw new Error(error?.response?.data || "Something is wrong");
    }
};
export const useUpdateRegistrationApi = () => {
    const queryclient = useQueryClient();
    return useMutation(updateregistrationform,{
       
        onSuccess: (data) => {
            console.log(`${data.message}`);
            queryclient.invalidateQueries("allregisters")
        },
        onError: (error) => {
            console.error("Something went wrong", error);
        },
    });
};