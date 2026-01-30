/**
 * 
 * === The Production Readiness Audit (12-Factor App Methodology) ===
 * In production, you cannot rely on "it works on my machine".
 * Professional MERN apps use strict environment segregations.
 * 
 * 1. Validation: Use Zod to validate your .env variables at startup. If DATABASE_URL is
 * missing, the server should crash immediately with a clear error, not fail silently later.
 * 
 * 2. Security Headers: Use Helmet.js (for Express) or Next.js headers config to prevent
 * clickjacking and XSS.
 * 
 * 3. CORS: Strict origin matching (don't use * in production)
 * 
 */


// MICORLAB
// Create a "System Health Check" script that your entire stack (DB connection, Redis
// status, S3 bucket access) before the app starts.
import {checkDb} from './lib/db';
import {checkRedis} from './lib/redis';

export async function validateEnvironment() {
    const checks = [
        {name: 'Database', fn: checkDb},
        {name: 'Redis Queue', fn: checkRedis},
        {name: 'AWS Config', fn: () => !!process.env.AWS_ACCESS_KEY}
    ];

    for (const check of checks) {
        try {
            await check.fn();
            console.log(`${check.name} is online`);
        } catch (err) {
            console.log(`${check.name} FAILED. Shutting down...`);
            process.exit(1);
        }
    }
}