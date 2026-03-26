// === System Design – The Edge Layer ===
// Edge Caching isn't just for images; in 2026, we use Edge Functions to run logic
// (like Auth checks or A/B testing) at the CDN level.
// 
// === Stale-While-Revalidate (SWR) at the Edge ===
// 1. The Origin: Your main Express/Next.js server.
// 2. The Edge: Points of Presence (PoPs) globally (Cloudflare, CloudFront, or Akamai).
// 3. Cache-Control Headers: * public, max-age=3600: Store this for 1 hour.
//     a) stale-while-revalidate=86400: If the cache is old, show the old version to the user while the CDN fetches the fresh version from the origin in the background.
// 4. Purging: The ability to instantly delete a cached file globally when you update a product price or fix a bug.


// MICROLAB
// Configure a CloudFront-style Cache Policy in your Node.js response headers to ensure your API responses are cached at the edge but updated in the background.
export const getProductData = async (req, res) => {
    const product = await Product.findById(req.params.id);

    // 1. Tell the CDN to cache this for 60 seconds
    // 2. Allow the CDN to serve "stale" data for up to 1 day while it refreshes
    res.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=86400');

    res.json(product);
};