/**
 * ============================================================================
 *  04 · FUNCTIONS
 * ============================================================================
 *  WHAT:  A named, reusable block of code.
 *  WHY:   Avoid repetition, hide complexity, split a problem into pieces.
 *  HOW:   declaration, expression, arrow function, parameters + return.
 *  GOTCHA: Arrow functions do NOT have their own `this` (see 10-oop).
 * ============================================================================
 */

// ── 1. Function declaration ──────────────────────────────────────────────

// The classic form. Declarations are hoisted, so you can call before defining.
function add(a, b) {
  return a + b;       // `return` exits the function and sends a value back
}

console.log("1) add(2, 3) =", add(2, 3));
console.log("   calling before the line it's written:", subtract(9, 4));

function subtract(a, b) {
  return a - b;
}

// A function with no return gives back `undefined`.
function logOnly(message) {
  console.log("   logOnly says:", message);
}
console.log("   logOnly returned:", logOnly("hi"));

// ── 2. Function expression ───────────────────────────────────────────────

// A function stored in a variable. NOT hoisted like a declaration.
const multiply = function (a, b) {
  return a * b;
};
console.log("2) multiply(4, 5) =", multiply(4, 5));

// ── 3. Arrow functions (the modern default) ──────────────────────────────

// Short syntax: (params) => expression (implicit return)
const square = (n) => n * n;
const greet = (name) => `Hello, ${name}!`;
const noArgs = () => "I take no arguments";

console.log("\n3) square(6) =", square(6));
console.log("   greet('Riya') =", greet("Riya"));
console.log("   noArgs() =", noArgs());

// With a body, you MUST use `return` explicitly:
const cube = (n) => {
  const result = n * n * n;
  return result;
};
console.log("   cube(3) =", cube(3));

// Arrow functions are perfect for array callbacks:
const numbers = [1, 2, 3, 4];
console.log("   doubled:", numbers.map((n) => n * 2));

// ── 4. Parameters and defaults ───────────────────────────────────────────

function introduce(name, age = 18, city = "unknown") {
  return `${name} is ${age} from ${city}`;
}

console.log("\n4) introduce defaults:");
console.log("   ", introduce("Sumit"));
console.log("   ", introduce("Riya", 21, "Patna"));
console.log("   ", introduce("Aman", undefined, "Delhi")); // use default age

// ── 5. Rest parameters (...args) ─────────────────────────────────────────

// Collects any number of arguments into a real array.
function sum(...values) {
  return values.reduce((total, n) => total + n, 0);
}

console.log("\n5) sum(1,2,3) =", sum(1, 2, 3));
console.log("   sum(10,20,30,40) =", sum(10, 20, 30, 40));

// Rest is the opposite of SPREAD, which expands an array into arguments:
const scores = [88, 92, 75];
console.log("   sum(...scores) =", sum(...scores));

// ── 6. Returning multiple values ─────────────────────────────────────────

function minMax(...values) {
  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
}
console.log("\n6) minMax:", minMax(5, 2, 9, 1));

// ── 7. Callbacks ─────────────────────────────────────────────────────────

// A function passed INTO another function, called later.
function processUser(name, callback) {
  const cleaned = name.trim().toUpperCase();
  callback(cleaned);
}

processUser("  sumit  ", (cleanName) => {
  console.log("7) cleaned name from callback:", cleanName);
});

// ── 8. IIFE — Immediately Invoked Function Expression ────────────────────

// Runs as soon as it is defined. Used to create a private scope.
(function () {
  const secret = "only inside the IIFE";
  console.log("8) IIFE:", secret);
})();

// ── 9. Closures — functions that remember ────────────────────────────────

function makeCounter() {
  let count = 0;                 // private variable
  return function increment() {
    count += 1;
    return count;
  };
}

const nextValue = makeCounter();
console.log("\n9) closure counter:");
console.log("   ", nextValue()); // 1
console.log("   ", nextValue()); // 2
console.log("   ", nextValue()); // 3

// Function factory with configuration
function makeMultiplier(factor) {
  return (n) => n * factor;
}
const times3 = makeMultiplier(3);
console.log("   times3(7) =", times3(7));

// ── 10. Recursion — a function calling itself ────────────────────────────

function factorial(n) {
  if (n <= 1) return 1;          // base case: stops the recursion
  return n * factorial(n - 1);   // recursive case
}

console.log("\n10) factorial(5) =", factorial(5)); // 120

// ── 11. Scope inside functions ───────────────────────────────────────────

const outer = "I am outside";
function showScope() {
  const inner = "I am inside";
  console.log("11) can see:", outer, "|", inner);
}
showScope();
// console.log(inner); // ❌ ReferenceError — inner is not visible outside

// ── 12. One-line summary ─────────────────────────────────────────────────
// Prefer `const fn = (x) => ...` for callbacks and small helpers.
// Use declarations when you need hoisting. ...rest collects, ...spread expands.
// Closures = function + its remembered surroundings.
