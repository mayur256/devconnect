// Express lib
import { Response, Request } from 'express';

// Services
import userServ from '../services/user';

// Utils
import { STATUS, STATUS_CODE } from '../utils/constant';

/**
 * Handles HTTP requests for user entities
 */
class UserController {
    // Data members
    private userService;

    constructor(userService: any) {
        this.userService = userService;
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @desc Registers a new account
     */
    public register = async (req: Request, res: Response): Promise<void> => {
        // Reponse Object
        const response: {status: string, data: any} = {
            status: STATUS.SUCCESS,
            data: null
        };
        let httpStatus = STATUS_CODE.OK;

        try {
            // Check if user already exists with same email
            const doesUserExists = await this.userService.userExists(req.body.email);
            if (doesUserExists) {
                response.status = STATUS.ERROR;
                response.data = 'User already exists';
                httpStatus = STATUS_CODE.CLIENT_ERROR;
            } else {
                // create a user if it does not already exists
                response.data = this.userService.createUser(req.body);
            }
        } catch (e) {
            response.status = STATUS.ERROR;
            response.data = null;
            httpStatus = STATUS_CODE.INTERNAL_SERVER_ERROR;
            console.log(`Error in User controller :: ${e}`);
        }

        res.status(httpStatus).json(response);
    }
};

export default new UserController(userServ);
