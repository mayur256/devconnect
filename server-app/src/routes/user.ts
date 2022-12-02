// Express Router
import type { Router } from 'express';

// Middlewares
import { requestValidation } from '../middlewares/requestValidation';

// Controllers
import userController from '../controllers/user';

// Validation schemas
import { userRegisterSchema } from '../validation/schemas';

export default function (router: Router) {
    router.post('/user/register', requestValidation(userRegisterSchema), userController.register);
};
