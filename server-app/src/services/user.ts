// common npm packages
import * as jwt from 'jsonwebtoken';
// Models
import User from '../models/User';
// Mail
import appMailer from '../email';
// types
import { IUser } from '../types/User';

// Utils
import { FRONT_URL, HOST, NODE_ENV, PORT, SECRET } from '../utils/constant';
import { IMailBody } from '../types/Common';

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

        await this.sendInvitationMail(userFields.email, userFields.name, user?._id?.toString());
        return user;
    }

    /**
     * @param {string} toEmail
     * @returns {boolean}
     * @desc - Sends a mail and returns boolean value depicting whether mail is sent
     */
    sendInvitationMail = async (toEmail: string, name: string, userId: string): Promise<boolean> => {
        const token = this.generateToken({ _id: userId }, '7d');
        const hostUrl = (NODE_ENV === 'development' ? 'http' : 'https') + '://' + HOST + (PORT ? ':' + PORT : '');
        const verificationLink = `${hostUrl}/verify-account?token=${token}`;
        const mailBodyKeys: Partial<IMailBody> = {
            subject: 'Please verify your devconnect account',
            body: `
                <h2>Account verification!</h2>
                <p>Hello, <strong>${name}!</strong></p>
                <a href="${verificationLink}">Click here to verify your account</a>
                <br /><br />
                <em>The above link is only valid for 7 days</em>
                <br />
                <p>
                    Thanks, <br />
                    <strong>Devconnect<sup>TM<sup></strong>
                </p>

            `,
        }
        // set the token for user in db
        await User.findOneAndUpdate({ _id: userId }, { token });

        return await appMailer.sendEmail({ to: toEmail, mailBodyKeys });
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
    generateToken = (payload: {_id: string}, expiresIn: string) => {
        const options = {
            expiresIn,
            issuer: FRONT_URL
        }
        return jwt.sign(payload, SECRET, options);
    }
};

export default new UserService();
