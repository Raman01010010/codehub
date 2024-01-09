// fileHandler.js
const handleFile = (p, tree, setMyfile, setCode) => {
    const e = p.path;
    const id = p.id;
  
    setMyfile({ path: e, id });
  
    const a1 = e.split('/');
    if (a1.length === 1) {
      const a3 = tree.fileTree.files.find((item) => item.name === a1[0]);
      if (a3?.versions?.length === 0) {
        setCode('//Start Typing');
      } else {
        setCode(a3?.versions[a3?.versions?.length - 1]?.content);
      }
    } else {
      let a2 = tree.fileTree;
      for (let i = 0; i < a1.length - 1; i++) {
        const a3 = a2.folders.find((item) => item.name === a1[i]);
        a2 = a3;
      }
  
      const a4 = a2?.files?.find((item) => item.name === a1[a1.length - 1]);
  
      if (a4?.versions?.length === 0) {
        setCode('//Start Typing');
      } else {
        setCode(a4?.versions[a4?.versions?.length - 1]?.content);
      }
    }
  };
  
  export default handleFile;
  