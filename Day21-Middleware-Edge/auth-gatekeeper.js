/**
 * 
 * === Next.js Middleware & Edge Runtime ===
 * When we have a site with a "Dashboard", a "Landing Page", and an "Admin Panel",
 * we don't want to check authentication on every single page manually. We use Middleware.
 * 
 * === The Gatekeeper ===
 * Next.js Middleware runs in the Edge Runtime (not just a standard Node.js server).
 * This means it runs at the "edge" of the network (geographically closest to the user), making it incredibly fast.
 * 
 * -> Use Case 1 (Auth): Redirect unauthenticated users to /login before the page even starts to render.
 * -> Use Case 2 (A/B Testing): Show 50% of users a different version of a page without any "flicker".
 * -> Use Case 3 (Bot Blocking): Block specific IP addresses or countries at the edge level.
 * 
 */


// MICROLAB
// Create a middleware.js filethat protects a specific route (e.g., /dashboard) by checking JWT in the cookies.
// If the cookie is missing, redirect the user.

// file: middleware.ts (in the root directory)
import {NextResponse} from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token')?.value;

    // Protect all routes starting with /dashboard
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        // Redirect to login if no token found
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}