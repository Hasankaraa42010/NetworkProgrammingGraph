// Data.js

import React, { useEffect, useState } from "react";
import { colors } from "./colors";

const Data = (externalData, File) => {

   
  const nodes = [];
  const links = [];

  const MAIN_NODE_SIZE = 40;
  const CHILD_NODE_SIZE = 15;
  const LEAF_NODE_SIZE = 5;
  const DEFAULT_DISTANCE = 20;
  const MAIN_NODE_DISTANCE = 90;
  const LEAF_NODE_DISTANCE = 30;
  const MANY_BODY_STRENGTH = -20;

  let i = 0;

  const addMainNode = (node) => {
    node.size = MAIN_NODE_SIZE;
    node.color = colors[i++][1];
    nodes.push(node);
  };

  const addChildNode = (
    parentNode,
    childNode,
    size = CHILD_NODE_SIZE,
    distance = DEFAULT_DISTANCE
  ) => {
    childNode.size = size;
    childNode.color = parentNode.color;
    nodes.push(childNode);
    links.push({
      source: parentNode,
      target: childNode,
      distance,
      color: parentNode.color,
    });
  };

  const assembleChildNode = (parentNode, id, numLeaves = 20) => {
    const childNode = { id };
    addChildNode(parentNode, childNode);

    for (let i = 0; i < numLeaves; i++) {
      addChildNode(childNode, { id: "" }, LEAF_NODE_SIZE, LEAF_NODE_DISTANCE);
    }
  };

  const connectMainNodes = (source, target) => {
    links.push({
      source,
      target,
      distance: MAIN_NODE_DISTANCE,
      color: source.color,
    });
  };

  const mainGraph = { id: File };
  addMainNode(mainGraph);
  //assembleChildNode(mainGraph, 'Community Vision');
  

 

  assembleChildNode(mainGraph, "Fileİnformation",4);

  const AntiVirusMotor = { id: "Antivirus Motor Results" };
  addMainNode(AntiVirusMotor);
 
  assembleChildNode(AntiVirusMotor, "Arama Motorları",64);
  assembleChildNode(mainGraph, "Virus Bilgileri",8);
  

  
  connectMainNodes(mainGraph, AntiVirusMotor);
 
 

  useEffect(() => {
    const [firstPart, secondPart, thirdPart] = externalData;
        
        Object.entries(firstPart).map(([key,value])=>{
        console.log(key+" :"+value);
        
        })
        
        console.log("1 bitti");
        Object.entries(secondPart).map(([key,value])=>{
          console.log(key);
          })
          console.log("2 bitti");

        Object.entries(thirdPart).map(([key,value])=>{
          console.log(key+" "+value);
          })
          console.log("3 bitti");

        console.log(secondPart);
        console.log(thirdPart);
        
       
       
  }, [externalData]);

  return { nodes, links, MANY_BODY_STRENGTH };
};

export default Data;
