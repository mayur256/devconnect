// Express lib
import { Response, Request } from 'express';

// express-validator lib
import { validationResult } from 'express-validator';

// Services
import userServ from '../services/user';
// import { ValidationErrorResult } from '../types/Common';

// Utils
import { STATUS, STATUS_CODE } from '../utils/constant';
import { errorTranformation } from '../utils/Common';

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
        const response: { status: string, data: any } = {
            status: STATUS.SUCCESS,
            data: null
        };
        let httpStatus = STATUS_CODE.OK;

        try {
            // validate the request body and evaluate the result
            const validationError = validationResult(req);

            if (validationError.isEmpty()) {
                // Validation was successful
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
            } else {
                response.status = STATUS.ERROR;
                response.data = errorTranformation(validationError.array());
                httpStatus = STATUS_CODE.CLIENT_ERROR;
            }
        } catch (e) {
            response.status = STATUS.ERROR;
            response.data = null;
            httpStatus = STATUS_CODE.INTERNAL_SERVER_ERROR;
            console.log(`Error in User controller :: ${e}`);
        }

        // send the response after all the processing is done
        res.status(httpStatus).json(response);
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        // Reponse Object
        const response: { status: string, data: any } = {
            status: STATUS.SUCCESS,
            data: null
        };
        let httpStatus = STATUS_CODE.OK;

        try {
            // validate the request body and evaluate the result
            const validationError = validationResult(req);
            const { email = '', password = '' } = req.body;
            if (validationError.isEmpty()) {
                // Validation was successful
                const loginUser = await this.userService.attemptLogin(email, password);
                if (loginUser?._id) {
                    response.data = loginUser;
                } else {
                    response.status = STATUS.ERROR;
                    response.data = 'Invalid Credentials';
                }
            } else {
                response.status = STATUS.ERROR;
                response.data = errorTranformation(validationError.array());
                httpStatus = STATUS_CODE.CLIENT_ERROR;
            }
        } catch (e) {
            response.status = STATUS.ERROR;
            response.data = null;
            httpStatus = STATUS_CODE.INTERNAL_SERVER_ERROR;
            console.log(`Error in User controller :: ${e}`);
        }

        // send the response after all the processing is done
        res.status(httpStatus).json(response);
    }
};

export default new UserController(userServ);
