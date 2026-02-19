// === Rendering Patterns (SSR vs. CSR) ===
// Up until now, you've likely used Client-Side Rendering (CSR). Today, we master Server-Side Rendering (SSR) and Static Site Generation (SSG) using Next.js App Router.
// 
// === The Hydration Process ===
// 1. CSR (Client-Side Rendering): The server sends a blank HTML file and a big JavaScript bundle. THe browser executes the JS to build the UI. (Slow initial load, bad for SEO).
// 2. SSR (Server-Side Rendering): The server pre-renders the HTML with the data already in it. The browser shows the page immediately, then "Hydrates" it (attacher event listeners). (Fast initial load, great for SEO).
// 3. SSG (Static Site Generation): The page is built once at build time and served like a static file. (The fastest possible speed).


// MICROLAB
// Convert a "Product Detail" page from a client-side fetch to a Server Component. This eliminates the "Loading Spinner" because the data is fetched on the server before the user even sees the page.
// This is a Server Component by default in Next.js App Router
import { getProduct } from '@/lib/api';

export default async function ProductPage({ params }: { params: { id: string } }) {
    // 1. Data fetching happens on the SERVER
    const product = await getProduct(params.id);

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
            <span className="text-xl font-mono">${product.price}</span>

            {/* 2. Only interactive parts are Client Components */}
            <AddToCartButton productId={product.id} />
        </main>
    );
}