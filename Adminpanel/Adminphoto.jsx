import {useGetPhotoapi} from "../src/api/useGetPhotoapi";

export const AdminPhoto = () => {
    const { data: photos, isLoading, isError } = useGetPhotoapi();




    return (
        <>
        {isLoading && <div>Loading data...</div>}
    {isError && <div>Error occurred while fetching data.</div>}
        </>
    )
}