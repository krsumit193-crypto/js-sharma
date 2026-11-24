/**
 * ============================================================================
 *  09 · MODERN JAVASCRIPT (ES6+)
 * ============================================================================
 *  WHAT:  Syntax added from 2015 onwards that you see in every modern codebase.
 *  WHY:   It is shorter, safer and more expressive than the old alternatives.
 *  HOW:   destructuring, spread/rest, shorthand, optional chaining, `??`,
 *         logical assignment, private fields (covered in 10-oop).
 *  GOTCHA: Spread is SHALLOW. Optional chaining does not protect against a
 *          variable that was never declared at all — only null/undefined.
 * ============================================================================
 */

// ── 1. let and const instead of var ──────────────────────────────────────

const APP_NAME = "js-sharma"; // constant binding
let lessonCount = 9;          // reassignable
lessonCount += 1;
console.log("1)", APP_NAME, "| lessons done:", lessonCount);

// ── 2. Arrow functions ───────────────────────────────────────────────────

const double = (n) => n * 2;
const fullName = (first, last) => `${first} ${last}`;
console.log("\n2) arrows:", double(21), "|", fullName("Sumit", "Sharma"));

// ── 3. Template literals ─────────────────────────────────────────────────

const topic = "destructuring";
console.log(`3) today's topic: ${topic.toUpperCase()} (${topic.length} chars)`);

// ── 4. Array destructuring ───────────────────────────────────────────────

const [first, second, ...remaining] = ["a", "b", "c", "d"];
console.log("\n4) array destructuring:", { first, second, remaining });

// Skip an item and provide a default
const [, , third = "missing", fourth] = [10, 20];
console.log("   skipped/default:", { third, fourth });

// Swap variables in one line — no temp variable needed!
let left = 1;
let right = 2;
[left, right] = [right, left];
console.log("   swapped:", { left, right });

// ── 5. Object destructuring ──────────────────────────────────────────────

const user = {
  id: 7,
  name: "Riya",
  address: { city: "Patna", pin: 800001 },
  tags: ["student", "frontend"],
};

const { name, id: userId, address: { city }, missing = "default" } = user;
console.log("\n5) object destructuring:", { name, userId, city, missing });

// Rename + rest
const { name: userName, ...userRest } = user;
console.log("   rest without name:", userRest);

// Destructuring in function parameters — very common in React
function showUser({ name, tags = [] }) {
  console.log(`   showUser: ${name} → ${tags.join(", ")}`);
}
showUser(user);

// ── 6. Spread (...) ──────────────────────────────────────────────────────

const arrA = [1, 2];
const arrB = [3, 4];
console.log("\n6) spread arrays:", [...arrA, ...arrB]);

const baseSettings = { theme: "dark", lang: "en" };
const mySettings = { ...baseSettings, theme: "light" };
console.log("   spread objects:", mySettings);
console.log("   base unchanged:", baseSettings);

// GOTCHA: spread is shallow
const nested = { a: { b: 1 } };
const copied = { ...nested };
copied.a.b = 99;
console.log("   shallow spread still shares nested:", nested); // a.b = 99

// ── 7. Rest (...) ────────────────────────────────────────────────────────

function collect(first, ...everythingElse) {
  console.log("   first:", first, "| rest:", everythingElse);
}
collect("head", "a", "b", "c");

// ── 8. Optional chaining (?.) ────────────────────────────────────────────

console.log("\n8) optional chaining:");
console.log("   user.address.city:", user.address?.city);
console.log("   user.profile?.bio:", user.profile?.bio); // undefined, no crash
console.log("   user.sayHi?.():", user.sayHi?.());        // undefined, no crash

// Works with arrays too
const maybeArray = null;
console.log("   maybeArray?.[0]:", maybeArray?.[0]);

// ⚠️ It does NOT help if `user` itself was never declared:
// console.log(undeclared?.name); // ReferenceError

// ── 9. Nullish coalescing (??) ───────────────────────────────────────────

console.log("\n9) nullish coalescing:");
console.log("   0 || 10 =", 0 || 10, "→ || treats 0 as missing");
console.log("   0 ?? 10 =", 0 ?? 10, "→ ?? keeps 0");
console.log("   '' ?? 'default' =", "" ?? "default");
console.log("   null ?? 'default' =", null ?? "default");

// Mixing ?? with && or || needs parentheses (SyntaxError otherwise)
const theme = user.preferences?.theme ?? "system";
console.log("   theme with fallback:", theme);

// ── 10. Logical assignment operators (ES2021) ────────────────────────────

let config = { retries: 0, timeout: null };

config.retries ||= 3;  // assign only if falsy → 0 becomes 3
console.log("\n10) ||= on 0:", config.retries); // 3 — sometimes not what you want

config.retries = 0;
config.retries ??= 3;  // assign only if null/undefined → 0 stays 0
console.log("    ??= on 0:", config.retries); // 0

config.timeout ??= 5000;
console.log("    ??= on null:", config.timeout); // 5000

let showTips = false;
showTips &&= true; // assign only if already truthy
console.log("    &&= on false:", showTips);

// ── 11. for...of + entries() ────────────────────────────────────────────

console.log("\n11) modern iteration:");
for (const [index, tag] of user.tags.entries()) {
  console.log(`   ${index}: ${tag}`);
}

// ── 12. Numeric separators & BigInt ──────────────────────────────────────

const population = 1_400_000_000; // underscores improve readability
const huge = 12345678901234567890n; // BigInt for integers beyond MAX_SAFE_INTEGER
console.log("\n12) numeric:", population, "|", huge.toString(), typeof huge);
// console.log(population + huge); // ❌ cannot mix Number and BigInt

// ── 13. One-line summary ─────────────────────────────────────────────────
// const/let, arrows, templates, destructuring, spread/rest, ?., ?? are the
// everyday six. Prefer ?? over || for defaults. Remember spread is shallow.
