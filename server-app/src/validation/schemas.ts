// Express-validation library
import { check } from 'express-validator';

/**
 * A file containing request validation schemas
 */
export const userRegisterSchema = [
    check('name').notEmpty().withMessage('Name is required!'),
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email'),
    check('password')
        .notEmpty().withMessage('Password is required')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        }).withMessage('Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number')
];
