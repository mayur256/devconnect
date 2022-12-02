// Express-validation library
import { Joi } from 'express-validation';

/**
 * A file containing request validation schemas
 */
export const userRegisterSchema = {
    body: Joi.object({
        name: Joi.string().required().messages({ 'any.only': 'Name is required' }),
        email: Joi.string()
            .required()
            .regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
            .messages({ 'any.only': 'Invalid email' }),
        password: Joi.string().required().messages({ 'any.only': 'Password is required' })
    })
};
