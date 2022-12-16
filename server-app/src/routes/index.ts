// Express Router
import type { Router } from 'express';

// Component routes
import userRoutes from './user';

// Miscellaneous
import miscellaneous from './miscellaneous';

export function assembleRoutes (router: Router) {
    userRoutes(router);
};

export function miscellaneousRoutes(router: Router) {
    miscellaneous(router);
}
