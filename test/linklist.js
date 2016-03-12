var LinkList = require('../LinkList');

var list = new LinkList();

list.insert(1);
list.insert(2);
list.insert(3);
list.insert(4);

console.log('before:');
console.log(list.toString());

list.remove();

console.log('after:');
console.log(list.toString());