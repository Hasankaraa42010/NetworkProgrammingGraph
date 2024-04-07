import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import FileService from './Service/FileService';
import * as d3 from 'd3';

export default function FileUpload() {
    const svgRef = useRef();
    const [data, setData] = useState([])  
    useEffect(() => {
        const svg = d3.select(svgRef.current);
    
        // Ölçek fonksiyonlarını tanımla
        const xScale = d3.scaleBand()
          .domain(data.map(d => d.engine_name))
          .range([0, 500])
          .padding(0.1);
    
        const yScale = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.result)])
          .range([200, 0]);
    
        // Çubukları oluştur
        svg.selectAll('.bar')
          .data(data)
          .enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('x', d => xScale(d.engine_name))
          .attr('y', d => yScale(d.result))
          .attr('width', xScale.bandwidth())
          .attr('height', d => 200 - yScale(d.result))
          .attr('fill', 'steelblue');
    
        // x eksenini oluştur
        svg.append('g')
          .attr('transform', 'translate(0,200)')
          .call(d3.axisBottom(xScale));
    
        // y eksenini oluştur
        svg.append('g')
          .call(d3.axisLeft(yScale));
      }, [data]);
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };  
      const handleUpload = async () => {
        if (file) {
          console.log("Uploading file...");
    
          const formData = new FormData();
            formData.append("file", file);
          console.log(file);
            
            const service=new FileService();
            service.addFile(formData).then(res=>{
                console.log(res.data[0]);
                setData(res.data[0])
               console.log(data);
              
            }).catch(er=>{
                console.log(er);
            })
        }
         
      };
      
  return (
//     <div>
//         <input type="file" onChange={handleFileChange} />
//     {file && <button onClick={handleUpload}>Upload a file</button>}
//     {data!=null && <svg ref={svgRef} width={500} height={200}></svg>}
//   </div>
<div>
<input type="file" onChange={handleFileChange} />
{file && <button onClick={handleUpload}>Upload a file</button>}
{data != null && (
  <svg ref={svgRef} width={500} height={200}>
    {/* data içindeki verileri burada döngü ile işleyin */}
    {data.map((item, index) => (
      <circle
        key={index}
        cx={index * 50 + 25}
        cy={200 - item}
        r={item}
        fill="red"
      />
    ))}
  </svg>
)}
</div>
  )
}
