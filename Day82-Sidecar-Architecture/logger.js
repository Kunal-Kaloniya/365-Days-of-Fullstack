// === The Sidecar Pattern ===
// In a high-performance MERN app, you don't want your main Express server to be "distracted"
// by sending logs to a remote server or calculating metrics.
// You offload that to a Sidecar.
// 
// === Separation of Concerns (Infrastructure) ===
// 1. The Problem: If your logging service (like Datadog or Loggly) is slow, it shouldn't make your user's "Add to Cart" request slow.
// 
// 2. The Sidecar: A separate process (or container in Docker) that runs alongside your app. Your app sends logs to a Local Buffer (super fast), and the Sidecar picks them up and ships them to the cloud.
// 
// 3. Vector / Fluentd: These are popular "Sidecar" agents. They "tail" your log files and handle the heavy lifting of retries, compression, and network management.


// MICROLAB
// Configure a "Fire-and-Forget" logging utility that writes to a local stream, which a sidecar would theoretically pick up.
import fs from 'fs';
import path from 'path';

// Create a high-performance write stream
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

export const logEvent = (event: string, metadata: object) => {
    const logEntry = JSON.stringify({
        timestamp: new Date().toISOString(),
        event,
        ...metadata
    });

    // Non-blocking local write. 
    // A Sidecar process (like Fluentbit) will watch this file and upload it.
    logStream.write(logEntry + '\n');
};