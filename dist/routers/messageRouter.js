"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiMethod_1 = require("./apiMethod");
const messageQueries_1 = require("../queries/messageQueries");
/**
 * Router for the '/message/ endpoint.
 * Accepts GET, POST and PUT.
 */
class MessageRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    // Define routing behavior, attach database queries
    init() {
        this.router.get('/');
        this.router.get('/:messageid', apiMethod_1.apiMethod(messageQueries_1.getMessageById));
    }
}
exports.MessageRouter = MessageRouter;
// Create the MessageRouter and export its configured Express.Router
const messageRouter = new MessageRouter();
messageRouter.init();
exports.default = messageRouter.router;
