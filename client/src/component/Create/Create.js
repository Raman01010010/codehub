import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import {
  faDiagramProject,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { postData } from './Utils';
import { User } from '../../context/User';
import { useContext } from 'react'
import axiosP from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
const Create = () => {
  const navigate = useNavigate();
  const axios = axiosP();
  const { newUser } = useContext(User);
  console.log(newUser)
  const [backgroundColor, setBackgroundColor] = useState('lightblue'); // State for background color
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false);
const [workspaces,setWorkspaces]=useState([])
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random color
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      setBackgroundColor(randomColor);
    }, 5000);
    if (showCreateWorkspace)
      clearInterval(interval);

    return () => {
      clearInterval(interval); // Clear the interval when the component is unmounted
    };
  }, [showCreateWorkspace]);
useEffect(() => {
 const ans=async()=>{ await getWorkspace();
}
ans()
},[])


  const getWorkspace = async () => {
    try {
      const response = await axios.get('/workspace');
      if (response?.status === 200) {
        console.log(response.data);
        setWorkspaces(response.data.workspaces)
        // Handle the response data
      }
      //return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const handleCreateWorkspaceClick = () => {
    setShowCreateWorkspace(true);
  };

  const handleCreateWorkspaceDone = () => {
    setShowCreateWorkspace(false);
  };

  // Dummy data for already created workspaces
  
  const [workspaceName, setWorkspaceName] = useState('');

  const handleNameChange = (e) => {
    setWorkspaceName(e.target.value);
  };

  const handleSave = async () => {

    try {

      const response = await axios.post('/workspace', { name: workspaceName, user: newUser.userid });
      if (response?.status === 200) {
        console.log("success")
        console.log(response)
        setShowCreateWorkspace(false);
        navigate(`/workspace/${response.data.workspace._id}/1`)

      }
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };




  
  const handleCancel = () => {
    //onCancel();
    setShowCreateWorkspace(false);
  };

  function handNav(id){
    navigate(`/workspace/${id}/1`)
  }
  return (
    <div style={{ display: 'flex', height: '90vh', overflowX: 'hidden' }}>
      {/* Create New Workspace */}
      <div className='flex justify-center' style={{ flex: 1, padding: '2rem', backgroundColor, overflow: 'hidden' }}>
        {!showCreateWorkspace ? (
          <button className='text-4xl' style={{ color: 'white' }} onClick={handleCreateWorkspaceClick}>
            <FontAwesomeIcon className='hover:scale-150' style={{ height: '20vh' }} icon={faPlus} /> Create New Workspace
          </button>
        ) : (
          <> <div  className=" h-1/2 bg-gradient-to-br from-purple-800 via-purple-800 to-indigo-200 shadow-4xl border-gray-100 rounded-xl fixed top-1/2 left-1/2 w-1/2 h-3/4 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-md">
 <div className='flex m-4 justify-center'>
 <AccountTreeIcon className='bg-purple-800 rounded-2xl' style={{ fontSize:'20vh',color:"white" }} />
 </div>
 
            <h2 className="flex justify-center text-white font-sans text-4xl font-semibold mb-4">Create New Workspace</h2>
            <input
              type="text"
              placeholder="Workspace Name"
              value={workspaceName}
              onChange={handleNameChange}
              className="w-full p-2 mb-4 border rounded-md"
            />
            <div className="flex justify-center">
              <button
                onClick={handleSave}
                className="px-4 py-2 m-4 bg-blue-500 text-4xl text-white rounded-md cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 m-4 bg-gray-400 text-4xl text-white rounded-md cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div></>
        )}
      </div>

      {/* Already Created Workspaces */}
      <div style={{ flex: 1, backgroundColor: 'white', padding: '2rem', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'purple' }}>Already Created Workspaces</h2>
        {/* Display the list of already created workspaces */}
        <div className='flex flex-wrap p-4'>
  {workspaces.map(workspace => (
    <div key={workspace._id} onClick={()=>handNav(workspace._id)}className='w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 p-2'>
      <div className='flex flex-col items-center justify-between text-gray-800 font-semibold p-2 bg-gradient-to-tr from-blue-800 via-blue-500 hover:from-blue-500 hover:scale-110 hover:to-blue-500 to-blue-200 p rounded-lg'>
    <AccountTreeIcon  style={{ fontSize: 80,color:"white" }} />
        <div className='text-sm text-gray-200 mt-2'>{workspace.name.toUpperCase()}</div>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default Create;
