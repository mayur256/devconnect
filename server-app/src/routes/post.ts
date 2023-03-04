// Express Router
import type { Router } from 'express';

// Middlewares
import { verifyToken } from '../middlewares/verifyToken';
import { fileUpload } from '../middlewares/fileUpload';
import { checkProfile } from '../middlewares/checkProfile';

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
        checkProfile,
        createPostSchema,
        postController.createPost
    );
    router.put(
        '/post/:postId',
        verifyToken,
        checkProfile,
        createPostSchema,
        postController.updatePost
    );
    router.get('/post/:postId?', postController.getPosts);
    router.delete('/post/:postId', verifyToken, checkProfile, postController.deletePost);

    // handles attachments of posts
    router.route('/post/:postId/attachment/:attachId?')
        .post(fileUpload.array('attachments', 10), verifyToken, checkProfile, postController.addAttachments)
        .delete(verifyToken, checkProfile, postController.removeAttachment);
};
