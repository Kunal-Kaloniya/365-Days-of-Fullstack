/**
 * 
 * === Message Queues with BullMQ ===
 * When a task is heavy or relies on a third party (Email, Image processing, Generating PDFs),
 * you shouldn't do it in the main Request/Response cycle. You "push" the task into a queue and tell the user, "We're on it!"
 * 
 * === Producer-Consumer Pattern ===
 * 1. The Producer: Your API/Server. It creates a "Job" (e.g., { type: 'SEND_EMAIL', to: 'user@test.com' }) and pushes it to Redis.
 * 2. The Consumer (Worker): A separate Node.js process that watches Redis. It picks up the job, executes it, and marks it as "Completed" or "Failed."
 * 3. The Benefit: If your worker crashes, the job stays in Redis. When the worker restarts, it picks up right where it left off. Zero data loss.
 * 
 */


// MICROLAB
// Set up a basic BullMQ worker. This is the industry standard for Node.js background processing.

import { Queue, Worker } from 'bullmq';

// 1. Initialize the Queue (The Producer side)
const emailQueue = new Queue('email-tasks', { connection: { host: 'localhost', port: 6379 } });

export const addEmailJob = (data) => emailQueue.add('send-welcome', data);

// 2. The Worker (The Consumer side - can run on a separate server!)
const worker = new Worker('email-tasks', async (job) => {
    if (job.name === 'send-welcome') {
        console.log(`Processing email to: ${job.data.email}`);
        // Simulate heavy task like calling SendGrid/Nodemailer
        await new Promise(res => setTimeout(res, 2000));
        console.log("Email sent successfully!");
    }
}, { connection: { host: 'localhost', port: 6379 } });