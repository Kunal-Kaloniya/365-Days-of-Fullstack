// === Rate Limiting & Throttling ===
// Now that your API is documented (Swagger), it's exposed.
// If a malicious script hits your /api/login 10,000 times a second, your server will crash. We need a "Bouncer."
//
// === The Leaky Bucket ===
// Rate limiting protects your resources by limiting the number of requests a user can make within a given window.
//
// Rate Limiting: "You can only call this 100 times every 15 minutes."
//
// Throttling: Slowing down the response time for users who exceed limits instead of blocking them outright.
//


// MICROLAB
// Implement express-rate-limit (for the backend) and learn how to communicate the "Cooldown" to the frontend using the Retry-After header.
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    message: "Too many requests, please try again after 15 minutes."
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply to all requests or specific routes like /api/login
app.use('/api/', limiter);