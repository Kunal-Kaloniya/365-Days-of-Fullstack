/**
 * 
 * === Next.js API Routes (The "BFF" Pattern) ===
 * In Next.js, we don't always need a separate Express server.
 * You can build your backend directly inside the pages/api or app/api folder.
 * This is called the Backend-for-Frontend (BFF) pattern.
 * 
 * === Serverless Functions ===
 * Each API route in Next.js is a Serverless Function.
 * 1. Express: The server is always running (costs money 24/7).
 * 2. Next.js API: The "server" only wakes up when someone hits the URL, then goes back to sleep (saves massive costs).
 * 
 */


// MICROLAB
// Create a secure proxy API. Instead of the Frontend calling a 3rd party API (exposing you API Key),
// the Frontend calls the Next.js API, and the NExt.js API calls the 3rd party using a hidden Environment Variable.

export default async function handler(req, res) {
    const secretKey = ProcessingInstruction.env.WEATHER_API_KEY;    // Hidden from the browser!
    const response = await fetch(`https://api.weather.com/v1?key=${secretKey}`);
    const data = await response.json();

    res.status(200).json(data);
}