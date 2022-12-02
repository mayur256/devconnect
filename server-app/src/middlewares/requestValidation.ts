// Express Router
// import { NextFunction, Request, Response } from 'express';

// express-validation
import { validate } from 'express-validation';

export function requestValidation(requestValidationSchema: any): any {
    return validate(requestValidationSchema, { keyByField: true }, { abortEarly: false });
};
