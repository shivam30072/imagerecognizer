import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  

  const handleUpload = async (e) => {
    const formData = new FormData();

    // 'uploaded-file'- this is important, don't change the string it has to be the same as present in multer in the backend
    formData.append("uploaded-file", e.target.files[0]);

    try {
      setLoading(true); // Start loading
      const {data : {imageUrl, predictions}} = await axios.post("/api/image", formData);

      setUploadedFile(imageUrl);
      setPredictions(predictions);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleReset = () => {
  setUploadedFile(null)
  setPredictions([])
  };

 

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center bg-[#1b2329] text-white">
      <h1 className="text-3xl font-bold text-center mb-4">ImageRecogX</h1>
      <div className="text-center">
        {uploadedFile ? (
          <>
            <img
              className="w-100 h-72 mx-auto mb-4"
              src={uploadedFile}
              alt={uploadedFile.name}
            />
<button onClick={handleReset} className="btn btn-circle btn-outline bg-white ">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
</button>
          </>
        ) : null}
        {!uploadedFile && !loading ? (
          <input
            className="bg-[#1b2329] file-input file-input-bordered file-input-primary w-full max-w-xs mb-4"
            onChange={handleUpload}
            type="file"
            accept="image/*"
          />
        ) : null}
        {loading ? (
          <progress className="loader progress progress-primary w-56"></progress>
        ) : (
          <div className="flex flex-wrap gap-2 mt-3">
            {predictions.map((p, index) => (
              <div
                key={index}
                className="bg-gray-800 text-white px-2 py-1 rounded-full"
              >
                {p.className}
              </div>
            ))}
          </div>
        )}
        <hr className="w-full border-gray-300 mt-6 mb-2" />
        <div className="flex items-center justify-center mb-4">
          <p className="mr-2">Support this project by giving</p>
          <div className="badge badge-error flex items-center gap-2">
            <a
              href="https://github.com/shivam30072/imagerecognizer"
              className="text-white font-bold"
            >
              ⭐ on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
