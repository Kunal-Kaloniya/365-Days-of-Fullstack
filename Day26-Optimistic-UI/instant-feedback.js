/**
 * 
 * === Optimistic UI with React Query ===
 * In a standard app, you click "Submit", wait for the the API, then refresh the list.
 * In a "Full-fledged" app, you update the UI immediately based on what you expect to happen.
 * 
 * === The "Undo" Pattern ===
 * 1. Cancel Outgoing Refetches: Stop any active fetches for that data so they don't overwrite your optimistic update.
 * 2. Snapshot the Cache: Save the current data in case you need to roll back.
 * 3. Optimistically Update: Manually inject the new data into the React Query cache.
 * 4. Error Handling: If the API call fails, use the the snapshot to revert the UI to the previous state.
 * 
 */


// MICROLAB
// Implement a "Like Button" or "Task Toggle" that uses useMutation with an onMutate callback for instant feedback.

const queryClient = useQueryClient();

const mutation = useMutation({
    mutationFn: updateTaskStatus,
    onMutate: async (newTask) => {
        // 1. Cancel any outgoing refetches
        await queryClient.cancelQueries({ queryKey: ['tasks'] });
        // 2. Snapshot the previous value
        const previousTasks = queryClient.getQueryData(['tasks']);
        // 3. Optimistically update to the new value
        queryClient.setQueryData(['tasks'], (old) => [...old, newTask]);
        // 4. Return context object with snapshot
        return { previousTasks };
    },
    onError: (err, newTask, context) => {
        // 5. Rollback on error
        queryClient.setQueryData(['tasks'], context.previousTasks);
    },
});