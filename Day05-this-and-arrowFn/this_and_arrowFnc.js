/**
 * The "this" Keyword:-
 * The value of this is determined by how a function is called, not where it is defined.
 * 
 * The Four Binding Rules:-
 * Implicit Binding: When a function is called as a method (e.g., obj.greet()), this is the object before the dot.
 * Explicit Binding: Using .call(), .apply(), or .bind() to manually tell JS what this should be.
 * New Binding: When using the new keyword, this points to the newly created object.
 * Default Binding: In a standalone function call, this is the window (or undefined in strict mode).
 * 
 * 
 * The Arrow Function Exception:-
 * Arrow functions do not have their own this.
 * They inherit it from the surrounding code (lexical scope).
 */

// MicroLab: Create an object and try to "borrow" its method for another object.
const user1 = { name: "Kunal" };
const user2 = { name: "user2" };

function sayHi(greeting) {
    console.log(`${greeting}, I am ${this.name}`);
}

sayHi.call(user1, "Hello");
sayHi.apply(user2, ["Hey"]);
const boundFunc = sayHi.bind(user1, "Namaste");
boundFunc();