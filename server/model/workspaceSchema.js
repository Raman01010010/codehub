const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    versions: [versionSchema],
    isPublic: {
        type: Boolean,
        default: false
    },
    allowedUserIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_w'
    }]
});



const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    files: [fileSchema],
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
    fileTree: folderSchema
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

module.exports = Workspace;