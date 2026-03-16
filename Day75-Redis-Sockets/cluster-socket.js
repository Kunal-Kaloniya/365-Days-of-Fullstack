// === Redis Pub/Sub & Socket Cluster ===
// When you scale beyond a single Node.js instance, 
// WebSockets "break" because a user connected to Server 1 cannot see an event emitted on Server 2.
// 
// === Horizontal Scaling for Real-time ===
// 1. The Problem: WebSocket connections are "Stateful" and tied to a specific server.
// 
// 2. The Solution (Pub/Sub): When an event occurs, the server doesn't just emit a socket; it Publishes a message to a Redis channel.
// 
// 3. The Broadcast: Every other server instance is Subscribed to that Redis channel. When they receive the message from Redis, they emit it to their own locally connected users.
// 
// 4. The Result: Seamless real-time communication across an infinite number of servers.


// MICROLAB
// Set up a Redis-backed Socket.io server using the @socket.io/redis-adapter to allow cross-server communication.
import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";

const io = new Server(3000);

// 1. Create Redis Clients
const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();

await Promise.all([pubClient.connect(), subClient.connect()]);

// 2. Attach the Redis Adapter
io.adapter(createAdapter(pubClient, subClient));

io.on("connection", (socket) => {
    console.log(`User connected to server instance: ${process.pid}`);

    socket.on("send_notification", (data) => {
        // This will now reach users on ALL server instances!
        io.emit("new_notification", data);
    });
});