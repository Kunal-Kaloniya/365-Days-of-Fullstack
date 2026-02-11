// === Real-time Socket.io & Event Rooms ===
// While we touched on WebSockets briefly on Day 11, today we go "Full-Fledged" by integrating Sockets with your RBAC and User Sessions
// 
// === Private Rooms & Event Emitting ===
// You don't want to broadcast a notification to everyone connected.
// You need to target specific users.
// 
// 1. The Room Patterns: When a user connects, you automatically join them into a "room" named after their unique userId.
// 2. Targeted Emitting: When a n action happens (e.g., someone likes their post), the server emits an event specifically to that userId room.
// 3. The Fallback: If the user is offline, your logic should check the socket connection and, if missing save the notification to the MongoDB database instead.


// MICROLAB
// Create a server-side helper that handles joining a user to their private room upon authentication.

// server.js (Socket setup)
io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
        socket.join(userId);    // User is now in their own private room
        console.log(`User ${userId} connected and joined private room.`);
    }

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Logic to send a notification from anywhere in your backend
export const sendNotification = (userId, data) => {
    io.to(userId).emit('notification', data);
}