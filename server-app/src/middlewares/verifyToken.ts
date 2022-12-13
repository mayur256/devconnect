// Express-JWT middleware
import { expressjwt } from 'express-jwt';
// Utils
import { SECRET } from '../utils/constant';

export const verifyToken = (): any => {
    return expressjwt({
        secret: SECRET,
        algorithms: ['HS256']
    });
};
