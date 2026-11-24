/**
 * ============================================================================
 *  02 · DATA TYPES
 * ============================================================================
 *  WHAT:  JavaScript has 7 primitive types and one big "object" type.
 *  WHY:   The type decides which operations are legal on a value.
 *  HOW:   Use `typeof` to inspect a value. JS is dynamically typed — a
 *         variable can hold different types at different times.
 *  GOTCHA: typeof null is "object" (a famous bug from 1995).
 * ============================================================================
 */

// ── 1. The 7 primitives ──────────────────────────────────────────────────

const name = "Sumit";            // string  — text
const age = 22;                  // number  — integers AND decimals
const price = 99.99;             // number
const isStudent = true;          // boolean — true / false
const nothing = undefined;       // undefined — declared, never assigned
const empty = null;              // null — deliberately "no value"
const big = 9007199254740993n;   // bigint — huge integers (note the `n`)
const id = Symbol("id");         // symbol — unique, hidden-ish key

console.log("1) primitives:");
console.log("   string  ", name, "→", typeof name);
console.log("   number  ", age, "→", typeof age);
console.log("   boolean ", isStudent, "→", typeof isStudent);
console.log("   undefined", nothing, "→", typeof nothing);
console.log("   null    ", empty, "→", typeof empty);
console.log("   bigint  ", big.toString(), "→", typeof big);
console.log("   symbol  ", id.toString(), "→", typeof id);

// ── 2. Objects (reference types) ─────────────────────────────────────────

// Arrays and functions are objects too — typeof says "object" for arrays.
const person = { name: "Riya", age: 21 };
const marks = [88, 92, 75];
function greet() {}

console.log("\n2) reference types:");
console.log("   object   ", typeof person);
console.log("   array    ", typeof marks, "→ arrays are objects!");
console.log("   function ", typeof greet, "→ 'function', not 'object'");
console.log("   null     ", typeof null, "→ the classic gotcha");

// The reliable way to check for null:
console.log("   is null?", empty === null);

// ── 3. Dynamic typing ────────────────────────────────────────────────────

// One variable, many types. Handy, but it can hide bugs.
let mystery = "hello";
console.log("\n3) mystery starts as", typeof mystery, mystery);

mystery = 42;
console.log("   now it is", typeof mystery, mystery);

mystery = false;
console.log("   now it is", typeof mystery, mystery);

// ── 4. undefined vs null ─────────────────────────────────────────────────

// undefined = "not assigned yet" (usually accidental)
// null      = "assigned, and deliberately empty" (usually intentional)

let notSet;
const setToEmpty = null;

console.log("\n4) undefined:", notSet, "| null:", setToEmpty);
console.log("   loose equal:", notSet == setToEmpty);   // true
console.log("   strict equal:", notSet === setToEmpty); // false

// ── 5. Number quirks worth knowing ───────────────────────────────────────

// JS has one number type. Integers are safe up to Number.MAX_SAFE_INTEGER.
console.log("\n5) max safe integer:", Number.MAX_SAFE_INTEGER);
console.log("   0.1 + 0.2 =", 0.1 + 0.2, "→ floating point, not a JS bug");

const notANumber = "hello" / 2;
console.log("   'hello' / 2 =", notANumber, "→ NaN");
console.log("   is NaN?", Number.isNaN(notANumber));

// ── 6. Checking arrays properly ──────────────────────────────────────────

// typeof [] is "object", so use Array.isArray().
console.log("\n6) Array.isArray([]):", Array.isArray([]));
console.log("   Array.isArray({}):", Array.isArray({}));

// ── 7. One-line summary ──────────────────────────────────────────────────
// 7 primitives: string number boolean undefined null bigint symbol
// Everything else is an object. typeof null === "object" (historic bug).
// Use Array.isArray() for arrays and === null for null.
