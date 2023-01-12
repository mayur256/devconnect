// Express lib
import { Response, Request } from 'express';
import type { Express } from 'express';
import { Types } from 'mongoose';

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

    /**
     * @param {Request} req
     * @param {Response} res
     * @desc - Updates a post with given post id in url params
     */
    public updatePost = async (req: Request, res: Response): Promise<void> => {
        // Reponse Object
        const response: { status: string, data: any } = {
            status: STATUS.SUCCESS,
            data: null
        };
        let httpStatus = STATUS_CODE.OK;
        const { postId } = req.params;

        try {
            // validate the request body and evaluate the result
            const validationError = validationResult(req);
            // proceed if there are no validation errors
            if (validationError.isEmpty()) {
                // Check whether post with given id exists or not
                if (postId && Types.ObjectId.isValid(postId) && this.postService.postExists(postId)) {
                    // attachments for the post
                    const attachments = (req.files as Array<Express.Multer.File>)?.map((file: Express.Multer.File): any => {
                        return file.filename;
                    });

                    const { decoded, ...rest } = req.body;
                    response.data = await this.postService.updatePost(postId, { user: decoded._id, attachments, ...rest });
                } else {
                    // error post with given id does not exists
                    response.status = STATUS.ERROR;
                    response.data = 'Post not found!';
                    httpStatus = STATUS_CODE.CLIENT_ERROR;
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
            console.log(`Error in Post->updatePost method :: ${e}`);
        }

        // send the response after all the processing is done
        res.status(httpStatus).json(response);
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @desc - based on presence of posId it return a post or array of post
     */
    public getPosts = async (req: Request, res: Response): Promise<void> => {
        // Reponse Object
        const response: { status: string, data: any } = {
            status: STATUS.SUCCESS,
            data: null
        };
        let httpStatus = STATUS_CODE.OK;

        try {
            const { postId = '' } = req.params

            if (postId && Types.ObjectId.isValid(postId)) {
                // get a post by id
                response.data = await this.postService.getPostById(postId);
            } else {
                // get all posts
                response.data = await this.postService.getAllPosts();
            }
        } catch (e) {
            response.status = STATUS.ERROR;
            response.data = null;
            httpStatus = STATUS_CODE.INTERNAL_SERVER_ERROR;
            console.log(`Error in Post->getPosts method :: ${e}`);
        }

        // send the response after all the processing is done
        res.status(httpStatus).json(response);
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @desc - based on presence of posId it return a post or array of post
     */
    public deletePost = async (req: Request, res: Response): Promise<void> => {
        // Reponse Object
        const response: { status: string, data: any } = {
            status: STATUS.SUCCESS,
            data: null
        };
        let httpStatus = STATUS_CODE.OK;

        try {
            const { postId = '' } = req.params

            if (postId && Types.ObjectId.isValid(postId) && this.postService.postExists(postId)) {
                // delete a post by its id and all the associated attachments
                await this.postService.deletePostById(postId);

                response.data = 'Post deleted successfully!';
            } else {
                // error post with given id does not exists
                response.status = STATUS.ERROR;
                response.data = 'Post not found!';
                httpStatus = STATUS_CODE.CLIENT_ERROR;
            }
        } catch (e) {
            response.status = STATUS.ERROR;
            response.data = null;
            httpStatus = STATUS_CODE.INTERNAL_SERVER_ERROR;
            console.log(`Error in Post->getPosts method :: ${e}`);
        }

        // send the response after all the processing is done
        res.status(httpStatus).json(response);
    }
};

export default new PostController(postServ);
