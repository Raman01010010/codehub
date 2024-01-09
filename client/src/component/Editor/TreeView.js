// TreeViewContainer.js
import React from 'react';
import {TreeView} from '@mui/x-tree-view/TreeView';
import View from './View';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const TreeViewContainer = ({ tree, handleFile, setMyfile, setCode, setShowCreateWorkspace }) => {
  return (
    <div className="relative border-gray-900">
      <div className="overflow-y-auto">
        <div style={{ height: '79vh' }}>
          <TreeView
            aria-label="gmail"
            defaultExpanded={['3']}
            defaultCollapseIcon={<ExpandMoreIcon style={{ marginLeft: '3vh', fontSize: '5vh' }} />}
            defaultExpandIcon={<ChevronRightIcon style={{ marginLeft: '3vh', fontSize: '5vh' }} />}
            defaultEndIcon={<div style={{ width: 24 }} />}
            sx={{ fontSize: '32px', height: '79vh', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
          >
            <View tree1={tree.fileTree} handleFile={handleFile} tree={tree} setMyfile={setMyfile} setCode={setCode} />
          </TreeView>
          <div className="flex justify-center">
            <Box className="absolute bottom-4 right-4" sx={{ '& > :not(style)': { m: 1 } }}>
              <Fab onClick={() => setShowCreateWorkspace(true)} size="big" color="secondary" aria-label="add">
                <AddIcon />
              </Fab>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeViewContainer;
