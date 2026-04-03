// === Read Replicas vs. Sharding ===
// When your database is slow, you have two main "Screws" to turn.
// Turning the wrong one is a million-dollar mistake.
// 
// === Scaling the "Read" vs. the "Write" ===
// 1. Read Replicas (Horizontal Scaling for Reads):
//     (a) How: You create "Clones" of your Primary database. The Primary handles all Writes (Insert/Update), and the Replicas handle all Reads (Select).
//     (b) Pros: Easy to set up, perfect for social media or blogs.
//     (c) The Catch (Replication Lag): It takes a few milliseconds for data to reach the replica. A user might post a comment and not see it immediately on refresh.
// 
// 2. Database Sharding (Horizontal Scaling for Writes/Size):
//     (a) How: You split the actual data into pieces (Users A-M on Server 1, N-Z on Server 2).
//     (b) Pros: The only way to handle billions of rows or massive write volumes.
//     (c) The Catch: Extremely complex. You lose "Joins" and ACID transactions across shards.


// === MICROLAB ===
// Implement a "Read-Write Split" in your Node.js app using Mongoose. This automatically sends find queries to a replica and save queries to the primary.
import mongoose from 'mongoose';

// 1. Connect to Primary (Writes) and Replica (Reads)
const primaryDB = mongoose.createConnection('mongodb://primary-db:27017/app');
const replicaDB = mongoose.createConnection('mongodb://replica-db:27017/app');

const UserSchema = new mongoose.Schema({ name: String, email: String });

// 2. The Logic: Use Replica for queries, Primary for updates
export const getUserProfile = async (id: string) => {
    const UserReplica = replicaDB.model('User', UserSchema);
    return await UserReplica.findById(id).read('secondaryPreferred');
    // 'secondaryPreferred' tells Mongo to prioritize the replica
};

export const updateProfile = async (id: string, data: any) => {
    const UserPrimary = primaryDB.model('User', UserSchema);
    return await UserPrimary.findByIdAndUpdate(id, data);
};