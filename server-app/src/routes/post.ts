// Express Router
import type { Router } from 'express';

// Middlewares
import { verifyToken } from '../middlewares/verifyToken';
import { fileUpload } from '../middlewares/fileUpload';

// Controllers
import postController from '../controllers/post';

// Validation schemas
import { createPostSchema } from '../validation/schemas';

export default function (router: Router) {
    // protected routes
    router.post(
        '/post',
        fileUpload.array('attachments', 10),
        verifyToken,
        createPostSchema,
        postController.createPost
    );
    router.put(
        '/post/:postId',
        fileUpload.array('attachments', 10),
        verifyToken,
        createPostSchema,
        postController.updatePost
    );
    router.get('/post/:postId?', postController.getPosts)
};
