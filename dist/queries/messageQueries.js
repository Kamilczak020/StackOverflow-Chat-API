"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const promiseHelper_1 = require("../utility/promiseHelper");
const dbContext_1 = require("./dbContext");
const errors_1 = require("../errors");
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
function getMessageById(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const messageId = parseInt(req.params.messageid, 10);
        if (isNaN(messageId)) {
            throw new errors_1.InvalidQueryError('Given message id is not a number.');
        }
        const [err, data] = yield promiseHelper_1.to(dbContext_1.database.oneOrNone('SELECT * FROM messages WHERE message_id = $1', [messageId]));
        if (err) {
            throw new errors_1.DatabaseError(err.message);
        }
        if (data === null) {
            throw new errors_1.NotFoundError(`No message of id: ${messageId} was found.`);
        }
        return {
            status: 'success',
            data: data,
            message: `Retreived message of ID: ${messageId}`,
        };
    });
}
exports.getMessageById = getMessageById;
