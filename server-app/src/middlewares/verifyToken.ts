// JWT lib
import * as jwt from 'jsonwebtoken';
// Express lib
import { NextFunction, Request, Response } from 'express';
// Utils
import { FRONT_URL, SECRET, STATUS } from '../utils/constant';

export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
    const authHeader = req.cookies.authorization;
    let result: any = null;

    if (authHeader) {
        const token = authHeader;
        const options = {
            expiresIn: '364d',
            issuer: FRONT_URL
        };

        try {
            // verify makes sure that the token hasn't expired and has been issued by us
            // and is infact correct
            result = jwt.verify(token, SECRET, options);

            // Let's pass back the decoded token to the request object
            req.body.decoded = result;

            // We call next to pass execution to the subsequent middleware
            next();
        } catch (err) {
            result = {
                status: STATUS.ERROR,
                data: 'Authentication Failed'
            }
            res.status(401).send(result);
        }
    } else {
        res.json({
            status: 401,
            error: 'Authentication token is missing'
        });
    }
};
