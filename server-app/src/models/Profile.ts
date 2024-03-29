import { Document, Schema, model, SchemaType } from 'mongoose';

// models
// import { experienceSchema } from './Experience';
// import { educationSchema } from './Education';

// types
import { IProfileGeneral } from '../types/User';

const modelName = 'Profile';

// type definitions for Profile
interface IProfile extends Document, IProfileGeneral{
    user: SchemaType;
};

const profileSchema = new Schema<IProfile>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [{
            id: String,
            alias: String
        }],
        required: true
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    bio: {
        type: String
    },
    gitHubUserName: {
        type: String
    },
    // experience: [experienceSchema],
    // education: [educationSchema],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: null
    }
});

export default model<IProfile>(modelName, profileSchema);
