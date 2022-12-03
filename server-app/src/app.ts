// common package imports
import express, { Application, Router } from 'express';
import { createServer, Server } from 'http';
// import { ValidationError } from 'express-validation';

// Routes assembler
import assembleRoutes from './routes';

// Database connection handler
import dbHandler from './database';

// Application class
class App {
    private express: Application;
    private httpServer: Server | undefined;

    constructor() {
        this.express = express();
        // init HTTP server with app
        this.initHttpServer();
        this.parseRequestBody();
        // enable routing
        this.mountRoutes();
        // attach global request error handler
        // this.setGlobalValidationErrorHandler();
        // connect with database
        this.dbConnect();
    }

    initHttpServer(): void {
        this.httpServer = createServer(this.express);
    }

    getHttpServer(): Server | undefined {
        return this.httpServer;
    }

    mountRoutes(): void {
        const router = Router();
        assembleRoutes(router);
        this.express.use('/api/v1', router);
    }

    parseRequestBody(): void {
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(express.json());
    }

    dbConnect(): void {
        try {
            dbHandler.connect();
        } catch {
            dbHandler.disconnect();
        }
    }

    /* setGlobalValidationErrorHandler(): void {
        this.express.use((err: any, req: Request, res: Response, next: NextFunction) => {
            // handle validation error from express-validation libraary
            if (err instanceof ValidationError) {
                return res.status(err.statusCode).json(err.details);
            }
            return next(err);
        });
    } */
}

const app = new App();

export default app.getHttpServer();
