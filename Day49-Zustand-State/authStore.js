// === State Management with Zustand ===
// As your app grows, "Prop Drilling" (passing data through 5 components that don't need it just to reach 1 that does) becomes a maintenance nightmare.
// 
// === The Store Pattern ===
// Zustand creates a "Store" - a single source of truth exists outside the React component tree.
// 1. Store: A hook that holds your state and the functions to update it.
// 2. Selectors: You only "subscribe" to the specific piece of data you need. If the cart changes, the Navbar (which shows the count) re-renders, but the Sidebar doesn't.
// 3. Persistence Middleware: One line of code to automatically sync your state with localStorage.


// MICROLAB
// Create an Auth Store that manages user login state and automatically persists it so the user stays logged in even after a page refreash.
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            // Actions
            login: (userData) => set({user: userData, isAuthenticated: true}),
            logout: () => set({user: null, isAuthenticated: false}),
        }),
        {
            name: 'auth-storage',   // Key for localStorage
        }
    )
);

export default useAuthStore;