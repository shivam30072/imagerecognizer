import axios from "axios"
import { useState } from "react";


const App = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const handleUpload = async (e) => {
    const formData = new FormData()

    // 'uploaded-file'- this is important, don't change the string it has to be same as present in multer in backend
    formData.append('uploaded-file', e.target.files[0])

    try {
      const response = await axios.post('/api/image', formData);
      setUploadedFile(response.data.imageUrl);
      setPredictions(response.data.predictions);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }


  return (
    <div className='min-h-[100vh] flex flex-col items-center justify-center bg-[#1b2329] text-white'>
      <h1 className="text-3xl font-bold text-center mb-4">Image Classification</h1>
      <div className="text-center">
        {uploadedFile ? (
          <img className="w-100 h-72 mx-auto mb-4" src={uploadedFile} alt={uploadedFile.name} />
        ) : null}
        <input
          className="bg-[#1b2329] file-input file-input-bordered file-input-primary w-full max-w-xs mb-4"
          onChange={handleUpload}
          type='file'
          accept="image/*"
        />
        <hr className="w-full border-gray-300 mt-6 mb-2"></hr>
{predictions.map((p) => (
  <>
  <h3>{p.className}</h3>
  <h3>{p.probability * 1000}</h3>
  </>
))}
        <div className="flex items-center justify-center mb-4">
          <p className="mr-2">Support this project by giving</p>
          <div className="badge badge-error flex items-center gap-2">
            <a href="https://github.com/shivam30072/imagerecognizer" className="text-white font-bold">
              ⭐ on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App