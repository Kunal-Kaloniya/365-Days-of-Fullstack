// === Postman Workflows ===
// In a "Full-Fledged" app, you don't just send a list of URLs.
// You send a Collection that includes pre-configured authentication, environment variables, and automated tests.
// 
// === Environment Decoupling ===
// 1. Environments: Instead of hardcoding http://localhost:3000, your use a variable {{baseUrl}}. This allows you to switch from Local to Staging to Production with one click.
// 2. Pre-request Scripts: Automatically fetch a new JWT token and inject it into the headers of all subsequent requests.
// 3. Collection Runners: Run all yourAPI endpoints in sequence to ensure a "Happy Path" (User Sign up -> Login -> Create Post -> Delete Post) works perfectly.


// MICROLAB
// Create a Postman Collection for your Auth flow. Use a Tests script to automatically save the JWT from a login response into a flobal variable.

// This script runs automatically after a succssful login request.
if (pm.response.code === 200) {
    const jsonData = pm.response.json()
    // Save the token to the environment
    pm.environment.set("jwt_token", jsonData.token);
    console.log("Token saved to environment");
}