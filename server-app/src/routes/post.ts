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
    router.post('/post', verifyToken, fileUpload.array('attachments', 10), createPostSchema, postController.createPost);
};
