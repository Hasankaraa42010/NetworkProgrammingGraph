import { useState } from "react";
import "./App.css";
import Circle from "./Circle";
import FileUpload from "./FileUpload";
import TreeDiagram from "./TreeDiagram";

function App() {
  const [uploadedData, setUploadedData] = useState();
  const [fileVirusİnformation, setFileVirusİnformation] = useState([]);
  const [fileInformation, setFileInformation] = useState([]);
  const [fileAntivirusMotorsInformation, setFileAntivirusMotorsInformation] =
    useState([]);
  const handleDataUpdate = (data) => {
    setUploadedData(data);
    setFileInformation(uploadedData[2]);
    setFileVirusİnformation(uploadedData[0]);
    setFileAntivirusMotorsInformation(uploadedData[1]);
    console.log("app");
    const antivirusMotorArray = Object.entries(fileAntivirusMotorsInformation);

    // Dizi içinde gezerek her bir antivirus motorunu işleme
    antivirusMotorArray.map(([antivirusName, antivirusData]) => {
      console.log(antivirusName, antivirusData);
    });
    const fileMotorVirusİnformation = Object.entries(fileVirusİnformation);

    fileMotorVirusİnformation.map(([typeName, count]) => {
      console.log(typeName, count);
    });
    console.log(fileInformation);
    const fileMotorFileInformation = Object.entries(fileInformation);

    // Diziyi map ile döngüye alarak her bir anahtar-değer çiftini işleme
    fileMotorFileInformation.map(([hashValues, value]) => {
      console.log(hashValues,value);
    });
  };

  const data = {
    name: "FileName",
    children: [
      {
        name: "Dosya Virus bilgileri",
        children: Array(8)
          .fill(null)
          .map((_, i) => ({ name: `Child ${i + 1}` })),
      },
      {
        name: "dosya bilgileri",
        children: Array(4)
          .fill(null)
          .map((_, i) => ({ name: `Child ${i + 1}` })),
      },
      {
        name: "dosya antivurs arama motorlarına göre sonuclar",
        children: Array(64)
          .fill(null)
          .map((_, i) => ({ name: `Child ${i + 1}` })),
      },
    ],
  };
  return (
    <div>
      {/* <TreeDiagram data={data}/> */}
      <TreeDiagram data={data} />
      <FileUpload onDataUpdate={handleDataUpdate} />
      {uploadedData && Object.keys(uploadedData).length > 0 && <ul></ul>}

      <div>kara</div>
    </div>
  );
}

export default App;
