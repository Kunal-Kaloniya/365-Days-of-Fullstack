/**
 * 
 * === Global Exception Filters ===
 * In a professional Next.js or Express environment, you shouldn't have try-catch blocks that look identical in every single route.
 * That's "code smell". Instead, you implement a Golbal Error Wrapper.
 * 
 * === Centralized Error Mapping ===
 * 1. Custom Error Classes: Create AppError class that extends the built-in Error.
 * This allows you to attach a statusCode and an isOperational flag.
 * 2. The Middleware/Wrapper: Create a Higher-Order Function (HOF) that wraps your API routes.
 * If an error occurs, it automatically catches it, logs it (using the logging system you built), and sends a clean, formatted JSON response to the client.
 * 
 */


// MICROLAB
// Create a centralized error-handling utility that distinguishes between "Trusted Errors" (logic errors) and "Unknown Errors" (programming/system errors)

// 1. Custom Error Class
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;  // Distinguishes from programming bugs
        Error.captureStackTrace(this, this.constructor);
    }
}

// 2. The Wrapper (BFF Pattern)
export const catchAsync = (fn) => (req, res, next) => {
    fn(req, res, next).catch((err) => {
        // Log the error using your Day 10 Winston logger
        logger.error(err);

        const statusCode = err.statusCode || 500;
        res.status(statusCode).json({
            status: 'error',
            message: err.isOperational ? err.message : "Something went very wrong!"
        });
    });
};