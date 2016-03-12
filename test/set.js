var Set = require('../Set');

var set = new Set();

console.log('set:')

set.join(1);
console.log(set.toString());
set.join(1);
console.log(set.toString());
set.join(2);
console.log(set.toString());
set.join(3);
console.log(set.toString());
set.join(4);
console.log(set.toString());
set.join(4);
console.log(set.toString());
set.quit(3);
console.log(set.toString());
set.quit(1);
console.log(set.toString());
set.quit(1);
console.log(set.toString());
set.quit(2);
console.log(set.toString());
set.quit(4);

var set1 = new Set();

set1.join(1);
set1.join(2);

var set2 = new Set();

set2.join(2);
set2.join(3);

console.log('union:');
console.log(Set.union(set1, set2).toString());

console.log('intersection:');
console.log(Set.intersection(set1, set2).toString());

console.log('difference:');
console.log(Set.difference(set1, set2).toString());