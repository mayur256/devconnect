// top level imports
// bcrypt for hashing
import * as bcrypt from 'bcryptjs';
// mongoose lib
import { Document, Schema, model, Model } from 'mongoose';
// types
import { IUser } from '../types/User';

const modelName = 'User';

interface UserSchema extends Document, IUser {
};

interface IUserMethods {
    makeHidden: (fieldKey: string) => any;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {
    generatePassword: (rawPassword: string) => string;
    validatePassword: (rawPassword: string, hashedPassword: string) => boolean;
}

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

    token: {
        type: String,
        default: null
    },

    is_verified: {
        type: Boolean,
        default: false
    },

    password: {
        type: String,
        required: true,
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

// Static methods on schema - starts

// generates hashed password
userSchema.statics.generatePassword = function (rawPassword: string): string {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, salt);
}

// validates hashed password
userSchema.statics.validatePassword = function (rawPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(rawPassword, hashedPassword);
}

// Static methods on schema - ends

// Instance methods - starts

/* userSchema.methods.makeHidden = function (fieldKey: string): any {
    const r = this.lean();
    delete r.password;
    return r;
} */

// Instance methods - ends

export default model<UserSchema, UserModel>(modelName, userSchema);
