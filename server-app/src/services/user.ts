// Models
import User from '../models/User';

// types
import { IUser } from '../types/User';

/**
 * Service container for user entity
 */
class UserService {
    userExists = async (email: string): Promise<boolean> => {
        let result = false;

        if (email) {
            result = Boolean(await User.findOne({ email }));
        }

        return result;
    }

    createUser = async (userFields: IUser): Promise<any> => {
        let user = null;
        try {
            user = new User(userFields);
            await user.save();
        } catch (e) {
            console.log(e);
        }

        return user;
    }
};

export default new UserService();
