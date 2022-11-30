// Models
import User from '../models/User';

// types
import { IUser } from '../types/User';

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
        user = new User(userFields);
        await user.save();

        return user;
    }
};

export default new UserService();
