import React, { useEffect, useState } from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faFloppyDisk,
  faPlay,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { Button, Page, Text, Tree } from '@geist-ui/core'
import { useParams } from "react-router-dom";
import axiosP from '../hooks/useAxiosPrivate';
export default function App() {
  const [tree,setTree]=useState({})
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
  }, [])


  const [code, setCode] = useState(
    `function add(a, b) {\n  return a + b;\n}`
  );




  function View({ tree1 }) {
    if (!tree1) return <div></div>;
 // console.log(tree1)
    const It = tree1.name;
  console.log(It)
    const it2 = tree1.folders?.map((item, index) => (
    <>
          <Tree.Folder name={item.name}>
        <View tree1={item} />
        </Tree.Folder>
        </>
    ));
  
    const it3 = tree1.files?.map((item, index) => (
      <>
         <Tree.File name={item.name} />
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

  
  return (
    <div className="flex  ">
      <div className="w-1/3">

        <div className="w-full h-1/2">
          <div className="text-lg  flex justify-end  text-white bg-blue-800 rounded-tr-lg rounded-tl-lg">
            <button className="p-4 hover:text-gray-300"><FontAwesomeIcon icon={faPlus} /> New File</button>
          </div>
       
<View tree1={tree.fileTree}>

</View>

          <Tree>
            <Tree.File style={{ color: "blue" }} name="package.json" />
            <Tree.Folder name="components">
              <Tree.File name="layout.js" />
              <Tree.Folder name="footer">
                <Tree.File name="footer.js" />
                <Tree.File name="footer-text.js" />
                <Tree.File name="footer-license.js" />
              </Tree.Folder>
              <Tree.File name="header.js" />
            </Tree.Folder>
            <Tree.File name="readme.md" />
          </Tree>

        </div>
        <div className="bg-gray-800 border border-blue-500  rounded-lg h-1/2">
          <div className="text-lg p-4 flex justify-center text-white bg-blue-800 rounded-tr-lg rounded-tl-lg">Sample Input</div>
          <textarea className="w-full h-1/2 p-4 text-white bg-gray-800" placeholder="Enter Input"></textarea>
        </div>


      </div>
      <div className="flex-col-2 w-full lg:w-2/2 flex-wrap ">
        <div className="flex  rounded-lg border border-blue-500  bg-blue-900 text-white p-4 flex items-center justify-between">
          <div>
            <span className="font-bold">File.cpp</span>
          </div>
          <div className="flex space-x-4">
            <button className="hover:text-gray-300"><FontAwesomeIcon icon={faPlay} /></button>
            <button className="hover:text-gray-300"><FontAwesomeIcon icon={faFloppyDisk} /></button>
            <button className="hover:text-gray-300">Edit  </button>

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

      </div></div>
  );
}