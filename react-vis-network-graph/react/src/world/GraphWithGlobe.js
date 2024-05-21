import React from 'react';
import Globe from 'react-globe.gl';
import { nodes, edges } from './data'; 

const GraphWithGlobe = () => {
   
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '900px', height: '900px', position: 'relative' }}>
        <Globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          width={900}
          height={900}
          pointsData={nodes.map(node => ({
            lat: node.lat,
            lng: node.lng,
            label: node.label,
            color:"black"
          }))}
        
          pointLabel="label"
          pointColor="color"
          pointAltitude={0.0001}
          arcsData={edges.map(edge => {
            const sourceNode = nodes.find(node => node.id === edge.from);
            const targetNode = nodes.find(node => node.id === edge.to);
            return {
              startLat: sourceNode.lat,
              startLng: sourceNode.lng,
              endLat: targetNode.lat,
              endLng: targetNode.lng,
              color: ['#FF0000', '#00FF00'], // Renkler, kırmızıdan yeşile geçiş
              strokeWidth: 2.5,
              greatArc: true
            };
          })}
          arcColor="color"
          arcDashLength={0.4}
          arcDashGap={1}
          arcDashInitialGap={() => Math.random()}
          arcDashAnimateTime={4000}
          
        />
      </div>
    </div>
  );
};

export default GraphWithGlobe;
