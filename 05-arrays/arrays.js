/**
 * ============================================================================
 *  05 · ARRAYS
 * ============================================================================
 *  WHAT:  An ordered list of values.
 *  WHY:   Most real data is a list — users, orders, log lines, marks.
 *  HOW:   Learn which methods MUTATE the original and which return a NEW array.
 *  GOTCHA: sort() mutates and sorts as strings unless you give a comparator.
 * ============================================================================
 */

// ── 1. Creating arrays ───────────────────────────────────────────────────

const fruits = ["apple", "banana", "cherry"];
const numbers = [10, 20, 30, 40, 50];
const mixed = ["text", 42, true, null, { key: "value" }];
const empty = new Array(3); // 3 empty slots — rarely what you want

console.log("1) fruits:", fruits);
console.log("   length:", fruits.length);
console.log("   first:", fruits[0], "| last:", fruits[fruits.length - 1]);
console.log("   mixed:", mixed);

// Arrays can hold anything, but keeping one type per array is healthier.

// ── 2. MUTATING methods (they CHANGE the original) ───────────────────────

const cart = ["apple"];

cart.push("banana");       // add to the END
cart.unshift("milk");      // add to the START
console.log("2) after push/unshift:", cart);

const last = cart.pop();       // remove from the END, returns removed item
const first = cart.shift();    // remove from the START
console.log("   removed:", first, "and", last, "→ left:", cart);

cart.splice(1, 1, "orange");   // at index 1, delete 1, insert "orange"
console.log("   after splice:", cart);

cart.reverse();
console.log("   after reverse (MUTATES!):", cart);

cart.fill("x", 0, 1);
console.log("   after fill:", cart);

// ⚠️ sort() mutates and compares as STRINGS by default:
const messy = [10, 2, 1];
console.log("   [10,2,1].sort() =", [...messy].sort(), "→ wrong order!");
messy.sort((a, b) => a - b); // numeric ascending
console.log("   with comparator =", messy);
console.log("   toSorted (non-mutating) =", [10, 2, 1].toSorted((a, b) => a - b));

// ── 3. NON-MUTATING methods (they give you a NEW array) ───────────────────

const nums = [1, 2, 3, 4, 5, 6];

console.log("\n3) non-mutating:");
console.log("   slice(1,4):", nums.slice(1, 4), "| original still:", nums);
console.log("   concat([7,8]):", nums.concat([7, 8]));
console.log("   [...nums, 7]:", [...nums, 7]);
console.log("   map(n => n*2):", nums.map((n) => n * 2));
console.log("   filter(even):", nums.filter((n) => n % 2 === 0));
console.log("   toReversed():", nums.toReversed(), "| original:", nums);

// ── 4. find / findIndex / includes / indexOf ──────────────────────────────

console.log("\n4) searching:");
console.log("   find(n > 4):", nums.find((n) => n > 4));
console.log("   findIndex(n === 4):", nums.findIndex((n) => n === 4));
console.log("   includes(3):", nums.includes(3));
console.log("   indexOf(99):", nums.indexOf(99), "→ -1 means not found");

const users = [
  { id: 1, name: "Sumit", active: true },
  { id: 2, name: "Riya", active: false },
  { id: 3, name: "Aman", active: true },
];
console.log("   first active user:", users.find((u) => u.active));

// ── 5. some / every ──────────────────────────────────────────────────────

console.log("\n5) some / every:");
console.log("   some active?", users.some((u) => u.active));        // any
console.log("   every active?", users.every((u) => u.active));     // all
console.log("   every id positive?", users.every((u) => u.id > 0));

// ── 6. reduce — the swiss army knife ─────────────────────────────────────

// reduce(callback, initialValue) → callback(accumulator, current)
const total = nums.reduce((sum, n) => sum + n, 0);
console.log("\n6) reduce sum:", total);

const product = nums.reduce((acc, n) => acc * n, 1);
console.log("   reduce product:", product);

// Grouping with reduce
const words = ["apple", "banana", "avocado", "apricot", "blueberry"];
const byFirstLetter = words.reduce((groups, word) => {
  const letter = word[0];
  groups[letter] = groups[letter] || [];
  groups[letter].push(word);
  return groups;
}, {});
console.log("   grouped by first letter:", byFirstLetter);

// ── 7. flat / flatMap ────────────────────────────────────────────────────

const nested = [1, [2, 3], [4, [5]]];
console.log("\n7) flat(1):", nested.flat(1));
console.log("   flat(Infinity):", nested.flat(Infinity));
console.log("   flatMap:", [1, 2, 3].flatMap((n) => [n, n * 10]));

// ── 8. Joining and splitting ─────────────────────────────────────────────

console.log("\n8) joining and splitting:");
console.log("   fruits.join(' | ') =", fruits.join(" | "));
console.log("   split:", "a,b,c".split(","));

// ── 9. Destructuring and spread ──────────────────────────────────────────

const [primary, secondary, ...rest] = fruits;
console.log("\n9) destructuring:", { primary, secondary, rest });

const copy = [...fruits];
console.log("   shallow copy:", copy, "| same array?", copy === fruits);
console.log("   merge:", [...fruits, ...["date", "fig"]]);

// ── 10. Copying gotcha: nested arrays ────────────────────────────────────

const originalNested = [[1, 2], [3, 4]];
const shallow = [...originalNested];
shallow[0].push(99);
console.log("\n10) shallow copy changed the original:", originalNested);

const deep = structuredClone(originalNested);
deep[0].push(42);
console.log("   structuredClone kept it safe:", originalNested);

// ── 11. One-line summary ─────────────────────────────────────────────────
// MUTATES: push pop shift unshift splice sort reverse fill
// NEW ARRAY: map filter reduce slice concat flat  •  use toSorted/toReversed
// Always give sort() a comparator. Use structuredClone for nested data.
