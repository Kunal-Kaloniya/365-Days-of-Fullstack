// === React Performance Optimization ===
// In a "Full-Fledged" MERN app, as your UI grows, it can become sluggish.
// Every state change might trigger a "render ripple" that slows down the site.
// Professional engineers use memoization to ensure only what needs to change actually changes.
// 
// === The Cost of Re - Rendering ===
// 1. React.memo: Prevents a functional component from re - rendering if its props haven't changed.
// 2. useMemo: "Remembers" the result of an expensive calculation(like filtering a list of 5,000 items) so it doesn't run on every render.
// 3. useCallback: Prevents functions from being "re-created" on every render.This is vital when passing functions as props to memoized children.
// 4. React Profiler: A tool in Chrome DevTools that shows you exactly which components are "wasted renders."


// MICROLAB
// Optimize a heavy list component so that clicking a "Like" button on one item doesn't force the entire list of 100 items to re-render.
import React, { useMemo, useCallback, useState } from 'react';

// 1. Wrap the item in React.memo to prevent unnecessary renders
const ListItem = React.memo(({ item, onSelect }) => {
    console.log(`Rendering: ${item.name}`);
    return (
        <div onClick={() => onSelect(item.id)}>
            {item.name}
        </div>
    );
});

export default function PerformanceDashboard({ data }) {
    const [selectedId, setSelectedId] = useState(null);

    // 2. Memoize the selection handler so the reference stays the same
    const handleSelect = useCallback((id) => {
        setSelectedId(id);
    }, []);

    // 3. Memoize an expensive sort/filter operation
    const sortedData = useMemo(() => {
        return [...data].sort((a, b) => b.score - a.score);
    }, [data]);

    return (
        <div>
            {sortedData.map(item => (
                <ListItem key={item.id} item={item} onSelect={handleSelect} />
            ))}
        </div>
    );
}