// === B-Trees vs. LSM Trees ===
// Every database uses a specific data structure to organize its index on the physical hard drive.
// 
// === Storage Engines ===
// 1. B-Trees (The Gold Standard for Reads):
//     (a) Used in: Postgres, MySQL, MongoDB.
//     (b) How: Data is stored in a balanced tree structure. Every read is O(logn).
//     (c) Pros: Lightning-fast random reads. Perfect for e-commerce or user profiles.
//     (d) Cons: Writes are "Heavy" because the database has to re-balance the tree and potentially move data on the disk for every insert.
// 
// 2. LSM Trees (Log-Structured Merge-Trees – The King of Writes):
//     (a) Used in: Cassandra, ScyllaDB, InfluxDB, LevelDB.
//     (b) How: Writes are appended to an in-memory "MemTable" (super fast). When full, they are flushed to disk as immutable "SSTables."
//     (c) Pros: Incredible write throughput. Perfect for logging, messaging, and high-frequency IoT data.
//     (d) Cons: Reads are slower because the DB might have to check multiple files (SSTables) to find the latest version of a record.


// === MICROLAB ===
// Conceptualize a "Hybrid Storage" approach. Use a B-Tree DB for your "User Profiles" and an LSM-Tree DB for your "Activity Logs."
// 1. Transactional Data (B-Tree - Postgres)
// Needs fast reads and complex joins
const user = await postgres.query('SELECT * FROM users WHERE id = $1', [userId]);

// 2. High-Volume Logs (LSM Tree - Cassandra/Scylla)
// Needs massive write-throughput, reads are rare
await cassandra.execute(
    'INSERT INTO user_activity (user_id, action, timestamp) VALUES (?, ?, ?)',
    [userId, 'LOGIN', Date.now()]
);