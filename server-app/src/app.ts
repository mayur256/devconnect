// common package imports
import express, { Application, Router } from 'express';
import { createServer, Server } from 'http';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors'

// Swagger doc specification
import * as swaggerDoc from './swagger.json';

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
        this.enableCors();
        // attach global request error handler
        // this.setGlobalValidationErrorHandler();
        // connect with database
        this.dbConnect();
        this.initSwagger();
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

    initSwagger(): void {
        this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    }

    enableCors() {
        const corsOptions = {
            origin: 'http://localhost:4001',
        };

        this.express.use(cors(corsOptions));
    }
}

const app = new App();

export default app.getHttpServer();
