import { ValidationErrorResult } from '../types/Common';

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
