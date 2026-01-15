/**
 * 
 * === Socket Security & Namespaces ===
 * In a professional MERN app, we don't just open a socket to the world.
 * We need to ensure that only authenticated users connect and that different features
 * (Chat, Notifications, Admin) don't interfere with each other.
 * 
 * === Namespaces vs. Rooms ===
 * Namespaces (/admin, /chat): Used to separate concerns at the connection level.
 * Each namespace can have its own authentication middleware.
 * 
 * Rooms: Used within a namespace to group specific users (e.g., "Room#505" for a specific chat group)
 * 
 * === Connection Middleware (The "Guard") ===
 * Never let a socket connect without verifying their JWT.
 * Since WebSockets start with an HTTP handshake, you can intercept that request.
 * 
 */


// MICROLAB
// Create a secure Namespace with custom middleware that checks for a valid token before allowing the connection.

const chatNamespace = io.of("/chat");

// Middleware for the /chat namespace
chatNamespace.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (verifyJWT(token)) {
        next();
    } else {
        next(new Error("Authentication error"));
    }
});

chatNamespace.on("connection", (socket) => {
    console.log("Authenticated user connected to Chat");
});