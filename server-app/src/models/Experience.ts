import { Document, Schema, model, SchemaType } from 'mongoose';

const modelName = 'Experience';

// type definition for experience schema
interface IExperience extends Document {
    profile: SchemaType;
    title: string;
    company: string;
    location: string;
    from: Date;
    to: Date | null;
    current: boolean;
    description: string;
};

const experienceSchema = new Schema<IExperience>({
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        default: null
    },
    current: {
        type: Boolean,
        default: false
    },
});

export default model<IExperience>(modelName, experienceSchema);
