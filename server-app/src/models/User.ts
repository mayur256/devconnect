import { Document, Schema, model } from 'mongoose';

const modelName = 'User';

// type definition for User model fields
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    online: boolean;
    avatar: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};

// User schema definition
const userSchema = new Schema<IUser>({
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

export default model<IUser>(modelName, userSchema);
