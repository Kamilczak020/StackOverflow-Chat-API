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
const http = require("http");
const debug = require("debug");
const validation_1 = require("./validation");
const App_1 = require("./App");
debug('ts-express:server');
start();
/**
 * Checks for config validity, if valid - runs the server.
 */
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        // Run Config Validator check
        const areConfigsValid = yield validation_1.validateConfigs();
        if (areConfigsValid) {
            run();
        }
    });
}
/**
 * Runs the express server
 */
function run() {
    console.log('Database config valid, starting server...');
    const port = normalizePort(process.env.PORT || 3000);
    App_1.default.set('port', port);
    const server = http.createServer(App_1.default);
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
    function normalizePort(val) {
        let port = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port)) {
            return val;
        }
        else if (port >= 0) {
            return port;
        }
        else {
            return false;
        }
    }
    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
    function onListening() {
        let addr = server.address();
        let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        console.log(`Listening on ${bind}`);
    }
}
