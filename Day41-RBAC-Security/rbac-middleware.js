// === RBAC (Role-Based Access Control) ===
// In a "Full-Fledged" MERN app, security is multi-layered.
// We move away from simple if(isAdmin) checks to a scalable Middleware approach.
// 
// === Permission-Based Authorization ===
// Instead of hardcoding roles, we create a map of permissions.
// This allows you to add new roles (like "Editor" or "Support") in future without rewriting your route logic.
// 1. The Role: A collection of permissions (Admin, Editor, User).
// 2. The Middleware: Intercepts the request, checks the user's role against the required permission for that route, and access if they don't match.


// MICROLAB
// Create a reusable middleware for your Next.js/Express backend that handles multiple allowed roles for a single route.

// Midlleware to restict access based on user role
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        // Assuming req.user is populated by your Auth middleware (Day 24)
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Forbidden: You do not have permission to perform this action"
            });
        }
        next();
    };
};

// Usage in an Express route:
app.delete('/api/products/:id', authorize('admin', 'manager'), (req, res) => {
    // Only admins or managers can reach this point
    res.json({ message: "Product deleted" });
})