/*
* This is how JavaScript "remembers" its environment even after a function has finished executing.
*
* Why it matters in MERN:
* Data Privacy: Creating "private" variables that can't be accessed from the outside.
*
* State Management: Many React Hooks (like useState) rely on closures to maintain state across renders.
*/


// Create a function createCounter that returns another function. The inner function should increment a private variable and return it.

function createCounter() {
    let count = 0; // Private variable
    return function() {
        count++;
        return count;
    };
}
const counter = createCounter();
console.log(counter());
console.log(counter());