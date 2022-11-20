// common package imports
import express, { Application } from 'express';
import { createServer, Server } from 'http';

// Application class
class App {
    private express: Application;
    private httpServer: Server | undefined;

    constructor() {
        this.express = express();
        this.initHttpServer();
    }

    initHttpServer(): void {
        this.httpServer = createServer(this.express);
    }

    getHttpServer(): Server | undefined {
        return this.httpServer;
    }
}

const app = new App();

export default app.getHttpServer();
