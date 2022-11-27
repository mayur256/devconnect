// Express Router
import type { Router } from 'express';

// Component routes
import userRoutes from './user';

export default function (router: Router) {
    userRoutes(router);
};
