// === The Dehydration Pattern ===
// When using tools like React Query or Redux,
// you don't want the user to see a loading spinner on a page that was already rendered by the server.
// 
// === Seamless State Transfer ===
// 1. The Prefetch: On the server (getServerSideProps or Server Components), you fetch the data and prime the cache.
// 
// 2. Dehydration: You take that cache (a JavaScript object) and "serialize" it into a script tag in the HTML.
// 
// 3. Rehydration: When the React app boots up on the client, it reads that script tag and injects the data into the local cache before the first render.
// 
// 4. The Result: 0ms loading time on the client for the initial data.


// MICROLAB
// Implement a prefetching logic using React Query's dehydrate function in a Next.js environment.
import { dehydrate, QueryClient, Hydrate } from '@tanstack/react-query';

// 1. Server-side: Fetch and "Freeze" the data
export async function getServerSideProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(['products'], fetchProducts);

    return {
        props: {
            // Dehydrate the cache into a serializable object
            dehydratedState: dehydrate(queryClient),
        },
    };
}

// 2. Client-side: The data is already in the cache!
export default function Products({ dehydratedState }) {
    const { data } = useQuery(['products'], fetchProducts);
    // This 'data' is available IMMEDIATELY, no loading state.
    return <div>{data.map(p => <p>{p.name}</p>)}</div>;
}