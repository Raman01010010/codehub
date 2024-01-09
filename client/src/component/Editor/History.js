import React, { useState, useEffect } from 'react'
import HistoryIcon from '@mui/icons-material/History';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import CodeEditor from '@uiw/react-textarea-code-editor';
const History = (props) => {
    console.log(props)
    const axios = useAxiosPrivate()
    const [show, setShow] = useState(0)
    const [history, setHistory] = useState([])
    const [changes, setChanges] = useState([])
    // Declare undeclared variables and functions here


    useEffect(() => {
        const handleSave = async (e) => {

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
        handleSave()
    }, [])


    async function getVersion(e) {
        try {
            const re = await axios.post('/workspace/getversion', { fileId: props.id, versionId: e })
            console.log(re)
            if (re.status === 200) {
                console.log('successful')
                console.log(re?.data?.changes)
                console.log(re?.data)
                setChanges(re?.data?.changes)
                setShow(1)
            } else {
                console.log('failed')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleCancel = () => {
        // Handle cancel logic here
        props.set(false);
    };

    return (
        <>
            <div

                className="border-4  shadow-4xl border-gray-100 rounded-xl fixed top-1/2 left-1/2 w-3/4 h-3/4 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-md overflow-y-auto">

                <div className='flex justify-center'>
                    <h2 className="text-4xl font-semibold mb-4">File History</h2>
                </div>
                {show === 0 && <div>
                    {history?.map((item, index) => {
                        return (<>
                            <div onClick={() => getVersion(item._id)} className="bg-gradient-to-br flex rounded-xl m-2  from-blue-800 via-indigo-800 to-indigo-700">
                                <div>
                                    <div className='flex flex-col  justify-center'><HistoryIcon style={{ fontSize: "10vh" }} className=" text-white mb-4" />
                                    </div>
                                </div>
                                <div>
                                    <div className='flex flex-col text-left h-full justify-center text-lg text-white font-[arial] p-4'>
                                        {item._id}
                                        <div className='text-md text-gray-400'> {item.content.substring(0, 50)}</div>
                                        <div className='text-black'> Created By : {item.createdBy?.username}</div>
                                        <div className='text-sm text-gray-100'> Modified :  {item.createdAt}</div>
                                    </div>
                                </div>
                            </div>
                        </>)
                    })}
                </div>}

                {
                    show === 1 && <>
                        <div className="bg-gradient-to-br flex rounded-xl   from-blue-800 via-indigo-800 to-indigo-700">
                           
                         
                                <div className='overflow-hidden rounded-lg flex flex-col justify-center'>


                                    {changes[0]?.map((item, index) => {
                                        console.log(item)
                                        const color = item.added ? '#153d00' : item.removed ? '#380406' : '#161a2e'
                                        const c = item.added ? '+ ' : item.removed ? '- ' : ' '

                                        return (<>
                                            <CodeEditor
                                                value={`${c} ${item.value}`}
                                                language="cpp"
                                                placeholder="Please enter JS code."


                                                className="  border bg-gray-200"
                                                style={{
                                                    fontSize: '0.7em',
width:'85em',
                                                    backgroundColor: color,


                                                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                                }}
                                            />
                                        </>)

                                    })}

                                </div>

                            </div>
                        
                    </>
                }
                {/* Your content here */}

                <div className="flex text-4xl  justify-center">

                    <button
                        onClick={handleCancel}
                        className="px-4 m-4 py-2 bg-gray-400 text-white rounded-md cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    );
};

export default History