/**
 * ============================================================================
 *  08 · MATH & DATES
 * ============================================================================
 *  WHAT:  The built-in `Math` object and the `Date` object.
 *  WHY:   Rounding, random values, timestamps, formatting dates for the UI.
 *  HOW:   Math.method() and new Date() / Date.now().
 *  GOTCHA: Months are 0-based in Date (January = 0). Math.random() never
 *          returns 1, so use Math.floor(Math.random() * n) for 0..n-1.
 * ============================================================================
 */

// ── 1. Rounding ──────────────────────────────────────────────────────────

const price = 99.567;

console.log("1) rounding:");
console.log("   Math.round(99.567) =", Math.round(price)); // 100
console.log("   Math.floor(99.567) =", Math.floor(price)); // 99
console.log("   Math.ceil(99.567)  =", Math.ceil(price));  // 100
console.log("   Math.trunc(99.567) =", Math.trunc(price)); // 99 (just drop decimals)

// Fixed number of decimals (returns a STRING!)
const formatted = price.toFixed(2);
console.log("   price.toFixed(2) =", formatted, "→", typeof formatted);
console.log("   convert back to number:", Number(formatted));

// ── 2. Min, max, abs, pow, sqrt ──────────────────────────────────────────

console.log("\n2) common Math methods:");
console.log("   min:", Math.min(5, 2, 9, 1));
console.log("   max:", Math.max(5, 2, 9, 1));
console.log("   abs(-7):", Math.abs(-7));
console.log("   2 ** 8:", Math.pow(2, 8), "or", 2 ** 8);
console.log("   sqrt(81):", Math.sqrt(81));
console.log("   cbrt(27):", Math.cbrt(27));
console.log("   PI:", Math.PI);

// Clamp a value between a min and max
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
console.log("   clamp(150, 0, 100):", clamp(150, 0, 100));

// ── 3. Random numbers ────────────────────────────────────────────────────

console.log("\n3) randomness:");
console.log("   Math.random():", Math.random(), "→ 0 ≤ x < 1");

// Random integer from min to max, INCLUSIVE
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log("   dice roll (1-6):", randomInt(1, 6));
console.log("   random OTP:", randomInt(100000, 999999));

// Random item from an array
const colors = ["red", "green", "blue", "yellow"];
console.log("   random color:", colors[randomInt(0, colors.length - 1)]);

// GOTCHA: Math.random() is NOT cryptographically secure.
// For passwords/tokens use crypto.randomInt() from node:crypto.

// ── 4. Creating dates ────────────────────────────────────────────────────

console.log("\n4) creating dates:");
const now = new Date();
console.log("   new Date():", now.toString());
console.log("   ISO string:", now.toISOString());
console.log("   timestamp ms:", Date.now());

// Specific date. ⚠️ Month 0 = January!
const independenceDay = new Date(2026, 7, 15); // 15 August 2026
console.log("   new Date(2026, 7, 15):", independenceDay.toDateString());

// From an ISO string (month is 1-based here)
const fromString = new Date("2026-11-24T10:30:00Z");
console.log("   parsed ISO:", fromString.toUTCString());

// ── 5. Reading parts of a date ───────────────────────────────────────────

console.log("\n5) date parts:");
console.log("   getFullYear:", now.getFullYear());
console.log("   getMonth (0-11):", now.getMonth(), "→", now.getMonth() + 1, "human month");
console.log("   getDate:", now.getDate());
console.log("   getDay (0=Sun):", now.getDay());
console.log("   getHours:", now.getHours());
console.log("   getMinutes:", now.getMinutes());

// UTC versions exist too: getUTCFullYear(), getUTCMonth(), etc.

// ── 6. Modifying dates ───────────────────────────────────────────────────

const future = new Date(now);
future.setDate(future.getDate() + 7); // add 7 days
console.log("\n6) one week later:", future.toDateString());

const nextMonth = new Date(now);
nextMonth.setMonth(nextMonth.getMonth() + 1);
console.log("   next month:", nextMonth.toDateString());

// ── 7. Comparing and subtracting ─────────────────────────────────────────

const start = new Date("2026-11-01");
const end = new Date("2026-11-24");
const diffMs = end - start; // dates become timestamps when subtracted
const diffDays = diffMs / (1000 * 60 * 60 * 24);

console.log("\n7) comparison:");
console.log("   end > start?", end > start);
console.log("   difference in days:", diffDays);

// ── 8. Formatting with Intl ──────────────────────────────────────────────

console.log("\n8) Intl formatting:");
console.log("   Indian date:", new Intl.DateTimeFormat("en-IN", {
  day: "numeric", month: "long", year: "numeric",
}).format(now));

console.log("   currency:", new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR",
}).format(123456.78));

console.log("   Indian number grouping:", new Intl.NumberFormat("en-IN").format(1234567));

// ── 9. A practical helper ────────────────────────────────────────────────

function formatElapsed(targetDate) {
  const seconds = Math.floor((Date.now() - targetDate.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
console.log("\n9) relative time:", formatElapsed(fiveMinutesAgo));

// ── 10. One-line summary ─────────────────────────────────────────────────
// Math.floor(Math.random() * n) → 0..n-1. Month is 0-based in Date.
// toFixed() returns a STRING. Subtract dates to get milliseconds.
// Use Intl for locale-aware dates, numbers and currency.
