// === The Event Backbone ===
// When a user buys a product, ten things need to happen: send an email, update inventory,
// notify the warehouse, update the analytics lake, etc.
// You don't do this in one API call. You emit an Event.
// 
// === Pub/Sub & Log Aggregation ===
// 1. RabbitMQ (The Smart Broker): * How: It’s like a post office. It tracks which consumer got which message. Once a message is acknowledged, it’s deleted.
//     (a) Use Case: Task queues (e.g., "Resize this image"), Order processing, simple microservice communication.
// 
// 2. Apache Kafka (The Distributed Log): * How: It’s like a continuous digital tape recorder. Messages are appended to a log and stay there (retention).
//     (a) The Power of Replay: If your "Analytics Service" crashes, it can go back 24 hours and "replay" all the events it missed.
//     (b) Use Case: Real-time stream processing, activity tracking (clicks/logs), Event Sourcing.


// === MICROLAB ===
// Conceptualize a "Notification Dispatcher" using a Message Queue.
// This ensures that even if the Email Service is down,
// the emails aren't lost—they stay in the queue until the service recovers.
import amqp from 'amqplib'; // RabbitMQ Library

export const publishNotification = async (userId: string, message: string) => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'notifications';

    await channel.assertQueue(queue, { durable: true });

    // 1. Send to Queue
    channel.sendToQueue(queue, Buffer.from(JSON.stringify({ userId, message })), {
        persistent: true // Ensure message survives a server restart
    });

    console.log("Event Published: Notification queued for worker.");
};