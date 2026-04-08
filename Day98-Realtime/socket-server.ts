// === Real-Time Communication ===
// How do you get data from the server to the client without the client asking for it?
// 
// === The Full-Duplex Connection ===
// 1. HTTP Polling (The Old Way): The client asks "Any new mail?" every 5 seconds. High overhead, lots of wasted requests.
// 
// 2. Long Polling (The Middle Ground): The client asks, and the server "holds" the request open until there is new data. Better, but still closes the connection after every message.
// 
// 3. WebSockets (The Professional Way):
//     (a) How: Starts as an HTTP request but "Upgrades" to a persistent, bi-directional TCP connection.
//     (b) Pros: Extremely low latency. The server and client can talk to each other simultaneously.
//     (c) Cons: State management is hard. If you have 1 million users, you have 1 million "Open" connections on your server.
// 
// 4. Server-Sent Events (SSE): A one-way street (Server → Client). Great for stock tickers or news feeds where the user doesn't need to talk back.


// === MICROLAB ===
// Conceptualize a "Real-time Dashboard" update. Instead of a REST API, we use a WebSocket server to push "System Health" metrics to the frontend.
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected to Real-time Metrics');

    // Push system metrics every 2 seconds
    const metricsInterval = setInterval(() => {
        const metrics = {
            cpuUsage: Math.random() * 100,
            memoryUsage: Math.random() * 100,
            timestamp: new Date()
        };

        ws.send(JSON.stringify(metrics));
    }, 2000);

    ws.on('close', () => clearInterval(metricsInterval));
});