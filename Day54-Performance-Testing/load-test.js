// === Load Testing with K6 ===
// In a "full-Fledged" app, "fast" is subjective. You need to know exactly how many concurrent users your API can handle before the response time crosses 500ms or the server crashes.
// 
// === Virtual Users (VUs) & Thresholds ===
// 1. K6: A modern, developer-centric load testing tool (written in Go, scripted in JS).
// 2. The Smoke Test: Checking if the system stays upright under a minimal load.
// 3. The Stress Test: Pushing the system to its limit to see the "Breaking Point".
// 4. The Soak Test: Running a medium load for a long time to check for the Memory Leaks in your Node.js code.


// MICROLAB
// Write a K6 script to test your "Trending Products" endpoint. We want to ensure that even with 50 concurrent users, the 95th percentile response time (p(95)) is under 200ms.
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 20 },  // Ramp up to 20 users
        { duration: '1m', target: 20 },  // Stay at 20 users
        { duration: '20s', target: 0 },  // Ramp down
    ],
    thresholds: {
        http_req_duration: ['p(95)<200'],   // 95% of requests must be under 200ms
    },
};

export default function () {
    const res = http.get('http://localhost:3000/api/products/tranding');
    check(res, { 'status was 200': (r) => r.status === 200 });
    sleep(1);
}