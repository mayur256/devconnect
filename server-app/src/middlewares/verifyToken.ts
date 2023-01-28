// Express lib
import { NextFunction, Request, Response } from 'express';
// Utils
import { STATUS } from '../utils/constant';
import { getAuthCookie, getInfoFromJWT } from '../utils/Common';

export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
    const authCookie = getAuthCookie(req);
    const result = {
        status: STATUS.ERROR,
        data: 'Authentication Failed'
    };

    if (authCookie) {
        try {
            // get decoded info from cookie
            const decoded = getInfoFromJWT(authCookie);
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
