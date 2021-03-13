const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text:{
        type: String,
        required: true
    },
    name:{
        type: String
    },
    avatar:{
        type: String
    },
    likes:[
        {
            user:{
                type: Schema.Types.ObjectId
            },
            created_at:{
                type: Date,
                default: Date.now
            }
        }
    ],
    comments:[{
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        text:{
            type: String
        },
        name: {
            type: String
        },
        avatar:{
            type: String
        },
        created_at:{
            type: Date,
            default: Date.now
        }
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', PostSchema);
