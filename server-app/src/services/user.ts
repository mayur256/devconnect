// common npm packages
import * as jwt from 'jsonwebtoken';
// Models
import User from '../models/User';
// Mail
import appMailer from '../email';
// types
import { IUser } from '../types/User';

// Utils
import { FRONT_URL, SECRET } from '../utils/constant';

/**
 * Service container for user entity
 */
class UserService {
    /**
     * @param {string} email
     * @returns {boolean}
     * @desc check whether a user with given email exists
     */
    userExists = async (email: string): Promise<boolean> => {
        let result = false;

        if (email) {
            result = Boolean(await User.findOne({ email }));
        }

        return result;
    }

    /**
     * @param {IUser} userFields
     * @returns {Promise<any>}
     * @desc - creates a user with user fields provided in the request body
     */
    createUser = async (userFields: IUser): Promise<any> => {
        let user = null;
        // instantiate user model and save
        userFields.password = User.generatePassword(userFields.password);
        user = new User(userFields);
        await user.save();

        await this.sendInvitationMail(userFields.email);
        return user;
    }

    /**
     * @param {string} toEmail
     * @returns {boolean}
     * @desc - Sends a mail and returns boolean value depicting whether mail is sent
     */
    sendInvitationMail = async (toEmail: string): Promise<boolean> => {
        return await appMailer.sendEmail({ to: toEmail });
    }

    /**
     * @param {string} email
     * @param {string} password
     * @returns {any} matched user
     * @desc -  matches user with given credentials or null
     */
    attemptLogin = async (email: string, password: string): Promise<any> => {
        const user = await User.findOne({ email }).lean();
        if (user && User.validatePassword(password, user?.password)) {
            const { password, ...rest } = user;
            return rest;
        }
        return user;
    }

    /**
     * @param { _id: string } payload
     * @returns - JWT signed token
     */
    generateToken = (payload: {_id: string}) => {
        const options = {
            expiresIn: '364d',
            issuer: FRONT_URL
        }
        return jwt.sign(payload, SECRET, options);
    }
};

export default new UserService();
