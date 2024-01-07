import React from 'react'
import PostAddIcon from '@mui/icons-material/PostAdd';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Create = (props) => {
    console.log(props)
    const axios=useAxiosPrivate()
    // Declare undeclared variables and functions here
    const [name,setname]=React.useState('')
    const backgroundColor = ""; // Declare backgroundColor variable
    const workspaceName = ""; // Declare workspaceName variable

    const handleNameChange = (e) => {
e.preventDefault()
        setname(e.target.value)
        // Handle name change logic here
    };

    const handleSave = async(e) => {
        e.preventDefault();
      const res=await axios.post('/workspace/add',{Id:props.id,itemPath:name})
      if(res.status===200){
        console.log('successful')
      }else{
        console.log('failed')
      }
        // Handle save logic here
    };

    const handleCancel = () => {
        // Handle cancel logic here
        props.set(false);
    };

    return (
        <>
            <div
                style={{ backgroundColor }}
                className="border-4  shadow-4xl border-gray-100 rounded-xl fixed top-1/2 left-1/2 w-1/2 h-3/4 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-md"
            >
                <div className='flex justify-center'><PostAddIcon style={{fontSize:"20vh"}} className=" text-blue-500 mb-4" />
                </div>
                <div className='flex justify-center'>
                   <h2 className="text-4xl font-semibold mb-4">Create New File</h2>
                   </div>
                <input
                    type="text"
                    placeholder="Workspace Name"
                    value={name}
                    onChange={handleNameChange}
                    className="w-full text-2xl p-2 mb-4 border rounded-md"
                />
                <div className="flex text-4xl  justify-center">
                    <button
                        onClick={handleSave}
                        className="px-4 m-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleCancel}
                        className="px-4 m-4 py-2 bg-gray-400 text-white rounded-md cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
};

export default Create