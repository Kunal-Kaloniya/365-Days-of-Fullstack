/**
 * 
 * === Server Components vs Client Components ===
 * In traditional React, we fetch data on the client (browser). In the modern Next.js/MERN world,
 * we fetch data directly on the server using Server Components.
 * 
 * === Zero-Bundle-Size ===
 * 1. Client Components ('use client'): The JavaScript for these is sent to the browser. Use these for interactivity (buttons, forms, state).
 * 2. Server Components (Default): The code stays on the server. Only the result (HTML/Data) is sent.
 * 3. The benefit: Your "node_modules" for things like dbConnect or heavy-library never reach the user's browser. This makes out site load instantly.
 * 
 */


// MICROLAB
// Create a Server Component that connects directly to MongoDB without an intermediate API route.
// This is the "full-fledged" way to skip the extra network hop.

import dbConnect from '@/lib/db';
import User from '@/models/User';

export default async function ProfilePage() {
    await dbConnect();
    const user = await User.findOne({ email: 'kunal@example.com' });

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <p>Status: {user.isPro ? 'Pro Member' : 'Standard'}</p>
        </div>
    );
}