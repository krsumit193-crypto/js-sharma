/**
 * ============================================================================
 *  02 · CONTROL FLOW — CONDITIONS
 * ============================================================================
 *  WHAT:  Code that chooses which path to run based on a condition.
 *  WHY:   Programs must react differently to different inputs.
 *  HOW:   if / else if / else, switch, the ternary operator, guard clauses.
 *  GOTCHA: A condition can be ANY value, not just true/false. Truthiness
 *          can surprise you ([] and {} are truthy!).
 * ============================================================================
 */

// ── 1. if / else ─────────────────────────────────────────────────────────

const marks = 78;

if (marks >= 90) {
  console.log("1) Grade A — excellent!");
} else if (marks >= 75) {
  console.log("1) Grade B — very good!");
} else if (marks >= 40) {
  console.log("1) Grade C — passed.");
} else {
  console.log("1) Grade F — try again.");
}

// Only the FIRST matching branch runs. Order matters:
// if (marks >= 40) came first, everyone would get "passed".

// ── 2. Truthiness in conditions ──────────────────────────────────────────

// JS converts the condition to a boolean automatically.
const username = "Sumit";

if (username) {
  console.log("2) username exists:", username);
}

if ([] ) console.log("2) [] is TRUTHY — an empty array still passes");
if ({}) console.log("2) {} is TRUTHY — an empty object still passes");
if (0)  console.log("never runs — 0 is falsy");
if ("") console.log("never runs — empty string is falsy");

// Correct emptiness checks:
const cart = [];
if (cart.length === 0) console.log("2) cart is empty (checked .length)");

// ── 3. Logical operators in conditions ───────────────────────────────────

const age = 22;
const hasPermission = true;

if (age >= 18 && hasPermission) {
  console.log("3) allowed — both conditions are true");
}

if (age < 18 || !hasPermission) {
  console.log("3) denied");
} else {
  console.log("3) not denied — at least one path is clear");
}

// ── 4. switch ────────────────────────────────────────────────────────────

// Best when you compare ONE value against several exact options.
const day = "Monday";

switch (day) {
  case "Monday":
    console.log("4) Monday: weekly planning meeting");
    break;                       // ← without break, it "falls through"
  case "Tuesday":
  case "Wednesday":
    console.log("4) Mid-week: focus work");
    break;
  case "Saturday":
  case "Sunday":
    console.log("4) Weekend: rest and learn JS 😄");
    break;
  default:
    console.log("4) Regular day");
}

// switch uses STRICT equality (===), so "5" and 5 are different.

// ── 5. Ternary operator ──────────────────────────────────────────────────

// A compact one-line if/else for simple choices.
const isLoggedIn = true;
const navText = isLoggedIn ? "Logout" : "Login";
console.log("5) nav button:", navText);

// Nested ternaries work but hurt readability — use sparingly.
const temperature = 32;
const weather = temperature > 35 ? "hot" : temperature > 20 ? "warm" : "cold";
console.log("5) weather:", weather);

// ── 6. Guard clauses (early returns) ─────────────────────────────────────

// Instead of deeply nesting conditions, handle the "bad" cases first.
function processOrder(order) {
  // ❌ nested version (hard to read)
  // if (order) {
  //   if (order.items.length > 0) {
  //     if (order.paid) { return "processing"; }
  //   }
  // }

  // ✅ guard clauses: bail out early
  if (!order) return "no order";
  if (order.items.length === 0) return "empty order";
  if (!order.paid) return "payment pending";

  return "processing";
}

console.log("6) processOrder cases:");
console.log("   ", processOrder(null));
console.log("   ", processOrder({ items: [], paid: true }));
console.log("   ", processOrder({ items: ["book"], paid: false }));
console.log("   ", processOrder({ items: ["book"], paid: true }));

// ── 7. Optional chaining + ?? (a modern condition shortcut) ──────────────

const settings = { theme: "dark" };
console.log("7) font size:", settings.font?.size ?? 16);

// ── 8. One-line summary ──────────────────────────────────────────────────
// if/else for ranges  •  switch for exact matches  •  ternary for simple picks
// Guard clauses keep functions flat. Always check .length, not truthiness.
