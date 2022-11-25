import { Document, Schema, model, SchemaType } from 'mongoose';

const modelName = 'Education';

// type definition for experience schema
interface IEducation extends Document {
    profile: SchemaType;
    school: string;
    degree: string;
    field: string;
    from: Date;
    to: Date | null;
    current: boolean;
    description: string;
};

const educationSchema = new Schema<IEducation>({
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
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
