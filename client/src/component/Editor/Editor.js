import React, { useEffect, useState } from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KeyboardAltIcon from '@mui/icons-material/KeyboardAlt';
import {

  faFloppyDisk,
  faPlay,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import Create from "./Create";
import { Button, Page, Text, Tree } from '@geist-ui/core'
import { useParams } from "react-router-dom";
import axiosP from '../../hooks/useAxiosPrivate';
export default function App() {
  const [code, setCode] = useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  const [tree, setTree] = useState({})
  const [myfile,setMyfile]=useState({"path":""})
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false);
  const { id } = useParams()
  console.log(id)
  const axios = axiosP()
  useEffect(() => {

    const f = async () => {
      const url = 'https://example.com/workspace/gettree';


      await axios.post('/workspace/getall', { id: id })
        .then(response => {
          // Handle the response here
          console.log(response.data);
          setTree(response.data[0])

        })
        .catch(error => {
          // Handle the error here
          console.error(error);
        });


    }
    f()
  }, [myfile])





function handleFile(e){
  setMyfile({"path":e})
  const a1 = e.split('/');
  console.log(a1) 
  console.log(e)
  let a2 = tree.fileTree;
console.log(a2)
  if (a1.length === 1) {
   const a3= a2.files.find((item) => item.name === a1[0]);
   console.log(a3)
   if(a3?.versions?.length===0){
      setCode('//Start Typing')
   }else{
      console.log(a3?.versions[a3?.versions?.length-1]?.content)
      setCode(a3?.versions[a3?.versions?.length-1]?.content)
   }
    // Perform your logic here for a1 size equal to 1
  }else {
    for(let i=0;i<a1.length-1;i++){
      let a3= a2.folders.find((item) => item.name === a1[i]);
      console.log(a3)
      a2=a3;
    }
    console.log(a2)
    let a4= a2?.files?.find((item) => item.name === a1[a1.length-1]);
    console.log(a4)

    if(a4?.versions?.length===0){
      setCode('//Start Typing')
      console.log("cmnvmcv")
  }else{
    console.log(a4?.versions[a4?.versions?.length-1]?.content)
    setCode(a4?.versions[a4?.versions?.length-1]?.content)
  }
}}

  function View({ tree1 }) {
    if (!tree1) return <div></div>;
    // console.log(tree1)
    const It = tree1.name;
    console.log(It)
    const it2 = tree1.folders?.map((item, index) => (
      <>
        <Tree.Folder className="text-2xl" name={item.name}>
          <View tree1={item} />
        </Tree.Folder>
      </>
    ));

    const it3 = tree1.files?.map((item, index) => (
      <>
        <Tree.File name={item.name} onClick={()=>handleFile(item?.path)} />
        {/* Render file-related content here */}
      </>
    ));

    return (
      <>
        <Tree>
          {it2}
          {it3}
        </Tree>
      </>
    );
  }

async function handleSave(){ 
  try{ 
  const res=await axios.post('/workspace/modifyfile',{id:id,path:myfile.path,content:code})
  console.log(res)
  }catch(error){  
    console.log(error)
  }
}
  return (
    <div className="flex  ">
      <div className="w-1/3">

        <div className="w-full h-1/2  overflow-x-auto overflow-y-auto">
          <div className=" text-lg  flex justify-end  text-white bg-blue-800 rounded-tr-lg rounded-tl-lg">
            <button onClick={()=>setShowCreateWorkspace(true)} style={{fontSize:'4vh'}}className="p-4 hover:text-gray-300"><FontAwesomeIcon icon={faPlus} /></button>
          </div>

          <View tree1={tree.fileTree}>

          </View>



        </div>
        <div className="bg-gray-800 border border-blue-500  rounded-lg h-1/2">
          <div className="text-2xl font-semibold p-4 flex justify-center text-white bg-blue-800 rounded-tr-lg rounded-tl-lg">
            <KeyboardAltIcon style={{fontSize:'7vh'}}className="mr-2 " />
           </div>
          <textarea className="w-full h-1/2 p-4 text-2xl text-white bg-gray-800" placeholder="Enter Input"></textarea>
        </div>


      </div>
      <div className="flex-col-2 w-full lg:w-2/2 flex-wrap ">
        <div  className="flex  rounded-lg border border-blue-500  bg-blue-900 text-white p-2 flex items-center justify-between">
          <div>
            <span className="font-bold">File.cpp</span>
          </div>
          <div style={{fontSize:'4vh'}} className="flex space-x-4">
            <button className="hover:text-gray-300 mx-2"><FontAwesomeIcon icon={faPlay} /></button>
            <button onClick={handleSave} className="hover:text-gray-300 mx-2"><FontAwesomeIcon icon={faFloppyDisk} /></button>
            <button className="hover:text-gray-300 mx-2">Edit  </button>

          </div>
        </div>

        <CodeEditor
          value={code}
          language="cpp"
          placeholder="Please enter JS code."
          onChange={(evn) => setCode(evn.target.value)}
          padding={15}
          className=" rounded-lg border border-blue-500 bg-gray-500"
          style={{
            fontSize: '20px',
            height: '80vh',


            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />

      </div>
      {showCreateWorkspace&&<Create id={id} set={setShowCreateWorkspace}/>}</div>
  );
}