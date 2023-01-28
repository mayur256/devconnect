// JWT lib
import * as jwt from 'jsonwebtoken';
// Express lib
import { Request } from 'express';

import { ValidationErrorResult } from '../types/Common';

// Utils
import { FRONT_URL, SECRET } from './constant';

/**
 * Common utility functions that can be used throughout the application
 */

/**
 * @param {Array<ValidationErrorResult>} errorsArray
 * @returns {Array<{[k: string]: string}}>}
 * @description - Transforms express-validator error result for the response
 */
export function errorTranformation(errorsArray: Partial<ValidationErrorResult>[]): any[] {
    return errorsArray.reduce((acc: {[k: string]: string}[], curr: any) => {
        // eslint-disable-next-line no-prototype-builtins
        if (!acc.some((rule: any) => rule.hasOwnProperty(curr.param))) {
            acc.push({ [curr.param]: curr.msg });
        }
        return acc;
    }, []);
};

/**
 * @param {Request} req
 * @description - checks for authorization cookie and returns it, false otherwise
 */
export function getAuthCookie(req: Request): string | null {
    let result: any = null;
    const authCookie = req?.cookies?.authorization;
    if (authCookie) {
        result = authCookie;
    }

    return result
}
/**
 * @param {string} token
 * @description - Extracts information from JWT
 */
export function getInfoFromJWT(token: string): any {
    let result: any = null;
    if (token) {
        const options = {
            expiresIn: '364d',
            issuer: FRONT_URL
        };

        result = jwt.verify(token, SECRET, options);
    }

    return result;
};
