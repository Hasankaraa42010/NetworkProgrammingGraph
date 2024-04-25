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

      {/* Aşağıdaki kısımın açıklamasını kaldırıp kullanmak istediğiniz bileşenleri ekleyebilirsiniz */}
      {/* 
      <TreeDiagram data={data} />
      <TreeDiagram data={data} />
      <FileUpload onDataUpdate={handleDataUpdate} />
      {uploadedData && Object.keys(uploadedData).length > 0 && <ul></ul>}
      <div>kara</div> 
      */}
    </div>
  );
}

export default App;
