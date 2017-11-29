import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import MessageRouter from './routers/messageRouter';
import { passport } from './authentication/passport';

// Creates and configures an ExpressJS web server.
class App {
    
    // ref to Express instance
    public express: express.Application;

    // Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(passport.initialize());
    }

    // Configure API endpoints.
    private routes(): void {
    let router = express.Router();
        this.express.use('/', router);
        this.express.use('/message', MessageRouter);
    }
}

export default new App().express;
