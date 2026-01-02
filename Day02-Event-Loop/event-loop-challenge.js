console.log('1'); // Synchronous -> Call Stack
setTimeout(() => console.log('2'), 0); // Macrotask -> Task Queue
Promise.resolve().then(() => console.log('3')); // Microtask -> High Priority
console.log('4'); // Synchronous -> Call Stack