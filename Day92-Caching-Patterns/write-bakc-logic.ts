// === Caching Strategies ===
// Choosing a caching strategy is a trade-off between Data Consistency and Write Performance.
// 
// === Write Patterns ===
// 1. Cache-Aside (Lazy Loading): The app checks the cache; if it's a "miss," it fetches from the DB and updates the cache.
//     (a) Pros: Resilient to cache failures.
//     (b) Cons: First request is always slow.
// 
// 2. Write-Through: The app writes to the Cache first, and the cache synchronously updates the DB.
//     (a) Pros: Data in cache is never stale.
//     (b) Cons: Higher write latency (two writes instead of one).
// 
// 3. Write-Back (Write-Behind): The app writes to the cache, and the cache updates the DB asynchronously later.
//     (a) Pros: Incredible write speed (ideal for heavy loads like logging or game scores).
//     (b) Cons: Risk of data loss if the cache crashes before the DB is updated.


// === MICROLAB ===
// Conceptualize a "Write-Back" mechanism using a Message Queue (like BullMQ or RabbitMQ) to ensure the DB eventually catches up with a high-speed Redis cache.
import Redis from 'ioredis';
import Queue from 'bull'; // Lightweight Message Queue
import { Product } from './models/Product';

const redis = new Redis();
// 1. Initialize the "Sync" Queue
const syncQueue = new Queue('db-sync', 'redis://127.0.0.1:6379');

/**
 * THE API HANDLER (Lightning Fast)
 */
export const handleLike = async (productId: string) => {
    // 1. Increment in Redis (Atomic & In-Memory)
    const newCount = await redis.incr(`likes:${productId}`);

    // 2. Push to Write-Back Queue (Non-blocking)
    // we use a job ID to "deduplicate" - if 100 likes happen fast, 
    // the worker only needs to sync the latest value.
    await syncQueue.add(
        { productId, count: newCount },
        { jobId: `sync-${productId}`, delay: 5000 } // Sync after 5s of "quiet"
    );

    return { success: true, currentLikes: newCount };
};

/**
 * THE BACKGROUND WORKER (Reliable Persistence)
 */
syncQueue.process(async (job) => {
    const { productId, count } = job.data;

    console.log(`[Worker] Syncing Product ${productId} to DB with ${count} likes...`);

    // 3. Persist to MongoDB
    await Product.findByIdAndUpdate(productId, { likes: count });
});