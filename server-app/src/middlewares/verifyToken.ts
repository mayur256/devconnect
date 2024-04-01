// Express lib
import { NextFunction, Request, Response } from 'express';
// Utils
import { STATUS } from '../utils/constant';
import { getAuthCookie, getInfoFromJWT } from '../utils/Common';

export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
    let authToken = getAuthCookie(req);
    console.log(authToken)
    if (!authToken) {
        authToken = req.headers?.['x-token'] as string ?? null;
    }

    const result = {
        status: STATUS.ERROR,
        data: 'Authentication Failed'
    };

    if (authToken) {
        try {
            // get decoded info from cookie
            const decoded = getInfoFromJWT(authToken);
            if (decoded?._id) {
                req.body.decoded = decoded;

                // We call next to pass execution to the subsequent middleware
                next();
                return;
            }
        } catch {
            // do nothing
        }
    } else {
        result.data = 'Authentication token is missing';
    }

    res.status(401).send(result);
};
