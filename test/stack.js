var Stack = require('../Stack');

var stack = new Stack();

console.log('stack:');

stack.push(1);
console.log(stack.toString());
stack.push(2);
console.log(stack.toString());
stack.push(3);
console.log(stack.toString());
stack.push(4);
console.log(stack.toString());
stack.pop();
console.log(stack.toString());
stack.pop();
console.log(stack.toString());
stack.pop();
console.log(stack.toString());
stack.pop();