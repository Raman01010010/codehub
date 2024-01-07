const workspaceSchema=require('../../model/workspaceSchema');


// Create a new workspace
const createWorkspace = async (req, res) => {
    try {
        const { name, user } = req.body;

        // Your code to create a workspace goes here
        const workspace = await workspaceSchema.create({ name,userId: user });

        res.status(200).json({ message: 'Workspace created successfully', workspace });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to create workspace' });
    }
};

// Fetch workspace names with visibility
const fetchWorkspaceNamesWithVisibility = async (req, res) => {
    try {
        console.log(req.userid)
        const workspaces = await workspaceSchema.find({userid:req.userid}, { name: 1, _id: 1})
        console.log(workspaces)
        res.status(200).json({ message: 'Workspace names with visibility fetched successfully', workspaces });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workspace names with visibility' });
    }
};



// Add files to a workspace
const addFilesToWorkspace = async (req, res) => {
    try {
        // Your code to add files to a workspace goes here
        // ...
        res.status(200).json({ message: 'Files added to workspace successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add files to workspace' });
    }
};

// Modify a file in a workspace
const modifyFile = async (req, res) => {
    try {
        // Your code to modify a file in a workspace goes here
        // ...
        res.status(200).json({ message: 'File modified successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to modify file' });
    }
};

module.exports = {
    createWorkspace,
    addFilesToWorkspace,
    modifyFile,
    fetchWorkspaceNamesWithVisibility
};
