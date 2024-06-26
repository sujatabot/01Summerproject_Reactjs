import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const updatecontactform = async ({ContactId , name, email, phonenum, subject, message}) => {
    try {
        const response = await axios.put(
            `http:localhost:5000/api/v3/admin/contactus/${ContactId}`,{name, email, phonenum, subject, message}, 
      
        );
        return response.data;
    } catch (error) {
        console.error("Something went wrong", error);
        throw new Error(error?.response?.data || "Something is wrong");
    }
};
export const useUpdateContactFormApi = () => {
    const queryclient = useQueryClient();
    return useMutation(updatecontactform,{
       
        onSuccess: (data) => {
            console.log(`${data.message}`);
            queryclient.invalidateQueries("allcontacts")
        },
        onError: (error) => {
            console.error("Something went wrong", error);
        },
    });
};