/**
 * 
 * === NextAuth.js & OAuth Strategy ===
 * In a "Full-Fledged" MERN app, we shouldn't just build a "Login/Signup" form.
 * We need to supposrt OAuth (Google, Github) and handle Session Persistence without writing 500 lines of boilerplate.
 * 
 * === The Unified Auth Layer ===
 * NextAuth handles the complexity of:
 * 1. OAuth Flow: Managing the "Handshake" between our app and Google/Github.
 * 2. Session Callback: Injecting custome data (like userRole or mongoId) into the session object so it's available on the client and server.
 * 3. Database Adapters: Automatically syncing user profiles to your MongoDB collection.
 * 
 */


// MICROLAB
// Configure a Session Callback in NextAuth. This is crucial because, by default, NextAuth only gives the user's name and email. We need their MongoDB _id to perform any database operations.

// file: app/api/auth/[...nextauth]/route.js
export const authOptions = {
    callbacks: {
        async sessions({ session, token }) {
            // Transger the user ID from the JWT to the Session object
            if (session.user) {
                session.user.id = token.sub;    // token.sub is the MongoDB ID
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role; // Add custom fields to the JWT
            }
            return token;
        }
    }
};