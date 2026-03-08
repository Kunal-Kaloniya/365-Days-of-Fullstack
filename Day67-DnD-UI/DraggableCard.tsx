// === Drag-and-Drop (DnD) Architecture ===
// React-DnD is the industry standard because it doesn't just "move pixels"; it uses a Data-Driven approach.
// You aren't dragging a "Box"; you are dragging a "Data Object."
// 
// === Dnd Provider & Monitors ===
// 1. DndProvider: The context that wraps your app to enable the HTML5 Drag and Drop API.
// 2. The Drag Source: A component that has a useDrag hook. It defines the "type" (e.g., CARD) and the "item" (the data being moved).
// 3. The Drop Target: A component that has a useDrop hook. It listens for a specific "type" and handles the logic when an item is released.
// 4. Optimistic UI: When a user drops a card, you update the frontend state immediately while the API call to update the database happens in the background.


// MICROLAB
// Build a "Kanban" column where users can drag a "Task" from one status (e.g., To-Do) to another (e.g., Done).
import { useDrag, useDrop } from 'react-dnd';

export const TaskCard = ({ id, text, index, moveCard }) => {
    // 1. Define the Drag Logic
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    // 2. Define the Drop Logic (for reordering)
    const [, drop] = useDrop({
        accept: 'TASK',
        hover: (item: { index: number }) => {
            if (item.index !== index) {
                moveCard(item.index, index);
                item.index = index;
            }
        },
    });

    return (
        <div
            ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            {text}
        </div>
    );
};