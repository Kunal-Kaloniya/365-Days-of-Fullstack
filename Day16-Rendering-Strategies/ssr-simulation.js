/**
 * 
 * === The Rendering Simulation ===
 * Most MERN learners only know CSR (standard create-react-app or Vite). The problem?
 * Searhc engines (SEO) and social media crawlers struggle to "read" your site because it's just an empty
 * <div> that gets filled by JavaScript.
 * 
 * === Hydration & SEO ===
 * 1. CSR (Client-Side Rendering): Fast transitions, poor SEO, slow initial "First Contentful Paint".
 * 2. SSR (Server-Side Rendering): The server generates the HTML on every request.
 * Great for dynamic, SEO-heavy sites (like E-commerce).
 * 3. SSG (Static Site Generation): The HTML is built once at build time. Fastest possible speed.
 * Perfect for blogs or documentation.
 * 
 */


// MICROLAB
// Today, you won't just build a page; you will simulate a Data-Fetching Strategy.
// Create a "Mock Next.js" logic in your Node.js backend that serves a pre-rendered HTML string with data injected,
// vs. a standard JSON API.

const express = require('express');
const app = express();

const template = (data) => `<html><body><h1>User: ${data.name}</h1><p>SEO can see this!</p></body></html>`;

app.get('/profile/:id', async (req, res) => {
    const user = {
        name: "Kunal",
        bio: "Full Stack Engineer"
    };  // Simulate DB fetch

    // SSR Simulation: Sending full HTML instead of just JSON
    res.send(template(user));
});