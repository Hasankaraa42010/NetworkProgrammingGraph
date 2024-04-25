import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import FileService from './Service/FileService';
import * as d3 from 'd3';

export default function FileUpload({ onDataUpdate,File }) {
   
    const [data, setData] = useState([])  
  
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };  
      const handleUpload = async () => {
        if (file) {
          console.log(file.name);
          console.log("Uploading file...");
    
          const formData = new FormData();
            formData.append("file", file);
          console.log(file);
            
            const service=new FileService();
            service.addFile(formData).then(res=>{
               // console.log(res);
                setData(res)
                console.log("istediğim data");
                console.log(res);
                //console.log("resdata kısmı"+res[1]);
                onDataUpdate(res);
                File(file.name)
               console.log(res);
              
            }).catch(er=>{
                console.log(er);
            })
        }
         
      };
      
  return (

<div>
<input type="file" onChange={handleFileChange} />
{file && <button onClick={handleUpload}>Upload a file</button>}

</div>
  )
}
