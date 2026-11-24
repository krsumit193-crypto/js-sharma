/**
 * ============================================================================
 *  07 · STRINGS
 * ============================================================================
 *  WHAT:  Text. A sequence of characters.
 *  WHY:   Names, messages, filenames, API responses — everything is text.
 *  HOW:   string literals, template literals, and dozens of helper methods.
 *  GOTCHA: Strings are IMMUTABLE. Methods return a NEW string; the original
 *          never changes. Also, "5" + 5 = "55", not 10.
 * ============================================================================
 */

const city = "Patna";             // double quotes
const language = 'JavaScript';    // single quotes
const intro = `I live in ${city}`; // template literal (backticks)

console.log("1) basics:");
console.log("   ", language, "|", intro);
console.log("   length:", language.length);
console.log("   first char:", language[0], "| last:", language.at(-1));

// ── 2. Template literals ─────────────────────────────────────────────────

const name = "Sumit";
const marks = 88;
const message = `Hi ${name}, you scored ${marks} marks.
That is ${marks >= 80 ? "a great result" : "okay"}!`;

console.log("\n2) multiline template:\n", message);

// Expressions inside ${ } — any JS expression is allowed
console.log("   next year's age:", `${22 + 1}`);
console.log("   uppercase inline:", `${name.toUpperCase()}`);

// ── 3. Case and whitespace ───────────────────────────────────────────────

const raw = "   Hello World   ";
console.log("\n3) case & whitespace:");
console.log("   raw:", JSON.stringify(raw));
console.log("   trim:", JSON.stringify(raw.trim()));
console.log("   toUpperCase:", raw.trim().toUpperCase());
console.log("   toLowerCase:", raw.trim().toLowerCase());

// trimStart / trimEnd
console.log("   trimStart:", JSON.stringify(raw.trimStart()));

// ── 4. Searching ─────────────────────────────────────────────────────────

const email = "sumit.sharma@example.com";

console.log("\n4) searching:");
console.log("   includes('@'):", email.includes("@"));
console.log("   startsWith('sumit'):", email.startsWith("sumit"));
console.log("   endsWith('.com'):", email.endsWith(".com"));
console.log("   indexOf('@'):", email.indexOf("@"));
console.log("   lastIndexOf('.'):", email.lastIndexOf("."));
console.log("   match digits:", email.match(/\d+/g)); // regex

// A simple validation check
const isValidEmail = email.includes("@") && email.includes(".");
console.log("   looks like an email?", isValidEmail);

// ── 5. Extracting ────────────────────────────────────────────────────────

const text = "JavaScript is everywhere";
console.log("\n5) extracting:");
console.log("   slice(0, 10):", text.slice(0, 10));
console.log("   slice(-9):", text.slice(-9));
console.log("   substring(0, 4):", text.substring(0, 4));
console.log("   charAt(4):", text.charAt(4));
console.log("   at(-3):", text.at(-3));

// slice vs substring: slice accepts negative indexes, substring does not.

// ── 6. Replacing ─────────────────────────────────────────────────────────

const sentence = "I like cats. Cats are nice.";
console.log("\n6) replacing:");
console.log("   replace first:", sentence.replace("cats", "dogs"));
console.log("   replace all:", sentence.replaceAll("Cats", "Dogs"));
console.log("   replace with regex /g:", sentence.replace(/cats/gi, "dogs"));

// ── 7. Split and join ────────────────────────────────────────────────────

const tags = "javascript,react,node";
const tagArray = tags.split(",");
console.log("\n7) split:", tagArray);
console.log("   join with ' | ':", tagArray.join(" | "));

const lines = "line1\nline2\nline3".split("\n");
console.log("   split by newline:", lines);

// ── 8. Padding and repeating ─────────────────────────────────────────────

console.log("\n8) padding & repeat:");
console.log("   padStart:", "5".padStart(3, "0"));   // "005"
console.log("   padEnd:", "5".padEnd(3, "."));      // "5.."
console.log("   repeat:", "ha".repeat(3));          // "hahaha"

// Useful for invoice IDs: INV-00042
console.log("   invoice:", "INV-" + String(42).padStart(5, "0"));

// ── 9. Immutability — the big gotcha ─────────────────────────────────────

let greeting = "Hello";
greeting.toUpperCase();          // returns a NEW string, discarded ❌
console.log("\n9) after discarded call:", greeting); // still "Hello"

greeting = greeting.toUpperCase(); // assign the result ✅
console.log("   after assigning:", greeting);

// ── 10. Strings and numbers ──────────────────────────────────────────────

console.log("\n10) string + number:");
console.log("   '5' + 5 =", "5" + 5, "→ '55' (concatenation)");
console.log("   Number('5') + 5 =", Number("5") + 5, "→ 10");

// ── 11. Iterating over a string ──────────────────────────────────────────

console.log("\n11) characters:");
for (const char of "JS") console.log("   ", char);
console.log("   spread into array:", [..."hello"]);

// ── 12. A practical helper ───────────────────────────────────────────────

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, "") // remove punctuation
    .replace(/\s+/g, "-");       // spaces → hyphens
}

console.log("\n12) slugify:", slugify("Hello, JavaScript World!"));

// ── 13. One-line summary ─────────────────────────────────────────────────
// Use backticks + ${} for strings with variables. Strings are immutable —
// always assign the result of a method. trim() inputs, Number() them, then
// validate. slice for extracting, split/join for converting to arrays.
