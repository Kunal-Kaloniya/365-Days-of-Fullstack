// === Database Sharding ===
// Sharding is the process of breaking up a large database into smaller, more manageable chunks called "Shards",
// ans distributing them across multiple servers.
// 
// === The Shard Key ===
// 1. Horizontal Partitioning: Splitting a table by rows. (e.g., Users 1-1M got to Server A, 1M-2M go to Server B).
// 2. The Shard Key: The column used to decide where data goes (e.g., user_id or region). Choosing the wrong key leads to "Hotspots" (one server doing all the work).
// 3. Consistent Hashing: A mathematical way to map data to servers that minimizes data movement when add or remove a server from the cluster.
// 4. The Trade-off: You lose the ability to do "Joins" across shards easily. Your application logic must become "Shard-Aware".


// MICROLAB
// Implement a simple "Manual Sharding" logic in Node.js that routes a user's data to one of three different MongoDB connections based on their userId.
import { MongoClient } from 'mongodb';

const shardNodes = [
    'mongodb://server-a:27017',
    'mongodb://server-b:27017',
    'mongodb://server-c:27017'
];

export const getShardConnection = (userId: number) => {
    // 1. Use Modulo hashing to pick a shard
    const shardIndex = userId % shardNodes.length;
    return new MongoClient(shardNodes[shardIndex]);
};

// Usage:
// const dbClient = getShardConnection(user.id);
// await dbClient.connect();
// const userData = await dbClient.db('app').collection('users').findOne({ id: user.id });