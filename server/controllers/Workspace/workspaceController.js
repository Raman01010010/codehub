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
        const workspaces = await workspaceSchema.find({userId:req.userid}, { name: 1, _id: 1})
        console.log(workspaces)
        res.status(200).json({ message: 'Workspace names with visibility fetched successfully', workspaces });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workspace names with visibility' });
    }
};



// Add files to a workspace
const addFilesToWorkspace =  async (req, res) => {
    try {
        const workspaceId = req.body.Id;
        const itemPath = req.body.itemPath;
        const isFile = true; // req.body.isFile || false;
    
        // Validate input
        if (!workspaceId || !itemPath) {
            return res.status(400).json({ error: 'Invalid input' });
        }
    
        // Find the workspace
        const workspace = await workspaceSchema.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ error: 'Workspace not found' });
        }
    
        const itemNames = itemPath.split('/').filter(name => name !== ''); // Split path and filter out empty strings
    
        // Traverse the file tree to find the location to insert the file or folder
        let currentFolder = workspace.fileTree;
        for (const itemName of itemNames.slice(0, -1)) {
            if (!currentFolder) {
                currentFolder = { folders: [] };
            }
    
            const folder = currentFolder?.folders.find(f => f.name === itemName);
            if (!folder) {
                const newFolder = { name: itemName, files: [], folders: [] };
                currentFolder.folders.push(newFolder);
                currentFolder = newFolder;
            } else {
                currentFolder = folder;
            }
        }
    
        // Check if the file or folder already exists
        const itemName = itemNames[itemNames.length - 1];
        const existingItem = currentFolder.files.find(file => file.name === itemName) || currentFolder.folders.find(folder => folder.name === itemName);
    
        if (existingItem) {
            return res.status(400).json({ error: `Item '${itemName}' already exists in the specified folder.` });
        }
    
        // Insert the file or folder
        const newItem = isFile ? { name: itemName, versions: [] } : { name: itemName, files: [], folders: [] };
        currentFolder[isFile ? 'files' : 'folders'].push(newItem);
    
        // Save the updated workspace
        await workspace.save();
    
        res.status(200).json({ message: `Item '${itemPath}' has been successfully added to the workspace.` });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
    
}

// Get all documents with given user ID and workspace ID
const getDocuments = async (req, res) => {
    try {
        console.log("i am her")
        const userId = req.userid;
        const workspaceId = req.body.id;
console.log(userId,workspaceId)
        // Validate input
        if (!userId || !workspaceId) {
            return res.status(400).json({ error: 'Invalid input' });
        }
    

        // Find the workspace
        const workspace = await workspaceSchema.find({_id:workspaceId,userId:userId});
        if (!workspace) {
            return res.status(404).json({ error: 'Workspace not found' });
        }

        // Find the user's documents in the workspace
       // const documents = workspace.fileTree.files.filter(file => file.userId === userId);

        // Remove the content field from each document
        //const documentsWithoutContent = documents.map(({ content, ...rest }) => rest);
console.log(workspace)
        res.status(200).json(workspace);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
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
    fetchWorkspaceNamesWithVisibility,
    getDocuments
};