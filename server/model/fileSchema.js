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
        required: true,
        //unique: true
    },
    workpaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace1',
        required: true
    },
    
    path:{
        type:String,
        required:true
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


const File = mongoose.model('File', fileSchema);

module.exports = File;
