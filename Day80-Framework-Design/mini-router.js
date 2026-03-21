// === Custom Meta-Framework (Routing from Scratch) ===
// You've used Express and Next.js. Now, you need to understand how they work under the hood.
// Today we build a File-System Based Router from scratch.
// 
// === The Router Tree ===
// 1. The Scan: Use Node.js fs to recursively scan a /pages directory.
// 2. The Map: Map file paths (e.g., pages/auth/login.ts) to URL paths (/auth/login).
// 3. Dynamic Segments: Convert [id].ts into a Regex pattern that captures the ID from the URL.
// 4. The Handler: Dynamically import() the file and execute its exported function when a request hits that route.


// MICROLAB
// Write a mini-router that automatically loads routes from a folder, mimicking the behavior of Next.js or Nuxt.
import fs from 'fs';
import path from 'path';

const routesDir = path.join(process.cwd(), 'routes');

export const initializeRouter = (app) => {
    const files = fs.readdirSync(routesDir);

    files.forEach(async (file) => {
        const routePath = `/${file.split('.')[0]}`;
        const module = await import(path.join(routesDir, file));

        // Automatically register the route based on the filename
        app.get(routePath, module.handler);
        console.log(`🚀 Route Registered: ${routePath}`);
    });
};

// Example in routes/users.js:
// export const handler = (req, res) => res.json({ users: [] });