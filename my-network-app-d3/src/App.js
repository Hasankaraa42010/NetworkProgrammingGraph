import { useState } from "react";
import "./App.css";
import FileUpload from "./FileUpload";
import Inde from "./yeni/Inde";

function App() {
  const [uploadedData, setUploadedData] = useState();
const [file, setFile] = useState("Ana Dosya")
  const handleDataUpdate = (data) => {
    setUploadedData(data);

  };
  const handleFileChange = (data) => {
    setFile(data);

  };

  return (
    <div>
      <FileUpload onDataUpdate={handleDataUpdate} File={handleFileChange}/>
      {file !== 'Ana Dosya' && <Inde File={file} uploadedData={uploadedData} />}
      
  
      

    </div>
  );
}

export default App;
