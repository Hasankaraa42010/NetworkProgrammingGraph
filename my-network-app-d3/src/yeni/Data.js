// Data.js


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
    distance = DEFAULT_DISTANCE,
    color=parentNode.color
  ) => {
    childNode.size = size;
    childNode.color = color;
    nodes.push(childNode);
    links.push({
      source: parentNode,
      target: childNode,
      distance,
      color: color,
    });
  };

  // const assembleChildNode = (parentNode, id, numLeaves = 20) => {
  //   const childNode = { id };
  //   addChildNode(parentNode, childNode);

  //   for (let i = 0; i < numLeaves; i++) {
  //     addChildNode(childNode, { id: "" }, LEAF_NODE_SIZE, LEAF_NODE_DISTANCE);
  //   }
  // };
  const assembleChildNode2 = (parentNode, id,object) => {
    const childNode = { id };
    addChildNode(parentNode, childNode,30,20);

    Object.entries(object).map(([key,value])=>{
     addChildNode(childNode,{id:key+":"+value},20,60)
     return null;
      })
  };
  const assembleChildNode3 = (parentNode, id,object) => {
   let malicious=0;
    const childNode = { id };
    addChildNode(parentNode, childNode,30,20);
    if ( Object.keys(object).length===0) {

      addChildNode(childNode,{id:"Api süresi bekleyin"},20,60,colors[3][1])
      malicious=-1;
    }
    else {
      Object.entries(object).map((key)=>{
    
    if(key[1].category==="malicious"){
      malicious++;
      addChildNode(childNode,{id:key[1].engine_name},20,60,colors[0][0])
      addChildNode(childNode,{id:key[1].result},20,60,colors[7][0])

     }

   })
   if(malicious===0){
    addChildNode(childNode,{id:"Dosya Temiz"},20,60,colors[2][2])
   }
 
    }
   
    // Object.entries(object).map(([key,value])=>{
    //   console.log(key);
    //   Object.entries(key).map(([ke,val])=>{
    //     console.log(ke);
    //   })
    //   console.log("bitti");
    //  //addChildNode(childNode,{id:key+":"+value},10,50)
    //   })
  };
  
  const connectMainNodes = (source, target) => {
    links.push({
      source,
      target,
      distance: MAIN_NODE_DISTANCE+100,
      color: source.color,
    });
  };
  
  const mainGraph = { id: File };
  //ana dosya eklendi
  addMainNode(mainGraph);
 

 
 
  // const FileAntivurusInfo = { id: "Dosya Antivirüs Bilgileri" };
  // addMainNode(FileAntivurusInfo);
  
  // const FileInfo = { id: "Dosya Bilgileri" };
  // addMainNode(FileInfo);
  
  // connectMainNodes(mainGraph,FileInfo)
  // connectMainNodes(mainGraph, FileAntivurusInfo);
  

  
  assembleChildNode2(mainGraph,"Dosya Virus Bilgileri",externalData[0])
  assembleChildNode2(mainGraph,"Dosya Bilgileri",externalData[2])
  assembleChildNode3(mainGraph,"Antivirus Bilgileri",externalData[1])
  
  //
  
 
 

  // useEffect(() => {
   
  // }, [externalData]);

  return { nodes, links, MANY_BODY_STRENGTH };
};

export default Data;
