// Express Router
import type { Router } from 'express';

// Middlewares
import { verifyToken } from '../middlewares/verifyToken';

// Controllers
import userController from '../controllers/user';

// Validation schemas
import { userLoginSchema, userRegisterSchema } from '../validation/schemas';

export default function (router: Router) {
    // public routes
    router.post('/user/register', userRegisterSchema, userController.register);
    router.post('/user/login', userLoginSchema, userController.login);

    // protected routes
    router.get('/test', verifyToken, function (req: any, res: any) {
        res.send('Im in');
    })
};
