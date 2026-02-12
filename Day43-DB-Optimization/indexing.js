// === Database Indexing & Explain Plans ===
// When you run a query like User.find({ email: 'test@test.com' }) on a collection of 1 million users without an index,
// MongoDB has to look at every single document (a "Collection Scan").
// 
// === B-Tree Indexing ===
// An index is a separate data structure (usually B-Tree) that stores a small portion of data in a sorted order.
// 
// 1. Single Field Index: Speeding up lookups on a specific field (e.g., email).
// 2. Compound Index: Speeding up queries that filter by multiple fields (e.g., status AND createdAt)
// 3. The "Explain" Command: The most important tool in your arsenal. Running .explain("executionStats") tells you exactly how many documents MongoDB scanned versus how many it returned.


// MICROLAB
// Identify a slow query and create a compound index to optimize it.

// ---------- code ----------
// 1. Identify a common query in your app:
// Example: Finding active orders for a specific userm sorted by data.
// Query: Order.find({ userId: '...', status: 'active' }).sort({ createdAt: -1 })

// 2. Create a Compound Index to cover this query
// Rule of thumb: Equality filters first, then fields.
const orderSchema = new mongoose.Schema({ /* ... */ });

orderSchema.index({ userId: 1, status: 1, createdAt: -1});

// 3. Verify the performance boost
const stats = await orderSchema.find({userId: '...', status: 'active'})
    .sort({createAt: -1})
    .explain("executionStats");

console.log(stats.executionStats.totalDocsExamined);
// Should be equal to nReturned if the index is "covered"