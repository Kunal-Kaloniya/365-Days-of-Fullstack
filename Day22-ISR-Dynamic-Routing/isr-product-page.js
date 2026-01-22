/**
 * 
 * === ISR (Incremental Static Regeneration) ===
 * Previously, we chose between SSR (Server-Side Rendering - fresh but slow) and SSG (Static Site Generation - fast but stale).
 * ISR gives you the best of both.
 * 
 * === The "Background Refresh" ===
 * With IST, we can create or update static pages after you've built your site.
 * The Flow:
 *      1. A user visits a page. Next.js serves a cached static version (Instant speed).
 *      2. If the "revalidate" timer has passed, Next.js triggers a rebuild of that specific page in the background.
 *      3. Once the new page is ready, Next.js updates the cache. The next user sees the fresh data.
 * 
 */


// MICROLAB
// Create a dynamic product page that stays lightning-fast but updates its "Stock Level" or "Price" every 60 seconds without a redeploy.

// file: app/products/[id]/page.js
export default async function ProductPage({ params }) {
    const {id} = params;
    const res = await fetch(`https://api.yourdb.com/products/${id}`, {
        next: {revalidate: 60}  // The magic: Revalidate this data every 60 seconds
    });
    const product = await res.json();

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Price: ${product.price}</p>
            <p>Last Updated: {new Date().toLocaleTimeString()}</p>
        </div>
    );
}