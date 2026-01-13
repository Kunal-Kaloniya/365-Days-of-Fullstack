/**
 * 
 * === WebSockets vs Polling ===
 * Most developers build MERN apps where the frontend "asks" the backend for data.
 * But for chat apps, stock tickers, or notification systems, this is inefficient.
 * 
 * === Full-Duplix Communication ===
 * 1. Short Polling: Frontend asks "Any new data?" every 5 seconds. (Wasteful HTTP overhead)
 * 2. WebSockets (ws): A single, persistent connection where the Server can push data to the Client the moment it happens.
 * 
 */


// MICROLAB
// Instead of just using socket.io, today's challenge today is to implement a Heartbeat Mechanish.
// In production, WebSocket connections often "ghost" (drop without closing).
// You need a ping/pong system to ensure the connection is actually alive before trying to send data.


// Server-side logic to prune dead connections
io.on('connection', (socket) => {
    socket.isAlive = true;
    socket.on('pong', () => { socket.isAlive = true; });

    const interval = setInterval(() => {
        if (socket.isAlive === false) return socket.terminate();
        socket.isAlive = false;
        socket.emit('ping');
    }, 30000);  // Check every 30s
});