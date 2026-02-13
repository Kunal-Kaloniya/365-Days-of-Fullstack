// === Distributed Rate Limiting (Redis) ===
// If you have 3 servers running behind a load balancer, memory-based rate limiting fails because Server A doesn't know how many requests the user sent to Server B.
// Redis acts as the single source of truth.
// 
// === Fixed Window vs. Sliding Window ===
// 1. Shared State: Redis stores the request count for each IP or User ID.
// 2. The Benefit: It is lightning fast (in-memory) and allows you to scale your backend horizontally without weakening your security.
// 3. Atomic Increaments: We use the Redis INCR command, which is atomic, preventing "rave conditions" where two requests at the exact same millisecond could bypass the limit.


// MICROLAB
// Migrate your local rate limiter to a Redis-backend store using rate-limit-reids.
import {Redis} from 'ioredis';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';

const redisClient = new Redis(process.env.REDIS_URL);

const distributedLimiter = rateLimit({
    // The magic happens here: All server instances check this Redis store
    store: new RedisStore({
        sendCommand: (...args) => redisClient.call(...args),
    }),
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later."
});

export default distributedLimiter;