const workspaceController = require('../controllers/Workspace/workspaceController');
const express = require('express');
const router = express.Router();

// Route for creating a workspace
router.post('/', workspaceController.createWorkspace);
router.post('/add', workspaceController.addFilesToWorkspace);
router.post('/getall', workspaceController.getDocuments);
router.get('/', workspaceController.fetchWorkspaceNamesWithVisibility);

module.exports = router;
