// fileService.js
const handleSave = async (fid, axiosInstance, setCode) => {
    try {
        const res = await axiosInstance.post('/workspace/getfile', { id: fid });
        if (res.status === 200) {
            console.log('successful');
            console.log(res.data);
            setCode(res?.data?.data[0]?.versions[res?.data?.data[0]?.versions?.length - 1]?.content);
            console.log(res?.data?.data?.versions);
        } else {
            console.log('failed');
        }
    } catch (error) {
        console.error('Error in handleSave:', error);
    }
};

export default handleSave;
