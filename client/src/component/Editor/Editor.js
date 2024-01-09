import React, { useEffect, useState } from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TreeViewContainer from "./TreeView";
import modifyFile from './modifyFile';
import HistoryIcon from '@mui/icons-material/History';
import handleSave1 from "./handleSave";
import fetchTree from "./fetchTree";
import handleFile from "./handleFile";
import { faFloppyDisk, faPlay, } from "@fortawesome/free-solid-svg-icons";
import Create from "./Create";
import { useParams } from "react-router-dom";
import axiosP from '../../hooks/useAxiosPrivate';
import History from "./History";
import CenteredTabs from "./TabDesign";
export default function App() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  const [tree, setTree] = useState({})
  const [myfile, setMyfile] = useState({ "path": "" })
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false);
  const [showhistory, setShowHistory] = useState(false)
  const [tb, setTb] = useState(0);
  const { id, fid } = useParams()
  console.log(id)
  const axios = axiosP()
  useEffect(() => {
    // Pass axios instance as a parameter
    setMyfile({ id: fid })
    handleSave1(fid, axios, setCode);
  }, [fid]);


  useEffect(() => {
    const fetchData = async () => {
      // Pass axios instance as a parameter
      await fetchTree(id, axios, setTree);
    };

    fetchData();
  }, [id, myfile]);



  const handleSave = async () => {
    try {
      await modifyFile(axios, id, myfile.path, myfile.id, code);
    } catch (error) {
      // Handle the error as needed
      console.error('Error while saving:', error);
    }
  };


  return (
    <div className="flex  ">
      <div className="w-1/3">
        <CenteredTabs set={setTb} />
        {tb === 0 && <TreeViewContainer tree={tree} handleFile={handleFile} setMyfile={setMyfile} setCode={setCode} setShowCreateWorkspace={setShowCreateWorkspace} />}
        {tb === 1 && <div className="bg-gray-700 border border-gray-900  rounded-bl-lg h-full">

          <textarea className="w-full p-4 text-2xl text-white bg-gray-700" placeholder="Enter Input"></textarea>
        </div>}
      </div>
      <div className="flex-col-2 w-full lg:w-2/2 flex-wrap ">
        <div className="flex  rounded-tr-lg border border-gray-900  bg-gray-900 text-white p-3 flex items-center justify-between">
          <div>
            <span className="font-bold">File.cpp</span>
          </div>
          <div style={{ fontSize: '4vh' }} className="flex space-x-4">
            <button className="hover:text-gray-300 mx-2"><FontAwesomeIcon icon={faPlay} /></button>
            <button onClick={handleSave} className="hover:text-gray-300 mx-2"><FontAwesomeIcon icon={faFloppyDisk} /></button>
            <button onClick={() => setShowHistory(true)} className="hover:text-gray-300 mx-2"><HistoryIcon style={{ fontSize: '6vh' }} />  </button>

          </div>
        </div>

        <CodeEditor
          value={code}
          language="cpp"
          placeholder="Please enter JS code."
          onChange={(evn) => setCode(evn.target.value)}
          padding={15}
          className=" rounded-br-lg border border-gray-900 bg-gray-200"
          style={{
            fontSize: '20px',
            height: '80vh',
            backgroundColor: "#263040",


            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />

      </div>
      {showCreateWorkspace && <Create id={id} set={setShowCreateWorkspace} />}
      {showhistory && <History id={myfile.id} set={setShowHistory} />}</div>
  );
}