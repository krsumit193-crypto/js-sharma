"use strict";

// ===============================
// JavaScript Comparison Operators
// ===============================

// > checks if the left value is greater than the right value
console.log(2 > 1); // true


// JavaScript converts "2" (string) to 2 (number)
// when using relational operators like >, <, >=, <=
console.log("2" > 1); // true


// null is treated as 0 in relational comparisons
console.log(null > 0); // false
console.log(null < 0); // false

// == performs loose equality
// null is NOT equal to 0
console.log(null == 0); // false

// null is converted to 0 in this relational comparison
console.log(null >= 0); // true


// undefined does not get converted to 0
// Comparisons involving undefined return false
console.log(undefined == 0); // false
console.log(undefined > 0);  // false
console.log(undefined < 0);  // false


// ===============================
// Strict Equality (===)
// ===============================

// === checks both value AND data type
// "2" → string
// 2   → number
// Same value, but different data types → false
console.log("2" === 2); // false