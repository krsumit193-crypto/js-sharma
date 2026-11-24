/**
 * ============================================================================
 *  03 · OPERATORS
 * ============================================================================
 *  WHAT:  Symbols that compute a value (+, ===, &&, ??, ...).
 *  WHY:   They are the verbs of programming — compare, combine, decide.
 *  HOW:   Learn them in groups: arithmetic, assignment, comparison, logical.
 *  GOTCHA: `==` converts types; use `===` instead.
 * ============================================================================
 */

const a = 10;
const b = 3;

// ── 1. Arithmetic ────────────────────────────────────────────────────────
console.log("1) arithmetic:");
console.log("   a + b =", a + b);   // 13  addition
console.log("   a - b =", a - b);   //  7  subtraction
console.log("   a * b =", a * b);   // 30  multiplication
console.log("   a / b =", a / b);   // 3.333… division
console.log("   a % b =", a % b);   //  1  remainder (modulo)
console.log("   a ** b =", a ** b); // 1000 exponent (ES2016)

// The remainder trick: even or odd?
console.log("   7 is even?", 7 % 2 === 0);
console.log("   8 is even?", 8 % 2 === 0);

// ── 2. Assignment (shorthand) ────────────────────────────────────────────
let x = 5;
x += 2;  // x = x + 2  → 7
x -= 1;  // x = x - 1  → 6
x *= 3;  // x = x * 3  → 18
x /= 2;  // x = x / 2  → 9
x %= 4;  // x = x % 4  → 1
x **= 3; // x = x ** 3 → 1
console.log("\n2) after shorthand assignments, x =", x);

// ── 3. Increment / decrement ─────────────────────────────────────────────
let count = 0;
count++;  // postfix: use the value, then add 1
++count;  // prefix:  add 1, then use the value
count--;
console.log("3) count:", count);

// ── 4. Comparison ────────────────────────────────────────────────────────
console.log("\n4) comparison:");
console.log("   10 > 3 :", 10 > 3);
console.log("   10 >= 10:", 10 >= 10);
console.log("   10 < 3 :", 10 < 3);
console.log("   10 <= 9:", 10 <= 9);

// strict === checks type AND value — prefer it always
console.log("   5 === 5  :", 5 === 5);
console.log("   5 === '5':", 5 === "5");
console.log("   5 !== '5':", 5 !== "5");

// GOTCHA: loose == converts types and gives surprising answers
console.log("\n   == vs === :");
console.log("   5 == '5'      :", 5 == "5");      // true  (converted)
console.log("   0 == false    :", 0 == false);    // true
console.log("   '' == 0       :", "" == 0);       // true
console.log("   null == undefined:", null == undefined); // true
console.log("   NaN === NaN   :", NaN === NaN);   // false (!)
console.log("   Number.isNaN(NaN):", Number.isNaN(NaN)); // true — correct check

// Note: `+` with a string concatenates instead of adding
console.log("   '5' + 5 =", "5" + 5, "→ string concatenation!");

// ── 5. Logical operators ─────────────────────────────────────────────────
const loggedIn = true;
const isAdmin = false;

console.log("\n5) logical:");
console.log("   loggedIn && isAdmin :", loggedIn && isAdmin); // AND → both
console.log("   loggedIn || isAdmin :", loggedIn || isAdmin); // OR  → either
console.log("   !loggedIn           :", !loggedIn);           // NOT → flip

// Short-circuiting: the right side is skipped when it is not needed.
const userName = loggedIn && "Sumit";
console.log("   true && 'Sumit' =", userName);
console.log("   false && sideEffect =", false && console.log("never runs"));

// ── 6. Nullish coalescing (??) ───────────────────────────────────────────

// `||` treats 0, "" and false as missing. `??` only treats null/undefined
// as missing — usually what you actually mean.
const zero = 0;
console.log("\n6) || vs ?? :");
console.log("   0 || 10 =", zero || 10);  // 10 — 0 is falsy, oops
console.log("   0 ?? 10 =", zero ?? 10);  // 0  — correct

const savedPort = null;
console.log("   null ?? 3000 =", savedPort ?? 3000); // 3000

// ── 7. Optional chaining (?.) ────────────────────────────────────────────

// Stops safely instead of throwing when something is null/undefined.
const user = { profile: { city: "Patna" } };
const guest = {};

console.log("\n7) optional chaining:");
console.log("   user.profile?.city =", user.profile?.city);       // "Patna"
console.log("   guest.profile?.city =", guest.profile?.city);     // undefined
console.log("   user.profile?.getName?.() =", user.profile?.getName?.()); // undefined

// ── 8. Ternary (conditional) operator ────────────────────────────────────

const marks = 78;
const result = marks >= 40 ? "PASS" : "FAIL";
console.log("\n8) ternary result:", result);

// Chained ternary — readable only for simple cases
const grade = marks >= 90 ? "A" : marks >= 75 ? "B" : marks >= 40 ? "C" : "F";
console.log("   grade:", grade);

// ── 9. typeof operator ───────────────────────────────────────────────────
console.log("\n9) typeof 'Hi':", typeof "Hi");
console.log("   typeof 42:", typeof 42);

// ── 10. One-line summary ─────────────────────────────────────────────────
// === not ==  •  ?? for defaults  •  ?. for safe access  •  % for remainder
// && and || short-circuit, which makes them useful beyond true/false.
