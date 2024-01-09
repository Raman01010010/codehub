import React, { useEffect, useState } from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import KeyboardAltIcon from '@mui/icons-material/KeyboardAlt';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Fab from '@mui/material/Fab';

import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HistoryIcon from '@mui/icons-material/History';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

import DataObjectIcon from '@mui/icons-material/DataObject';
import { TreeView } from '@mui/x-tree-view/TreeView';
import handleSave1 from "./handleSave";
import fetchTree from "./fetchTree";

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
  const [showhistory,setShowHistory]=useState(false)
  const { id,fid } = useParams()
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





  function handleFile(p) {
    let e = p.path
    let id = p.id
    console.log(p)
    setMyfile({ "path": e, "id": id })

    const a1 = e.split('/');
    console.log(a1)
    console.log(e)
    let a2 = tree.fileTree;
    console.log(a2)
    if (a1.length === 1) {
      const a3 = a2.files.find((item) => item.name === a1[0]);
      console.log(a3)
      if (a3?.versions?.length === 0) {
        setCode('//Start Typing')
      } else {
        console.log(a3?.versions[a3?.versions?.length - 1]?.content)
        setCode(a3?.versions[a3?.versions?.length - 1]?.content)
      }
      // Perform your logic here for a1 size equal to 1
    } else {
      for (let i = 0; i < a1.length - 1; i++) {
        let a3 = a2.folders.find((item) => item.name === a1[i]);
        console.log(a3)
        a2 = a3;
      }
      console.log(a2)
      let a4 = a2?.files?.find((item) => item.name === a1[a1.length - 1]);
      console.log(a4)

      if (a4?.versions?.length === 0) {
        setCode('//Start Typing')
        console.log("cmnvmcv")
      } else {
        console.log(a4?.versions[a4?.versions?.length - 1]?.content)
        setCode(a4?.versions[a4?.versions?.length - 1]?.content)
      }
    }
  }

  function View({ tree1 }) {
    if (!tree1) return <div></div>;
    // console.log(tree1)
    const It = tree1.name;
    console.log(It)
    const it2 = tree1.folders?.map((item, index) => (
      <>
        <TreeItem key={Math.random()} nodeId={Math.random()} label={<div className="text-xl font-semibold"><FolderIcon className="m-2" style={{ fontSize: '5vh' }} />{item.name}</div>}>
          <View tree1={item} />
        </TreeItem>
      </>
    ));


    const it3 = tree1.files?.map((item, index) => (
      <>
        <TreeItem onClick={() => handleFile({ path: item?.path, id: item?._id })} key={Math.random()} nodeId={Math.random()} label={<div className="text-xl font-semibold m-2"><DataObjectIcon style={{ fontSize: '5vh' }} />{item.name}</div>}>

        </TreeItem>

        {/* Render file-related content here */}
      </>
    ));


    return (
      <>

        {it2}
        {it3}

      </>
    );
  }

  async function handleSave() {
    try {
      const res = await axios.post('/workspace/modifyfile', { id: id, path: myfile.path, fileId: myfile.id, content: code })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  const [tb, setTb] = useState(1);
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
              <View tree1={tree.fileTree}>

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
            <button onClick={()=>setShowHistory(true)} className="hover:text-gray-300 mx-2"><HistoryIcon style={{ fontSize: '6vh' }} />  </button>

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
      {showhistory&&<History id={myfile.id} set={setShowHistory}/>}</div>
  );
}