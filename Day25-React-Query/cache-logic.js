/**
 * 
 * === TanStack Query (React Query) ===
 * In a "Full-Fledged" MERN app, you shouldn't just use useEffect and useState to fetch data.
 * Why? Because useEffect doesn't handle caching, de-duplication, or background refetching.
 * 
 * === Server-State vs. UI-State ===
 * 1. UI-State: (e.g., "Is this model open?") - Use useState.
 * 2. Server-State: (e.g., "What is the user's profile data?") - Use React Query.
 * 3. The Benefit: If three different components need the "User Profile",
 * React Query will only make one network request and share the cached result with all of them.
 * It also automatically refetches data the user refocuses the window.
 * 
 */


// MICROLAB
// Implement a "Global Data Fetcher" using the useQuery hook.
// This replaces the messy "loading/error" states you usually write manually.
import { useQuery } from '@tanstack/react-query';

function UserProfile() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => fetch(`/api/users/${userId}`).then(res => res.json()),
        staleTime: 1000 * 60 * 5,   // Data stays "fresh" for 5 minutes
    });

    if (isLoading) return <div>Loading from cache/network...</div>;
    if (error) return <div>Error fetching data!</div>;

    return <h1>{data.name}</h1>
}