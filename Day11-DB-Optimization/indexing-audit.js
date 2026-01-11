/**
 * 
 * === MongoDB Indexing & Query ===
 * When we run "db.users.find({ email: 'test@example.com' })", MongoDB does a Collection Scan (COLLSCAN) -
 * it looks at every single document. If we have a million users, that's a performance nightmare.
 * 
 * 
 * === B-Tree Indexing ===
 * An index is a special data structure (usually a B-Tree) that stores a small portion of the document's data in a searchable form.
 * It points to the location of the full document.
 * 
 */

// MICROLAB
// 1. Create a script that inserts 5,000 dummy records into a collection.
// 2. Run a query on a non-indexed field and check "executionTimeMillies".
// 3. Create an index on that field: schema.index({ fieldName: 1 }).
// 4. Run the query again and observe the time drop to near 0.
const start = Date.now();
// without index: COLLSCAN
const user = await UserActivation.find({ email: 'target@example.com' }).explain("executionStats");
console.log(`Time taken: ${Date.now() - start}ms`);

// after indexing: IXSCAN
await UserActivation.collection.createIndex({ email: 1 });
const indexedUser = await UserActivation.find({ email: 'target@example.com' }).explain("executionStats");
console.log(`Indexed Time: ${indexedUser.executionStats.executionTimeMillis}ms`);