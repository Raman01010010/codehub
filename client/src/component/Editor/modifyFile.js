// fileModifier.js
const modifyFile = async (axiosInstance, id, path, fileId, content) => {
    try {
      const res = await axiosInstance.post('/workspace/modifyfile', { id, path, fileId, content });
      console.log(res);
      return res; // You can return the response if needed
    } catch (error) {
      console.log(error);
      throw error; // You can rethrow the error or handle it as needed
    }
  };
  
  export default modifyFile;
  