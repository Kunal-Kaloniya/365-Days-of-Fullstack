/**
 * 
 * === MongoDB Aggregations (The Pipelines) ===
 * Think of Aggregation as an assembly line. We pass our collection through differernt "stages" and each stage transforms the data..
 * 
 * 1. $match: Filters documents (like find).
 * 2. $group: Categorizes documents and performs math (sum, avg).
 * 3. $sort / $limit: Refines the final output.
 * 4. $lookup: Performs a "Left Outer Join" to pull data from another collection (e.g., pulling User details into an Order list).
 * 
 */


// MICROLAB
// Create a pipeline that finds the Top 5 Customers by their total purchase value.

// This runs insde the Databasem NOT in Node.js RAM
const topCustomers = await Order.aggregate([
    { $match: { status: 'completed' } },    // Stage 1: Filter
    {
        $group: {
            _id: '$userId',
            totalSpent: { $sum: '$amount' },
            orderCount: { $sum: 1 }
        }
    },  // Stage 2: Calculate
    { $sort: { totalSpent: -1 } },  // Stage 3: Order by spend
    { $limit: 5 } // Stage 4: Top 5
]);