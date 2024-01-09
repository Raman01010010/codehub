// TreeView.js
import React from 'react';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import FolderIcon from '@mui/icons-material/Folder';
import DataObjectIcon from '@mui/icons-material/DataObject';

const View = ({ tree1, handleFile, tree, setMyfile, setCode }) => {
  if (!tree1) return <div></div>;

  const it2 = tree1.folders?.map((item, index) => (
    <TreeItem key={Math.random()} nodeId={Math.random()} label={<div className="text-xl font-semibold"><FolderIcon className="m-2" style={{ fontSize: '5vh' }} />{item.name}</div>}>
      <View tree1={item} handleFile={handleFile} tree={tree} setMyfile={setMyfile} setCode={setCode} />
    </TreeItem>
  ));

  const it3 = tree1.files?.map((item, index) => (
    <TreeItem onClick={() => handleFile({ path: item?.path, id: item?._id }, tree, setMyfile, setCode)} key={Math.random()} nodeId={Math.random()} label={<div className="text-xl font-semibold m-2"><DataObjectIcon style={{ fontSize: '5vh' }} />{item.name}</div>}>
      {/* Render file-related content here */}
    </TreeItem>
  ));

  return (
    <>
      {it2}
      {it3}
    </>
  );
};

export default View;
