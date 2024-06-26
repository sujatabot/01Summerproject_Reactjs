import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const deleteBlog = async (blogId) => {
    console.log("id", blogId);
    try{
        const response = await axios.delete(`http://localhost:5000/api/v6/admin/blog/${blogId}`);
        console.log("Deleted registration form succsessfully", response.data);
        return response.data;
    } catch (error) {
        console.error(Error.response?.data || "Something went wrong" );
    }
};
export const useDeleteBlogApi = () => {
    const queryClient = useQueryClient();
    return useMutation((BlogId) => deleteBlog(BlogId),{
        onSuccess: (data) => {
            console.log("Blog deleted successfully:", data);
            queryClient.invalidateQueries("allusers");
        },
        onError: (error) => {
            console.error("Error deleting blog:", error);
        },
    });
}