/**
 * About Prototypes:
 * In Java or C++, inheritance happens via classes. In JavaScript, objects inherit directly from other objects.
 * 
 * Prototype Chains:
 * Every object in JS has a hidden property called [[Prototype]] (accessible via __proto__ or Object.getPrototypeOf).
 * When you try to access a property that doesn't exist on an object, JS looks "up" the chain to its prototype.
 * 
 */


// MicroLab: Create a "Human" object with a greet method. Then create a "Developer" object that inherits from Human but has its own code method.
const human = {
    greet() {
        console.log("Hello!");
    }
};

const developer = Object.create(human);
developer.code = function () { console.log("Coding in MERN...") };

developer.greet();  // "Hello!" (Inherited)
developer.code();   // "Coding in MERN..." (Own property)