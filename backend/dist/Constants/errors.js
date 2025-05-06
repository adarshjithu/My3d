"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.InternalServerError = exports.UnAuthorizedError = exports.BadRequestError = void 0;
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}
exports.BadRequestError = BadRequestError;
class UnAuthorizedError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}
exports.UnAuthorizedError = UnAuthorizedError;
class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.status = 500;
    }
}
exports.InternalServerError = InternalServerError;
class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}
exports.UnauthorizedError = UnauthorizedError;
