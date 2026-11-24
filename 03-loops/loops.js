/**
 * ============================================================================
 *  03 · LOOPS
 * ============================================================================
 *  WHAT:  A way to repeat a block of code.
 *  WHY:   Doing the same thing 100 times by hand is impossible.
 *  HOW:   for (known count), while/do...while (unknown count),
 *         for...of (values), for...in (object keys).
 *  GOTCHA: for...in walks inherited properties and is for OBJECTS, not arrays.
 *          Use for...of for arrays.
 * ============================================================================
 */

// ── 1. Classic for loop ──────────────────────────────────────────────────
// Syntax: for (initialise; condition; update) { ... }

console.log("1) classic for (1 to 5):");
for (let i = 1; i <= 5; i++) {
  console.log("   i =", i);
}

// Counting backwards
for (let i = 3; i > 0; i--) {
  console.log("   countdown:", i);
}

// ── 2. while loop ────────────────────────────────────────────────────────
// Use when you don't know in advance how many times you'll loop.

let balance = 1000;
let months = 0;
while (balance < 1500) {
  balance += 200;
  months++;
}
console.log(`\n2) while: needed ${months} months to reach ₹${balance}`);

// ⚠️ The classic infinite loop — always make sure the condition changes:
// while (true) { console.log("forever"); } // ❌ never do this by accident

// ── 3. do...while ────────────────────────────────────────────────────────
// Always runs at least ONCE, because the check happens after the body.

let attempts = 0;
do {
  console.log("3) do...while attempt #", ++attempts);
} while (attempts < 3);

// Real example: ask until valid input (simulated here)
let pin;
do {
  pin = Math.floor(1000 + Math.random() * 9000);
  console.log("3) generated PIN:", pin);
} while (String(pin).length !== 4);

// ── 4. for...of — iterate over VALUES ────────────────────────────────────

const fruits = ["apple", "banana", "cherry"];

console.log("\n4) for...of (arrays):");
for (const fruit of fruits) {
  console.log("   ", fruit);
}

// Also works on strings
for (const char of "JS") {
  console.log("   char:", char);
}

// With index, thanks to entries()
for (const [index, fruit] of fruits.entries()) {
  console.log(`   ${index}: ${fruit}`);
}

// ── 5. for...in — iterate over KEYS (objects) ────────────────────────────

const student = { name: "Sumit", age: 22, city: "Patna" };

console.log("\n5) for...in (object keys):");
for (const key in student) {
  console.log(`   ${key} = ${student[key]}`);
}

// Modern alternative, usually cleaner:
for (const [key, value] of Object.entries(student)) {
  console.log(`   entries: ${key} = ${value}`);
}

// ❌ GOTCHA: for...in on arrays gives string indexes and can include
// inherited properties. Prefer for...of for arrays.
console.log("\n   for...in on an array gives:", Object.keys(fruits));

// ── 6. break and continue ────────────────────────────────────────────────

console.log("\n6) break / continue:");

for (let i = 1; i <= 10; i++) {
  if (i === 3) continue; // skip 3
  if (i === 7) break;    // stop completely at 7
  console.log("   ", i);
}

// find the first number divisible by 7
for (let n = 20; ; n++) { // no condition = runs until break
  if (n % 7 === 0) {
    console.log("   first multiple of 7 after 20:", n);
    break;
  }
}

// ── 7. Nested loops ──────────────────────────────────────────────────────

console.log("\n7) nested loops (multiplication row):");
for (let row = 1; row <= 3; row++) {
  let line = "";
  for (let col = 1; col <= 3; col++) {
    line += ` ${row * col}`;
  }
  console.log("   ", line);
}

// ── 8. Array methods vs loops ────────────────────────────────────────────

// You CAN do everything with loops, but these methods read better:
const doubled = fruits.map((f) => f.toUpperCase());
const longNames = fruits.filter((f) => f.length > 5);
const totalLength = fruits.reduce((sum, f) => sum + f.length, 0);

console.log("\n8) array methods:");
console.log("   doubled:", doubled);
console.log("   long names:", longNames);
console.log("   total characters:", totalLength);

// ── 9. One-line summary ──────────────────────────────────────────────────
// for = known count  •  while = unknown count  •  do...while = at least once
// for...of = array VALUES  •  for...in = object KEYS
// break exits, continue skips. Prefer map/filter/reduce when transforming data.
