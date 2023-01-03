// Express Router
import type { Router } from 'express';

// Component routes
import userRoutes from './user';
import postRoutes from './post';

// Miscellaneous
import miscellaneous from './miscellaneous';

export function assembleRoutes (router: Router) {
    userRoutes(router);
    postRoutes(router);
};

export function miscellaneousRoutes(router: Router) {
    miscellaneous(router);
}
