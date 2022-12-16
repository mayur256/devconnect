// Express Router
import type { Router } from 'express';

// Controllers
import userController from '../controllers/user';

export default function (router: Router) {
    router.get('/verify-account', userController.verifyAccount)
};
