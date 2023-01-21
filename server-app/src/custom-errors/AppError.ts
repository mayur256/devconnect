
/**
 * A Common error handler class extending the JS in-built Error
 * handles application level exceptions
 */
export class AppError extends Error {
    private code: Number | null = null;

    constructor(code = null, message = 'Internal Server Error') {
        super();
        this.message = message;
        this.code = code;
    }
};
