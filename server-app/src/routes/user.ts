// Express Router
import type { Router } from 'express';

// Middlewares
import { verifyToken } from '../middlewares/verifyToken';

// Controllers
import userController from '../controllers/user';

// Validation schemas
import { userLoginSchema, userRegisterSchema, generalProfileSchema } from '../validation/schemas';

export default function (router: Router) {
    // public routes
    router.post('/user/register', userRegisterSchema, userController.register);
    router.post('/user/login', userLoginSchema, userController.login);
    router.get('/user', userController.getUserInfo);

    // protected routes
    router.post('/user/profile/general', verifyToken, generalProfileSchema, userController.updateProfileGeneral);
    router.delete('/user/delete', verifyToken, userController.deleteUser);
    router.put('/user/logout', verifyToken, userController.logoutUser);
};
