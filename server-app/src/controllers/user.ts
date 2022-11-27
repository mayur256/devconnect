import { Response, Request } from 'express';

/**
 * Handles HTTP requests for user entities
 */
class UserController {
    public register(req: Request, res: Response): void {
        res.send('Here');
    }
};

export default new UserController();
