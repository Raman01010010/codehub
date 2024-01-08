const workspaceSchema=require('../../model/workspaceSchema');
const File=require('../../model/fileSchema')

// Create a new workspace
const createWorkspace = async (req, res) => {
    try {
        const { name, user } = req.body;

        // Your code to create a workspace goes here
        const workspace = await workspaceSchema.create({ name,userId: user })

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
        
        console.log(workspaces[0].fileTree)
        res.status(200).json({ message: 'Workspace names with visibility fetched successfully', workspaces });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workspace names with visibility' });
    }
};



// Add files to a workspace
const addFilesToWorkspace =  async (req, res) => {
    try {
        const workspaceId = req.body.Id;
        console.log(workspaceId,'nn')
        const itemPath = req.body.itemPath;
        const isFile = true; // req.body.isFile || false;
    const r2=await File.find({path:itemPath,workpaceId:workspaceId})
    if(r2.length>0){
        return res.status(400).json({ error: `Item '${itemPath}' already exists in the specified folder.` });
    }
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
    console.log(itemNames)
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
        console.log(itemPath)
        console.log(itemName)
        const newItem = isFile ? new File({ name: itemName, versions: [],path:itemPath,workpaceId:workspaceId }) : { path:itemPath,name: itemName, files: [], folders: [] };
       console.log(newItem)
      await newItem.save()
        currentFolder[isFile ? 'files' : 'folders'].push(newItem._id);
    console.log(currentFolder)
        // Save the updated workspace
        await workspace.save();
    
        res.status(200).json({ message: `Item '${itemPath}' has been successfully added to the workspace.` });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
    
}

const populateNested = async (folder) => {
    await workspaceSchema.populate(folder, {
        path: 'folders.files',
        model: 'File'
      });
    for (const subfolder of folder.folders) {
      await populateNested(subfolder);
    }
  
    return folder;
  };
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
        const workspace = await workspaceSchema.find({_id:workspaceId,userId:userId}).populate('fileTree.files');;
        if (!workspace) {
            return res.status(404).json({ error: 'Workspace not found' });
        }

        // Find the user's documents in the workspace
       // const documents = workspace.fileTree.files.filter(file => file.userId === userId);

        // Remove the content field from each document
        //const documentsWithoutContent = documents.map(({ content, ...rest }) => rest);
console.log(workspace[0].fileTree.files)
const populatedWorkspace = await populateNested(workspace[0].fileTree);
console.log(populatedWorkspace)
workspace[0].fileTree=populatedWorkspace
        res.status(200).json(workspace);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const fetchFile=async(req,res)=>{
const path=req.body.path
console.log(path)
const userid=req.userid
const id=req.body.id

try{
    const r=await workspaceSchema.find({_id:id,userId:userid})
    console.log(r)

}catch(error){
    console.log(error)
}
}

// Modify a file in a workspace
const modifyFile = async (req, res) => {
    const workspaceId = req.body.id;
        const itemPath = req.body.path;
       const content=req.body.content // req.body.isFile || false;
    
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
    if(!existingItem){
        res.status(400).json({ message: 'File modified successfully' });
    }
        if (existingItem) {
            console.log(existingItem.versions)
            existingItem.versions.push({content:content,createdAt:Date.now()})
            await workspace.save();
            return res.status(200).json( `Item  already exists in the specified folder.` );
        }
    

       
   
};

module.exports = {
    createWorkspace,
    addFilesToWorkspace,
    modifyFile,
    fetchWorkspaceNamesWithVisibility,
    getDocuments,
    fetchFile
};