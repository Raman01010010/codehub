// treeService.js
const fetchTree = async (id, axiosInstance, setTree) => {
    try {
        const response = await axiosInstance.post('/workspace/getall', { id });
        // Handle the response here
        console.log(response.data);
        setTree(response.data[0]);
    } catch (error) {
        // Handle the error here
        console.error(error);
    }
};

export default fetchTree;
