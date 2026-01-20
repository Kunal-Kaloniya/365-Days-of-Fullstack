/**
 * 
 * === Server Actions & Security ===
 * In the modern MERN/Next.js stack, Server Actions replace axios.post or fetch('/api/...').
 * They are asynchronous finctions that run on the server but can be called directly from the React components.
 * 
 * === Closure-based Security ===
 * When you use a Server Action, Next.js automatically creates a POST endpoint for you.
 * -> The Benefit: No need to manage API URLs or state for "loading/error" manually (you can use the useFormStatus hook).
 * -> The Security Rule: Since these actions run on the server, we must perform Server-side Validation (Using a library like Zod) because client-side validation can be easily bypassed by hakers.
 * 
 */

// MICROLAB
// Create a "Secure Form Action" that handles a user update.
// It must validate the data on the server before touching the database.

// file: actions.js
'use server'    // This directive tells Next.js: "Run this Only on the server"
import { z } from 'zod';
import dbConnect from '@/lib/db';

const schema = z.object({
    username: z.string().min(3).max(20),
});

export async function updateUsername(formData) {
    const validatedFields = schema.sageParse({
        username: formData.get('username'),
    });

    if (!validatedFields.success) {
        return { error: "Invalid username format" };
    }

    await dbConnect();
    // Update logic here...
    return { success: true };
}