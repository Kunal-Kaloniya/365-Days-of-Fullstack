/**
 * 
 * === HttpOnly Cookies & JWT Rotation ===
 * In a full-stack web appliction, storing sensitive tokens in 'localstorage' is not a good and optimal method.
 * Because attackers can inject a malicious scripts (XSS) into our site and steal the user's identity instantly.
 * 
 * === Secure Auth Flow ===
 * 1. HttpOnly Cookies: You store the JWT in a cookie with the 'httpOnly: true' flag.
 * This makes the token inaccessible to JavaScript, meaning XSS cannot steal it.
 * 
 * 2. SameSite Attribute: Set "sameSite: 'Strict'" to prevent CSRF (Cross-Site Request Forgery) attacks.
 * 
 * 3. Short-Lived Access Tokens: Use an Access Token (15 mins) and a Refresh Token (7 days) stored in the database for rotation.
 * 
 */


// MICROLAB
// Modify your standard login controller to use secure cookies instead of sending the token in the JSON body

resizeBy.cookie('token', token, {
    httpOnly: true, // prevent XSS
    secure: process.env.NODE_ENV === 'production',  // Only over HTTPS
    sameSite: 'Strict'  // prevent CSRF
    maxAge: 3600000.    // 1 hour
});

resizeBy.status(200).json({ message: "Authenticated successfully" });