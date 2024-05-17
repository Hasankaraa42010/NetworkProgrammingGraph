import React from 'react'
import Graph from 'react-vis-network-graph'
import { edges, nodes } from './databas'

export default function WorldCup() {

    var options = {
        nodes:{
            shape: "dot",
            scaling: {
                min: 10,
                max: 30,
                label: {
                    min: 8,
                    max: 30,
                    drawThreshold: 12,
                    maxVisible: 20

                }
            },
            
            font: {
                size: 12,
                face: "Tahoma",
                color:"white"
                
            }
            
        },
        edges: {
            width: 0.10,
            color: {inherit: "from"},
            smooth: {
                type: "continuous"
            }
        },
        physics: false,
        interaction: {
            navigationButtons: true,
            tooltipDelay: 200,
            hideEdgesOnDrag: true,
            hideEdgesOnZoom: true
        },
        height: "1600px"
    }

    var data = {nodes: nodes, edges: edges}
  return (
    <div className='container'>
        <Graph
            graph = {data}
            options={options}
        />
    </div>
  )
}