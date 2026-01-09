/**
 * The "Middleware Sieve"
 * A production MERN app should never let a raw request hit its logic. We need a hierarchy of defence:
 * 1. Helmet.js: Sets 15+ HTTP headers to hide your tech stack (Node.js) and prevent XSS/Clickjacking.
 * 2. express-rate-limiter: Protects againt DDoS and Brute Force by limiting requests per IP.
 * 3. toobusy-js: Monitors the Event Loop lag. If the lag is too high, it rejects new requests with a 503 status to prevent server death.
 */


// MICROLAB: Configure a Tiered Rate Limiter on a dummy Express server.
// Layer 1: General limit (e.g., 100 requests/15 mins).
// Layer 2: Sensitive limit (e.g., 5 attempts/15 mins).
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
app.use(helmet());  // Basic header protection

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // Strict limit for auth
    message: "Too many login attempts. Try again in 15 minutes."
});

app.post('/api/login', loginLimiter, (req, res) => {
    // api logic
});