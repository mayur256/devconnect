// Express Router
import type { Router } from 'express';

// Component routes
import userRoutes from './user';

export function assembleRoutes (router: Router) {
    userRoutes(router);
};
