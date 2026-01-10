/**
 * 
 * === Logging & Observabitlity (Winston + Morgan) ===
 * In our basic projects, we usually use 'console.log'. But in professional MERN environment,
 * console.log is a sin because it's synchronous (blocks the event loop) and doesn't persist.
 * 
 * === Structured Logging ===
 * If a user in the USA has a "500 Internal Server Error" at 2:00 AM, how do you find out why?
 * You need a loggin system that:
 * 1. Categorizes: (Info, Error)
 * 2. Persists: Saves to a file or a cloud service (like loggly or Datadog)
 * 3. Contextualizes: Includes timestamps, request IDs, and stack traces
 * 
 */


// MICROLAB: Setup a production-grade logger using Winston and Morgan.
// 1. Morgan: To log every HTTP request automatically.
// 2. Winston: To create a "Transport" system (logs errors to an error.log file and everything else to a combined.log)
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new Winston.transports.File({ filename: 'error.log', level: 'error' }),
        new Winston.transports.File({ filename: 'combined.log' })
    ],
});

// If not in production, also log to the console
if (ProcessingInstruction.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}