const mongoose = require('mongoose');




const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true
    },
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    }],
    folders: [this]
});

const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_w',
        required: true
    },
    fileTree: {
        type: folderSchema,
        default: { name: "root", files: [], folders: [] }
    }
});

const Workspace = mongoose.model('Workspace1', workspaceSchema);

module.exports = Workspace;
