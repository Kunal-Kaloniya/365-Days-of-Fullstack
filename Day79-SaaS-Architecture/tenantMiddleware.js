// === Multi-Tenant Database Design ===
// There are three ways to do this: Shared Database (Discriminator Column), Separate Schemas, or Separate Databases.
// We will focus on the Shared Database + Tenant ID approach, which is the most scalable for MERN apps.
// 
// === Data Isolation ===
// 1. The Tenant ID: Every table/collection (Users, Orders, Products) gets a tenantId field.
// 2. The Middleware Filter: You never write User.find(). You write a middleware that extracts the tenant from the URL (e.g., apple.mysaas.com) and automatically injects { tenantId: 'apple' } into every query.
// 3. Subdomain Routing: Using Nginx or Express to parse req.headers.host to identify which customer is accessing the system.
// 4. Security: A "Cross-Tenant Data Leak" is a critical P0 bug. We use Row-Level Security or strict Query Wrappers to ensure Tenant A can never see Tenant B's data.


// MICROLAB
// Implement an Express middleware that identifies the tenant from the subdomain and attaches a scoped "Tenant-Aware" database model to the request.
// 1. Identify Tenant from Subdomain (e.g., user1.saas.com)
export const identifyTenant = (req, res, next) => {
    const host = req.headers.host; // e.g., "apple.lvh.me:3000"
    const subdomain = host.split('.')[0];

    if (!subdomain || subdomain === 'www') {
        return res.status(400).json({ error: "Invalid Tenant" });
    }

    req.tenantId = subdomain;
    next();
};

// 2. Scoped Query Wrapper (The "Safe" way to fetch)
export const getTenantData = async (Model, req, query = {}) => {
    // Force the tenantId into every single database call
    return await Model.find({ ...query, tenantId: req.tenantId });
};