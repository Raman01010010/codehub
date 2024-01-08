import React, { useState } from 'react'
import HistoryIcon from '@mui/icons-material/History';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const History = (props) => {
    console.log(props)
    const axios = useAxiosPrivate()
    const [history, setHistory] = useState([])
    // Declare undeclared variables and functions here



    const handleSave = async (e) => {
        e.preventDefault();
        console.log(props.id)
        const res = await axios.post('/workspace/getfile', { id: props.id })
        if (res.status === 200) {
            console.log('successful')
            console.log(res.data)
            setHistory(res?.data?.data[0]?.versions)
            console.log(res?.data?.data?.versions)
            // props.set(false);
        } else {
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

                className="border-4  shadow-4xl border-gray-100 rounded-xl fixed top-1/2 left-1/2 w-3/4 h-3/4 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-md overflow-y-auto">

                <div className='flex justify-center'>
                    <h2 className="text-4xl font-semibold mb-4">Create New File</h2>
                </div>
                {history?.map((item, index) => {
                    return (<>
                        <div className="bg-gradient-to-br flex rounded-xl m-2  from-blue-800 via-indigo-800 to-indigo-700">
                            <div>
                            <div className='flex flex-col  justify-center'><HistoryIcon style={{ fontSize: "10vh" }} className=" text-white mb-4" />
                            </div>
                            </div>
                            <div>
                            <div className='flex flex-col text-left h-full justify-center text-lg text-white font-[arial] p-4'>
                              
                            <div className='text-md text-gray-400'> {item.content.substring(0, 50)}</div>
                            <div className='text-black'> Created By : {item.createdBy?.username}</div>
                            <div className='text-sm text-gray-100'> Modified :  {item.createdAt}</div>
                            </div>
                            </div>
                        </div>
                    </>)
                })}

                {/* Your content here */}

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

export default History