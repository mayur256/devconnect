import { Document, Schema, model, SchemaType } from 'mongoose';

// models
import { experienceSchema } from './Experience';
import { educationSchema } from './Education';

const modelName = 'Profile';

interface Skills {
    id: string;
    alias: string;
}

// type definitions for Profile
interface IProfile extends Document{
    user: SchemaType;
    handle: string;
    company: string;
    website: string;
    location: string;
    status: string;
    skills: Array<Skills>;
    bio: string;
    gitHubUserName: string;
    experience: Array<typeof experienceSchema>;
    education: Array<typeof educationSchema>;
    created_at: Date;
    updated_at: Date | null;
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
    experience: [experienceSchema],
    education: [educationSchema],
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
