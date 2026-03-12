// === Serverless Architecture ===
// Serverless doesn't mean "no servers." It means you don't manage them.
// You just upload a function, and AWS executes it only when triggered.
// 
// === Scaling to Zero ===
// 1. Event-Driven: Lambda functions are triggered by events—an S3 upload, a message in a queue, or an HTTP request via API Gateway.
// 2. The Cold Start: Because the function isn't "always on," the first request might take a second to spin up. A pro engineer knows how to keep functions "warm" or minimize package size to reduce this lag.
// 3. Statelessness: Lambda functions are "stateless." You cannot save a variable in one run and expect it to be there in the next. Everything must be stored in your DB or Redis.


// MICROLAB
// Create a Lambda function that triggers whenever a new file is uploaded to an S3 bucket to log the file metadata.
// A simple AWS Lambda function in Node.js
export const handler = async (event) => {
    // 1. Extract info from the S3 Event
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

    console.log(`🚀 New file detected: ${key} in bucket: ${bucket}`);

    try {
        // 2. Perform logic (e.g., notify a Slack channel or update DB)
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Event processed successfully" }),
        };
    } catch (err) {
        console.error(err);
        throw new Error("Error processing S3 event");
    }
};