/**
 * ============================================================================
 *  04 · TYPE CONVERSION
 * ============================================================================
 *  WHAT:  Turning one type into another — string ↔ number ↔ boolean.
 *  WHY:   Form inputs and JSON give you strings; maths needs numbers.
 *  HOW:   Prefer explicit conversions (Number(), String(), Boolean()).
 *  GOTCHA: `+` with a string concatenates; `parseInt` silently stops at
 *          the first invalid character.
 * ============================================================================
 */

// ── 1. Implicit conversion (JS does it for you) ──────────────────────────

console.log("1) implicit conversion:");
console.log("   '5' + 2  =", "5" + 2,  "→ string! + wins when a string is present");
console.log("   '5' - 2  =", "5" - 2,  "→ number 3, - forces conversion");
console.log("   '5' * 2  =", "5" * 2,  "→ number 10");
console.log("   '5' / 2  =", "5" / 2,  "→ number 2.5");
console.log("   true + 1 =", true + 1, "→ number 2 (true becomes 1)");
console.log("   null + 1 =", null + 1, "→ number 1 (null becomes 0)");

// Rule: if either side of `+` is a string, you get concatenation.

// ── 2. Explicit conversion to number ─────────────────────────────────────

console.log("\n2) → number:");
console.log("   Number('42')     =", Number("42"));
console.log("   Number('3.14')   =", Number("3.14"));
console.log("   Number('')       =", Number(""));      // 0 — surprising
console.log("   Number('   ')    =", Number("   "));  // 0
console.log("   Number('abc')    =", Number("abc"));  // NaN
console.log("   Number(true)     =", Number(true));   // 1
console.log("   Number(false)    =", Number(false));  // 0
console.log("   Number(null)     =", Number(null));   // 0
console.log("   Number(undefined)=", Number(undefined)); // NaN

// parseInt / parseFloat stop at the first invalid character.
console.log("   parseInt('42px')   =", parseInt("42px"));     // 42
console.log("   parseFloat('3.5kg')=", parseFloat("3.5kg"));  // 3.5
console.log("   parseInt('abc')    =", parseInt("abc"));      // NaN

// Always pass a radix (base) to parseInt to avoid old-browser surprises.
console.log("   parseInt('0x10', 16) =", parseInt("0x10", 16)); // 16

// The unary + is a compact equivalent of Number()
console.log("   +'42' =", +"42", "→", typeof +"42");

// ── 3. Explicit conversion to string ─────────────────────────────────────

console.log("\n3) → string:");
console.log("   String(42)      =", String(42));
console.log("   String(true)    =", String(true));
console.log("   String(null)    =", String(null));
console.log("   (42).toString() =", (42).toString());
console.log("   (255).toString(16) =", (255).toString(16), "→ hex 'ff'");

// Template literals convert for free and read better.
const total = 250;
console.log(`   template: "Total is ₹${total}"`);

// ── 4. Explicit conversion to boolean ────────────────────────────────────

console.log("\n4) → boolean:");
console.log("   Boolean(1)      =", Boolean(1));
console.log("   Boolean(0)      =", Boolean(0));
console.log("   Boolean('')     =", Boolean(""));
console.log("   Boolean('hello')=", Boolean("hello"));
console.log("   Boolean([])     =", Boolean([]), "→ true! empty arrays are truthy");
console.log("   Boolean({})     =", Boolean({}), "→ true! empty objects are truthy");

// The 8 falsy values: false, 0, -0, 0n, "", null, undefined, NaN
const falsyValues = [false, 0, -0, 0n, "", null, undefined, NaN];
console.log("   all falsy values:", falsyValues.map((v) => String(v)).join(", "));

// `!!value` is a compact way to force a real boolean
console.log("   !!'text' =", !!"text", "→", typeof !!"text");

// ── 5. The gotcha: parseInt is too forgiving ─────────────────────────────

console.log("\n5) gotcha:");
console.log("   parseInt('12abc') =", parseInt("12abc"), "→ silently ignores 'abc'");
console.log("   Number('12abc')   =", Number("12abc"), "→ NaN, which is safer");
console.log("   Use Number() for user input; use parseInt only when you expect units.");

// ── 6. Realistic example: form values ────────────────────────────────────

const formAge = "22";        // HTML inputs always give strings
const formName = "  Sumit  ";
const ageAsNumber = Number(formAge);
const trimmedName = formName.trim();

console.log("\n6) form example:");
console.log("   raw:", formAge, typeof formAge);
console.log("   converted:", ageAsNumber, typeof ageAsNumber);
console.log("   next year:", ageAsNumber + 1);
console.log("   cleaned name:", trimmedName);

// Always validate before trusting input
if (Number.isNaN(ageAsNumber)) {
  console.log("   ❌ please enter a valid number");
} else {
  console.log("   ✅ valid age");
}

// ── 7. One-line summary ──────────────────────────────────────────────────
// '+' + string = concatenation  •  Number() for strict parsing
// String() / template literals for text  •  Boolean() / !! for truth
// Empty arrays and objects are TRUTHY — check .length / Object.keys().
