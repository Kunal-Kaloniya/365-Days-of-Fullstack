// === Cron Jobs vs. BullMQ ===
// While node-corn is easy to set up, it has a fatal flaw: it runs in the same memory as your app.
// If your server restarts exactly at midnight, the task is lost.
// BullMQ Repearable Jobs are the "Full-Fledged" solution because they persist in Redis.
// 
// === Scheduled vs. Queued ===
// 1. Node-Cron: Best for simple, non-critical tasks in a single-server setup.
// 2. BullMQ (Redis): Best for critical tasks. If the worker is down, the job stays in Redis and executes the moment the worker comes back online.
// 3. The "Crontab" Syntax: Both use the standard "* * * * *" (Minute, Hour, Day, Month, Weekday) format.


// MICROLAB
// Set up a repeatable job in BullMQ that "Cleans up temporary S3 uploads" every night at 12:00 AM.
import {Queue} from 'bullmq';

const maintenanceQueue = new Queue('maintenance', {connection: redisConnection});

// Schedule a repeatable job
await maintenanceQueue.add(
    'cleanup-s3',
    {folder: 'temp/'},
    {
        repeat: {
            pattern: '0 0 * * *',   // Every night at midnight
        },
    }
);

// The worker (running on a separate process/server)
const worker = new Worker('maintenance', async (job) => {
    if (job.name === 'cleanup-s3') {
        console.log("Starting S3 Cleanup...");
        // Logic to delete files older than 24h
    }
});