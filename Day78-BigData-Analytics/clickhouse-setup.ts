// === Building a Custom Analytics Engine(ClickHouse) ===
// Since we've already secured the app and handled real - time notifications, a "Senior" move for Day 78 is handling Big Data.
// In a full - fledged app, storing millions of "Page View" or "Click" events in MongoDB is inefficient.
// Professional engineers use a Columnar Database like ClickHouse.
// 
// === Row vs.Columnar Storage ===
// 1. MongoDB / Postgres(Row - based): Optimized for fetching a whole "User" or "Order." Slow for calculating the "Average price of 1,000,000 orders."
// 2. ClickHouse(Columnar): Optimized for analytical queries(OLAP).It only reads the specific columns needed for a calculation, making it 100x-1000x faster for data aggregation.
// 3. The "Sidecar" Pattern: Your main app stays on SQL / NoSQL, but you stream "Events" to ClickHouse for the dashboard.


// MICROLAB
// Set up a basic ClickHouse client and create a table designed to store millions of "API Latency" logs for analysis.
import { createClient } from '@clickhouse/client';

const client = createClient({ host: 'http://localhost:8123', username: 'default' });

// 1. Create a table using the MergeTree engine (optimized for high-speed inserts)
await client.command({
    query: `
    CREATE TABLE IF NOT EXISTS api_logs (
      event_time DateTime,
      endpoint String,
      latency_ms UInt32,
      status_code UInt16
    ) ENGINE = MergeTree()
    ORDER BY event_time
  `
});

// 2. Perform a "Heavy" analytical query (Calculating 95th percentile latency)
const resultSet = await client.query({
    query: `
    SELECT 
      endpoint, 
      avg(latency_ms) as avg_latency,
      quantile(0.95)(latency_ms) as p95_latency
    FROM api_logs
    GROUP BY endpoint
  `,
    format: 'JSONEachRow',
});