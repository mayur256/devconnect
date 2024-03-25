// Express lib
import { Response, Request } from 'express';

// Mongoose
import { Types } from 'mongoose';

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
                    response.data = await this.userService.createUser(req.body);
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

    /**
     * @param {Request} req
     * @param {Response} res
     * @desc - Attempts a user login with credentials in request
     */
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
                    const payload = {
                        _id: loginUser._id
                    }
                    const tokenExpiryDuration = '364d';
                    const token = this.userService.generateToken(payload, tokenExpiryDuration);
                    res.setHeader('set-cookie', `authorization=${token}; HttpOnly; path=/`); // instrument to share token with browsers
                    res.setHeader('X-TOKEN', token); // instrument to share token with non-browser clients
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

    /**
     * @param {Request} req
     * @param {Response} res
     * @desc - Verifies an user account
     */
    public verifyAccount = async (req: Request, res: Response): Promise<void> => {
        const { token = '' } = req.query;

        // Reponse Object
        let responseDoc = '<h1>Account is verified!</h1>';
        let httpStatus = STATUS_CODE.OK;

        try {
            if (token) {
                // token is present. validate it
                const result = await this.userService.verifyAccount(token);
                if (result instanceof Error) throw result;
            } else {
                responseDoc = '<h2>Token is missing!</h2>';
                httpStatus = STATUS_CODE.CLIENT_ERROR;
            }
        } catch (ex: any) {
            httpStatus = STATUS_CODE.INTERNAL_SERVER_ERROR;
            responseDoc = `<h2>${ex}</h2>`
        }

        res.setHeader('Content-Type', 'text/html');
        res.status(httpStatus).send(responseDoc);
    }

    /**
    * @param {Request} req
    * @param {Response} res
    * @desc - updates general profile section
    */
    public updateProfileGeneral = async (req: Request, res: Response): Promise<void> => {
        // Reponse Object
        const response: { status: string, data: any } = {
            status: STATUS.SUCCESS,
            data: 'Profile saved successfully!'
        };
        let httpStatus = STATUS_CODE.OK;

        try {
            // validate the request body and evaluate the result
            const validationError = validationResult(req);
            if (validationError.isEmpty()) {
                const { decoded, ...rest } = req.body;
                await this.userService.updateProfileGeneral({ user: decoded._id, ...rest });
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

    /**
    * @param {Request} req
    * @param {Response} res
    * @desc - deletes an user
    */
    public deleteUser = async (req: Request, res: Response): Promise<void> => {
        // Reponse Object
        const response: { status: string, data: any } = {
            status: STATUS.SUCCESS,
            data: 'User deleted successfully!'
        };
        let httpStatus = STATUS_CODE.OK;

        try {
            const { decoded } = req.body;
            const userId = decoded?._id;
            if (Types.ObjectId.isValid(userId)) {
                await this.userService.deleteUserById(userId);
            } else {
                response.status = STATUS.ERROR;
                response.data = 'User not found!';
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

    /**
    * @param {Request} req
    * @param {Response} res
    * @desc - logs out an user
    */
    public logoutUser = async (req: Request, res: Response): Promise<void> => {
        // Reponse Object
        const response: { status: string, data: any } = {
            status: STATUS.SUCCESS,
            data: 'User logged out successfully!'
        };
        let httpStatus = STATUS_CODE.OK;

        try {
            const { decoded } = req.body;
            const userId = decoded?._id;

            if (Types.ObjectId.isValid(userId) && this.userService.userExistsById(userId)) {
                res.setHeader('set-cookie', `authorization=; max-age=0}`);
            } else {
                response.status = STATUS.ERROR;
                response.data = 'User not found!';
                httpStatus = STATUS_CODE.CLIENT_ERROR;
            }
        } catch (e: any) {
            response.status = STATUS.ERROR;
            response.data = null;
            httpStatus = STATUS_CODE.INTERNAL_SERVER_ERROR;
            console.log(`Error in User controller :: ${e}`);
        }

        // send the response after all the processing is done
        res.status(httpStatus).json(response);
    }

    /**
    * @param {Request} req
    * @param {Response} res
    * @desc - get user info based on auth token or passed user id
    */
    public getUserInfo = async (req: Request, res: Response): Promise<void> => {
        // Reponse Object
        const response: { status: string, data: any } = {
            status: STATUS.SUCCESS,
            data: null
        };
        let httpStatus = STATUS_CODE.OK;

        try {
            const userId = req.query.userId as string;

            if (Types.ObjectId.isValid(userId) && this.userService.userExistsById(userId)) {
                const user = await this.userService.getUserById(userId);
                const { password, token, __v, ...rest } = user.toObject();
                response.data = rest;
            }
        } catch (e: any) {
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
