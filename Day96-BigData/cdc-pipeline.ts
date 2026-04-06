// === Analytics at Scale ===
// When a CEO asks, "What was our revenue growth per city over the last 3 years?"
// you don't run that query on your production MongoDB. It would crash the site.
// 
// === OLAP (Online Analytical Processing) ===
// 1. Data Warehouse (The Structured Library): * Examples: Snowflake, Google BigQuery, Amazon Redshift.
//     (a) How: Data is cleaned and structured before it’s stored (Schema-on-Write).
//     (b) Use Case: Business Intelligence, Financial Reporting.
// 
// 2. Data Lake (The Raw Ocean):
//     (a) Examples: Amazon S3 + AWS Glue, Azure Data Lake.
//     (b) How: Raw data (logs, images, JSON) is dumped in its original format (Schema-on-Read).
//     (c) Use Case: Machine Learning, Data Science, Log Analysis.
// 
// 3. ETL vs. ELT: * ETL (Extract, Transform, Load): Clean data then move it to the Warehouse.
//     (a) ELT (Extract, Load, Transform): Move raw data to the Lake, then transform it whenever you need it using powerful compute engines.


// === MICROLAB ===
// Conceptualize a "Data Pipeline" using a Change Data Capture (CDC) pattern.
// When a user is created in your App DB, an event is sent to a Data Lake for future analysis.
// A Middleware that triggers on DB changes
userSchema.post('save', async function (doc) {
    const analyticsEvent = {
        userId: doc._id,
        action: 'USER_CREATED',
        payload: doc.toObject(), // Send the raw data
        timestamp: new Date()
    };

    // 1. Push to an S3 "Data Lake" via an ingestion stream (like Kinesis or Kafka)
    await dataIngestionStream.putRecord(JSON.stringify(analyticsEvent));

    console.log("Raw event pushed to Data Lake for future BI processing.");
});