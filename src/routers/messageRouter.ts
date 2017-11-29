import { Router, Request, Response, NextFunction } from 'express';
import { apiMethod } from './apiMethod';
import { getMessageById } from '../queries/messageQueries';

/**
 * Router for the '/message/ endpoint.
 * Accepts GET, POST and PUT.
 */
export class MessageRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    // Define routing behavior, attach database queries
    public init() {
        this.router.get('/');
        this.router.get('/:messageid', apiMethod(getMessageById));
    }
}

// Create the MessageRouter and export its configured Express.Router
const messageRouter  = new MessageRouter();
messageRouter.init();

export default messageRouter.router;
