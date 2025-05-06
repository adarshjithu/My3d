export class BadRequestError extends Error {
    status;
    constructor(message: string) {
        super(message);
        this.status = 400;
    }
}

export class UnAuthorizedError extends Error {
    status;
    constructor(message: string) {
        super(message);
        this.status = 401;
    }
}
export class InternalServerError extends Error {
    status;
    constructor(message: string) {
        super(message);
        this.status = 500;
    }
}
export class UnauthorizedError extends Error {
    status;
    constructor(message: string) {
        super(message);
        this.status = 401;
    }
}