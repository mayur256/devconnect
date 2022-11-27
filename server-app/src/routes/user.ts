// Express Router
import type { Router } from 'express';

// controllers
import userController from '../controllers/user';

export default function (router: Router) {
    router.post('/user/register', userController.register);
};
