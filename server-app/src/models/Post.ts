// top level imports
// mongoose lib
import { Document, Schema, model, SchemaType } from 'mongoose';

// types
import { IPost } from '../types/Post';

// the name through which the application accesses post entity
const modelName = 'Post';

// type definitions
interface IPostSchema extends Document, IPost {
    user: SchemaType;
}

// Schema that represents the structure and functionality of the system
const postSchema = new Schema<IPostSchema>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    visibility: {
        type: String,
        enum: ['public', 'private']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: null
    }
});

export default model<IPostSchema>(modelName, postSchema);
