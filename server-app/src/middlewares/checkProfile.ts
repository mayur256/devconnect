// Express lib
import { NextFunction, Request, Response } from 'express';

// Models
import Profile from '../models/Profile';

// Utils
import { STATUS } from '../utils/constant';

export const checkProfile = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const resBody = {
        status: STATUS.ERROR,
        data: 'Profile doesn\'t exists for this user'
    };

    try {
        // get user id extracted by verifyToken middleware
        const userId = req.body.decoded._id;
        const profile = await Profile.findOne({ user: userId });

        if (profile?._id) {
            next();
            return;
        }
    } catch (err: any) {
        // console.log(err);
    }

    res.status(403).json(resBody);
};
