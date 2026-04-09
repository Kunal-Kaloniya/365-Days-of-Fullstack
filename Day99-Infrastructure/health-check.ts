// === Load Balancing Algorithms ===
// A Load Balancer (LB) is the "Receptionist" of your FileSystem.
// If it chooses poorly, one server crashes while the others sit idle.
// 
// === Distribution Logic ===
// 1. Round Robin: The simplest. Requests go to Server A, then B, then C, then back to A.
//     > Best for: Servers with identical hardware.
// 
// 2. Least Connections: Sends the user to the server with the fewest active sessions.
//     > Best for: Requests that take varying amounts of time (e.g., some users downloading big files, others just viewing a profile).
// 
// 3. IP Hash (Sticky Sessions): Uses the user's IP address to map them to a specific server.
//     > Best for: Apps that store temporary data in the server's local memory (though "Stateless" is usually better).
// 
// 4. Weighted Round Roubin: You tell the LB that Server A is twice as powerful as Server B, so it sends 2/3 of the traffic to A.
//     > Best for: Hybrid setups (e.g., mixing old and new servers).


// === MICROLAB ===
// Conceptualize a "Health Check" middleware.
// If a server's CPU exceeds 90%, the Load Balancer should "Eject" it from the pool until it cools down.
import express from 'express';
import os from 'os';

const app = express();

// The Load Balancer hits this endpoint every 5 seconds
app.get('/health', (req, res) => {
    const cpuLoad = os.loadavg()[0];    // 1-minute load average
    const freeMem = os.freemem() / os.totalmem();

    if (cpuLoad > 4.0 || freeMem < 0.1) {
        // Return 503 to tell the LB "Don't send traffic here!"
        return res.status(503).json({ status: 'unhealthy', cpuLoad });
    }

    res.status(200).json({ status: 'healthy' });
});