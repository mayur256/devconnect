// common package imports
import path from 'node:path';
import express, { Application, Router } from 'express';
import { createServer, Server } from 'http';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Swagger doc specification
import * as swaggerDoc from './swagger.json';

// import { ValidationError } from 'express-validation';

// Routes assembler
import { assembleRoutes, miscellaneousRoutes } from './routes';

// Database connection handler
import dbHandler from './database';

// Application class
class App {
    private expressApp: Application;
    private httpServer: Server | undefined;

    constructor() {
        this.expressApp = express();
        // init HTTP server with app
        this.initHttpServer();
        this.parseRequestBody();
        this.parseCookies();
        this.enableCors();
        // enable routing
        this.mountRoutes();
        // attach global request error handler
        // this.setGlobalValidationErrorHandler();
        // connect with database
        this.dbConnect();
        this.initSwagger();
        this.servePublicAssets();
    }

    initHttpServer(): void {
        this.httpServer = createServer(this.expressApp);
    }

    getHttpServer(): Server | undefined {
        return this.httpServer;
    }

    mountRoutes(): void {
        const router = Router();
        assembleRoutes(router);
        miscellaneousRoutes(router);
        this.expressApp.use('/', router); // common public routes
        this.expressApp.use('/api/v1', router); // api routes
    }

    parseRequestBody(): void {
        this.expressApp.use(express.urlencoded({ extended: true }));
        this.expressApp.use(express.json());
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

    initSwagger(): void {
        this.expressApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    }

    enableCors() {
        const corsOptions = {
            origin: '*',
        };

        this.expressApp.use(cors(corsOptions));
    }

    // use cookie parser middleware for express
    parseCookies = (): void => {
        this.expressApp.use(cookieParser());
    }

    // server static assets
    servePublicAssets(): void {
        this.expressApp.use(express.static(path.resolve(__dirname, '../public')));
    }
}

const app = new App();

export default app.getHttpServer();
