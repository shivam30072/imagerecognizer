import axios from "axios"
import { useState } from "react";

const App = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
const handleUpload = async (e) => {
   const formData = new FormData()
   
   // 'uploaded-file'- this is important, don't change the string it has to be same as present in multer in backend
   formData.append('uploaded-file', e.target.files[0])

   try {
    const response = await axios.post('/api/image', formData);
    setUploadedFile(response.data.imageUrl);
   } catch (error) {
    console.error('Error uploading file:', error);
   }
}

  
  return (
    <div className='min-h-[100vh] '>
           <input onChange={handleUpload} type='file' accept="image/*" className="bg-[#1da1f2] text-white ..." />

         {uploadedFile &&

              <img src={uploadedFile} alt={uploadedFile}/>
         }
    </div>
   
  )
}

export default App