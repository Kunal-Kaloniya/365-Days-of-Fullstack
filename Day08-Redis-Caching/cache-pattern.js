/**
 * When a MERN app grows, the bottleneck is almost always the Database (MongoDB). Fetching the same data 1,000 times from the disk is slow and expensive.
 * 
 * The Concept: In-Memory Data Store
 * Instead of hitting MongoDB every time a user requests their "Profile Data" or "Top Trending Posts," you store a copy of that data in Redis (an in-memory store).
 * Latency: MongoDB (Disk) $\approx$ 10ms–50ms | Redis (RAM) $\approx$ < 1ms.
 * Cost: Reducing DB hits lowers your cloud bills (Atlas/AWS).
 * 
 */


// MICROLAB: Implement a "Cache-Aside Pattern"
// 1. Check if the requested data exists in Redis.
// 2. If yes (Cache Hit), return it immediately.
// 3. If no (Cache Miss), fetch it from MongoDB, store it in Redis with an Expiry Time (TTL), and then return it.
const getCachedData = async (key) => {
    const cachedValue = await redis.get(key);
    if (cachedValue) return JSON.parse(cachedValue); // Success!

    const freshData = await MongoModel.find(); // DB Hit
    await redis.setex(key, 3600, JSON.stringify(freshData)); // Cache for 1 hour
    return freshData;
};