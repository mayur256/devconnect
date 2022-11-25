import { Document, Schema, model } from 'mongoose';

const modelName = 'Education';

// type definition for experience schema
interface IEducation extends Document {
    school: string;
    degree: string;
    field: string;
    from: Date;
    to: Date | null;
    current: boolean;
    description: string;
};

export const educationSchema = new Schema<IEducation>({
    school: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    field: {
        type: String,
        required: true
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
    description: {
        type: String
    }
});

export default model<IEducation>(modelName, educationSchema);
