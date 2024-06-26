import { useState } from "react";
import { useCreateTextss, useDeleteTexts1, useGetAllTexts1 } from "../src/api/text1api/text1api";

import { useQueryClient } from "react-query";

const AdminOrgtext = () => {
  const { data: words, isError, isLoading } = useGetAllTexts1();
  const {mutate:createText1}  = useCreateTextss();
  const {mutate:deletetext} = useDeleteTexts1();
  const queryClient = useQueryClient();
  

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    content: "",
  });
 
   const handledelete =(textId)=>{
       deletetext(textId)
       queryClient.invalidateQueries()
   }
  const Textcreate = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlecreatetext = (e) => {
    e.preventDefault();
 

    createText1(formData)
    queryClient.invalidateQueries("texts",words);
  
        setFormData({ id: "", title: "", content: "" });

      

  
  };

  if (isError) {
    return <div>Error loading texts</div>;
  }
  if (isLoading) {
    return <div>Text is Fetching.....</div>;
  }

  return (
    <div>
      <table className="w-full border border-black rounded-md">
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <tr key={word.id}>
              <td className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
                <h3 className="mb-2 text-lg font-bold text-gray-900">{word.title}</h3>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{word.content}</h3>
                <div >
                  <button  className="bg-red-600" onClick={()=>handledelete(word.id)}>delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handlecreatetext}>
        <label htmlFor="title" className="text-black">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={Textcreate}
          name="title"
          required
        />
        <label htmlFor="content" className="text-black">
          Content
        </label>
        <input
          type="text"
          value={formData.content}
          onChange={Textcreate}
          name="content"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminOrgtext;

         
         
         
         
         
         
         
         
         
         
         
         
         
         
