var Queue = require('../Queue');

var queue = new Queue();

console.log('queue:');

queue.enqueue(1);
console.log(queue.toString());
queue.enqueue(2);
console.log(queue.toString());
queue.enqueue(3);
console.log(queue.toString());
queue.enqueue(4);
console.log(queue.toString());
queue.dequeue();
console.log(queue.toString());
queue.dequeue();
console.log(queue.toString());
queue.dequeue();
console.log(queue.toString());
queue.dequeue();