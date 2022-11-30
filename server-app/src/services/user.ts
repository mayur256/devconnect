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
        // instantiate user model and save
        user = new User(userFields);
        await user.save();

        return user;
    }
};

export default new UserService();
