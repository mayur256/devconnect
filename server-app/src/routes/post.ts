// Express Router
import type { Router } from 'express';

// Middlewares
import { verifyToken } from '../middlewares/verifyToken';

// Controllers
import postController from '../controllers/post';

// Validation schemas
import { createPostSchema } from '../validation/schemas';

export default function (router: Router) {
    // protected routes
    router.post('/post', verifyToken, createPostSchema, postController.createPost);
};
