// Express lib
import { Response, Request } from 'express';
import type { Express } from 'express';

// express-validator lib
import { validationResult } from 'express-validator';

// Services
import postServ from '../services/post';

// Utils
import { STATUS, STATUS_CODE } from '../utils/constant';
import { errorTranformation } from '../utils/Common';

class PostController {
    // Data members
    private postService;

    // Dependency injection in constructor
    constructor(postService: any) {
        this.postService = postService;
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @desc - Creates a new post
     */
    public createPost = async (req: Request, res: Response): Promise<void> => {
        // Reponse Object
        const response: { status: string, data: any } = {
            status: STATUS.SUCCESS,
            data: null
        };
        let httpStatus = STATUS_CODE.OK;
        try {
            // validate the request body and evaluate the result
            const validationError = validationResult(req);
            // proceed if there are no validation errors
            if (validationError.isEmpty()) {
                // attachments for the post
                const attachments = (req.files as Array<Express.Multer.File>)?.map((file: Express.Multer.File): any => {
                    return file.filename;
                });
                const { decoded, ...rest } = req.body;
                response.data = await this.postService.createPost({ user: decoded._id, attachments, ...rest });
            } else {
                response.status = STATUS.ERROR;
                response.data = errorTranformation(validationError.array());
                httpStatus = STATUS_CODE.CLIENT_ERROR;
            }
        } catch (e) {
            response.status = STATUS.ERROR;
            response.data = null;
            httpStatus = STATUS_CODE.INTERNAL_SERVER_ERROR;
            console.log(`Error in Post->createPost method :: ${e}`);
        }

        // send the response after all the processing is done
        res.status(httpStatus).json(response);
    }
};

export default new PostController(postServ);
