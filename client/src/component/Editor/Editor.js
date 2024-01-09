import React, { useEffect, useState } from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Box from '@mui/material/Box';

import Fab from '@mui/material/Fab';
import modifyFile from './modifyFile';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';
import View from "./View";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HistoryIcon from '@mui/icons-material/History';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

import DataObjectIcon from '@mui/icons-material/DataObject';
import { TreeView } from '@mui/x-tree-view/TreeView';
import handleSave1 from "./handleSave";
import fetchTree from "./fetchTree";
import handleFile from "./handleFile";
import {

  faFloppyDisk,
  faPlay,

} from "@fortawesome/free-solid-svg-icons";
import Create from "./Create";

import { useParams } from "react-router-dom";
import axiosP from '../../hooks/useAxiosPrivate';
import History from "./History";
import CenteredTabs from "./TabDesign";
export default function App() {
  const [code, setCode] = useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  const [tree, setTree] = useState({})
  const [myfile, setMyfile] = useState({ "path": "" })
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false);
  const [showhistory, setShowHistory] = useState(false)
  const { id, fid } = useParams()
  console.log(id)
  const axios = axiosP()
  useEffect(() => {
    // Pass axios instance as a parameter
    handleSave1(fid, axios, setCode);
  }, [fid]);


  useEffect(() => {
    const fetchData = async () => {
      // Pass axios instance as a parameter
      await fetchTree(id, axios, setTree);
    };

    fetchData();
  }, [id, myfile]);




 





  const [tb, setTb] = useState(1);
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

        {tb === 0 && <div className="relative  border-gray-900"> <div className=" overflow-y-auto">
          <div style={{ height: '79vh' }}>
            <TreeView

              aria-label="gmail"
              defaultExpanded={['3']}
              defaultCollapseIcon={<><ExpandMoreIcon style={{ marginLeft: '3vh', fontSize: '5vh' }} /></>}
              defaultExpandIcon={<><ChevronRightIcon style={{ marginLeft: '3vh', fontSize: '5vh' }} /></>}
              defaultEndIcon={<div style={{ width: 24 }} />}

              sx={{ fontSize: '32px', height: '79vh', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
            >
              <View tree1={tree.fileTree}  handleFile={handleFile} tree={tree} setMyfile={setMyfile} setCode={setCode}>

              </View>
            </TreeView>
            <div className="flex justify-center ">
              <Box className='absolute bottom-4 right-4' sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab onClick={() => setShowCreateWorkspace(true)} size="big" color="secondary" aria-label="add">
                  <AddIcon />
                </Fab>
              </Box>
            </div>
          </div>


        </div>
        </div>}

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