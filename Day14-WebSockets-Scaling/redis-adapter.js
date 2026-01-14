/**
 * 
 * === WebSockets and Redis Adapters ===
 * When you have multiple server instances (e.g., using PM2 or a Load Balancer), Socket.io connections
 * are isolated to the specific server the y connected to. If User A is on Server 1 and User B is on Server 2,
 * they won't be able to "talk" to each other.
 * 
 * === The Pub/Sub "Glue" ===
 * To solve this, we use Redis as a "Pub/Sub" (Publish/Subscribe) layer. When Server 1 emits a message, it publishes
 * it to Redis. Redis then broadcasts it to all other servers,
 * ensuring every client receives the message regardless of which server they are connected to.
 * 
 */


// MICROLAB
// Set up a Socket.io server using the Redis Adapter.
// This is how real-time apps like Discord or Slack scale to millions of users.
// Why? : It decouples the communication layer from the server state.

const { Server } = require("socket.io");
const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

const io = new Server(3000);
const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
    io.adapter(createAdapter(pubClient, subClient));
    console.log("Redis Adapter linked: Real-time scaling enabled.");
});