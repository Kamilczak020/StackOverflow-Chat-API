"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const messageRouter_1 = require("./routers/messageRouter");
const passport_1 = require("./authentication/passport");
// Creates and configures an ExpressJS web server.
class App {
    // Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(passport_1.passport.initialize());
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        this.express.use('/', router);
        this.express.use('/message', messageRouter_1.default);
    }
}
exports.default = new App().express;
