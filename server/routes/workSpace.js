const workspaceController = require('../controllers/Workspace/workspaceController');
const express = require('express');
const router = express.Router();
//console.log(workspaceController)
// Route for creating a workspace
router.post('/', workspaceController.createWorkspace);
router.post('/add', workspaceController.addFilesToWorkspace);
router.post('/getall', workspaceController.getDocuments);
router.post('/getfile', workspaceController.fetchFile);
router.post('/modifyfile', workspaceController.modifyFile);
router.post('/getversion', workspaceController.getVersionById);
router.get('/', workspaceController.fetchWorkspaceNamesWithVisibility);

module.exports = router;
