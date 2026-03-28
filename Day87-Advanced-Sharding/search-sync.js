// === Sharding Proxies & Vitess ===
// When your app grows, "Manual Sharding" becomes a nightmare when you need to "Re-balance" data.
// A Sharding Proxy sits between your App and your DB,
// making the cluster look like one giant database to your code.
// 
// === The "VTGate" & Vindex ===
// 1. The Proxy (VTGate): Your Node.js app sends a simple SQL query to the Proxy. The Proxy looks at the Vindex (Sharding Index), figures out which shard has the data, and routes the query.
// 
// 2. Re-sharding: If Shard A is 90% full, Vitess can split Shard A into Shard A1 and A2 while the app is running without your Node.js code ever knowing.
// 
// 3. Scatter-Gather: If you run a query without a shard key (e.g., SELECT * FROM users WHERE age > 20), the proxy "scatters" the query to ALL shards and "gathers" the results back for you. (Warning: This is slow!).


// MICROLAB
// Conceptualize a "Global Search" service that handles the "Scatter-Gather" problem by using an ElasticSearch sidecar to avoid hitting all DB shards.
// Instead of querying all shards (Slow), we query an Indexer
export const globalUserSearch = async (searchTerm: string) => {
    // 1. Query the "Search Index" (Elastic/Meili) which stores a copy of data + ShardID
    const results = await searchIndex.search(searchTerm);

    // 2. The results contain the 'shard_key' (e.g., country_code)
    // 3. Now we can hit the specific DB shard directly
    const userData = await db.collection('users').find({
        id: results[0].id,
        country: results[0].country // Our Shard Key
    });

    return userData;
};