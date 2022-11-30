// mongoose lib
import { Document, Schema, model } from 'mongoose';
// types
import { IUser } from '../types/User';

const modelName = 'User';

interface UserSchema extends Document, IUser {};

// User schema definition
const userSchema = new Schema<UserSchema>({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true
    },

    online: {
        type: Boolean,
        default: false
    },

    avatar: {
        type: String,
        default: null
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
        default: null
    },

    deleted_at: {
        type: Date,
        default: null
    }
});

export default model<UserSchema>(modelName, userSchema);
