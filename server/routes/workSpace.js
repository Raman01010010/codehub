const workspaceController = require('../controllers/Workspace/workspaceController');
const express = require('express');
const router = express.Router();

// Route for creating a workspace
router.post('/', workspaceController.createWorkspace);
router.get('/', workspaceController.fetchWorkspaceNamesWithVisibility);

module.exports = router;
