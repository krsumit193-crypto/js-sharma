/**
 * ============================================================================
 *  01 · VARIABLES
 * ============================================================================
 *  WHAT:  A variable is a named container for a value.
 *  WHY:   Programs need to remember things (a score, a name, a result).
 *  HOW:   declare it, then assign it. In modern JS: const first, let second.
 *  GOTCHA: `var` does not respect blocks and can be declared twice.
 * ============================================================================
 */

// ── 1. The three keywords ────────────────────────────────────────────────

// const: the BINDING cannot be reassigned. Use this by default.
const studentName = "Sumit";
const MAX_STUDENTS = 30; // uppercase is a common convention for constants

// let: the binding CAN be reassigned. Use it when the value must change.
let score = 0;
score = score + 10;  // score is now 10
score += 5;          // shorthand for score = score + 5 → 15

// var: the OLD way. Avoid it in new code (see the gotcha below).
var legacyValue = "from 1995";

console.log("1) studentName:", studentName);
console.log("1) score:", score);
console.log("1) legacyValue:", legacyValue);

// ── 2. Declaration vs assignment ─────────────────────────────────────────

let city;            // declaration — value is `undefined`
console.log("2) before assigning, city =", city);

city = "Patna";       // assignment
console.log("2) after assigning, city =", city);

// You can do both in one line:
let country = "India";

// ── 3. Scope: where a variable is visible ────────────────────────────────

const globalMessage = "I am visible everywhere in this file";

{
  // A block is anything between { and }.
  const blockScoped = "I only live inside this block";
  let alsoBlockScoped = "me too";
  var leaksOutOfBlock = "var ignores blocks";

  console.log("3) inside block:", blockScoped, "|", alsoBlockScoped);
}

console.log("3) outside block, globalMessage:", globalMessage);
console.log("3) outside block, var leaked:", leaksOutOfBlock);
// console.log(blockScoped); // ❌ ReferenceError — it was block-scoped

// ── 4. The gotcha, demonstrated safely ───────────────────────────────────

var duplicate = "first";
var duplicate = "second"; // ✅ allowed with var — a common source of bugs
console.log("4) var declared twice:", duplicate);

// const duplicate = "first";
// const duplicate = "second"; // ❌ SyntaxError — cannot redeclare

// const does NOT make an object frozen — only the binding is fixed.
const settings = { theme: "dark" };
settings.theme = "light";  // ✅ changing a property is fine
// settings = { theme: "blue" }; // ❌ TypeError — cannot reassign the binding
console.log("4) mutated object inside const:", settings);

// ── 5. Naming rules and style ────────────────────────────────────────────

// Rules: must start with a letter, _ or $; can contain letters, digits, _ and $.
const _privateLooking = 1;
const $element = 2;
// const 1stPlace = "no"; // ❌ cannot start with a digit

// Style: camelCase for variables, UPPER_SNAKE_CASE for real constants.
const totalMarks = 450;

console.log("5) names:", _privateLooking, $element, totalMarks);

// ── 6. One-line summary ──────────────────────────────────────────────────
// const = cannot reassign  •  let = can reassign  •  var = avoid
// Prefer const → let → (never var). Declare close to first use.
