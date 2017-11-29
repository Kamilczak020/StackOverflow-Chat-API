import * as promise from 'bluebird';
import * as pgPromise from 'pg-promise';
import * as moment from 'moment';
import { to } from '../utility/promiseHelper';
import { Request } from 'express';
import { database as db, pgpromise as pgp } from './dbContext';
import { NotFoundError, DatabaseError, InvalidQueryError } from '../errors';

/**
 * Given the request object, tries to extract messageid parameter from it.
 * On valid messageid, calls the database and tries to retrieve a message of a given id.
 * 
 * On invalid parameter (not a number, missing parameter...) throws 400 Bad Request.
 * On database error, throws 500 Internal server error.
 * If no messages are found, throws a 404 not found.
 * 
 * @param req API Request object
 */
export async function getMessageById(req: Request) {
    const messageId = parseInt(req.params.messageid, 10);

    if (isNaN(messageId)) {
        throw new InvalidQueryError('Given message id is not a number.');
    }

    const [err, data] = await to(db.oneOrNone('SELECT * FROM messages WHERE message_id = $1', [messageId]));

    if (err) {
        throw new DatabaseError(err.message);
    }
    if (data === null) {
        throw new NotFoundError(`No message of id: ${messageId} was found.`);
    }

    return {
        status: 'success',
        data: data,
        message: `Retreived message of ID: ${messageId}`,
    };
}
