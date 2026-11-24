/**
 * ============================================================================
 *  12 · ERROR HANDLING
 * ============================================================================
 *  WHAT:  Code that deals with things going wrong.
 *  WHY:   A bad input should show a helpful message, not crash the whole app.
 *  HOW:   try / catch / finally, throw, and custom Error subclasses.
 *  GOTCHA: catch variables are scoped to the catch block; errors should be
 *          handled at the level that knows what to do about them.
 * ============================================================================
 */

// ── 1. try / catch ───────────────────────────────────────────────────────

try {
  // Risky code goes here.
  const result = JSON.parse("not valid json");
  console.log("1) parsed:", result); // never runs
} catch (error) {
  // Runs only if an error was thrown in the try block.
  console.log("1) caught error name:", error.name);
  console.log("   message:", error.message);
}

console.log("1) the program continued after the error ✅");

// ── 2. finally ───────────────────────────────────────────────────────────

// `finally` ALWAYS runs — success or failure. Use it for cleanup.
function readFileSimulation(shouldFail) {
  console.log("\n2) opening resource...");
  try {
    if (shouldFail) throw new Error("disk read failed");
    return "file contents";
  } catch (error) {
    return `handled: ${error.message}`;
  } finally {
    console.log("   closing resource (finally) 🧹");
  }
}

console.log("   result:", readFileSimulation(false));
console.log("   result:", readFileSimulation(true));

// ── 3. throw your own errors ─────────────────────────────────────────────

function withdraw(balance, amount) {
  if (amount <= 0) {
    throw new Error("Amount must be greater than zero");
  }
  if (amount > balance) {
    throw new RangeError("Insufficient balance");
  }
  return balance - amount;
}

console.log("\n3) throw:");
for (const amount of [0, 5000, 500]) {
  try {
    console.log(`   withdrawing ${amount} → balance`, withdraw(1000, amount));
  } catch (error) {
    console.log(`   withdrawing ${amount} → ${error.name}: ${error.message}`);
  }
}

// ── 4. Built-in error types ──────────────────────────────────────────────

console.log("\n4) built-in error types:");
const errors = [
  new Error("generic"),
  new TypeError("wrong type"),
  new ReferenceError("missing variable"),
  new RangeError("out of range"),
  new SyntaxError("bad syntax"),
];
errors.forEach((e) => console.log(`   ${e.name}: ${e.message}`));

// ── 5. Custom error classes ──────────────────────────────────────────────

class ValidationError extends Error {
  constructor(field, message) {
    super(`${field}: ${message}`);   // call the parent constructor
    this.name = "ValidationError";
    this.field = field;              // extra context your app can use
  }
}

class NotFoundError extends Error {
  constructor(resource, id) {
    super(`${resource} ${id} not found`);
    this.name = "NotFoundError";
    this.status = 404;
  }
}

console.log("\n5) custom errors:");
try {
  throw new ValidationError("email", "must contain @");
} catch (error) {
  console.log("   ", error.name, "|", error.message, "| field:", error.field);
}

try {
  throw new NotFoundError("Incident", 99);
} catch (error) {
  console.log("   ", error.name, "|", error.message, "| HTTP", error.status);
}

// ── 6. Error propagation ─────────────────────────────────────────────────

// An error travels up the call stack until somebody catches it.
function divide(a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}
function calculate() {
  return divide(10, 0); // does not catch — passes it upward
}

console.log("\n6) propagation:");
try {
  calculate();
} catch (error) {
  console.log("   caught at the top:", error.message);
}

// ── 7. Safe JSON parsing (a reusable helper) ─────────────────────────────

function safeParse(text, fallback = null) {
  try {
    return JSON.parse(text);
  } catch {
    // No binding needed when you don't use the error object.
    return fallback;
  }
}

console.log("\n7) safeParse:");
console.log("   valid:", safeParse('{"ok":true}'));
console.log("   invalid:", safeParse("{bad", { ok: false }));

// ── 8. Async errors ──────────────────────────────────────────────────────

async function asyncTask(shouldFail) {
  if (shouldFail) throw new Error("async boom");
  return "async success";
}

console.log("\n8) async errors:");
try {
  console.log("   ", await asyncTask(false));
  console.log("   ", await asyncTask(true));
} catch (error) {
  console.log("   caught async error:", error.message);
}

// For Promise chains use .catch():
asyncTask(true).catch((error) => console.log("   .catch:", error.message));

// ── 9. Don't swallow errors silently ─────────────────────────────────────

// ❌ BAD — hides the problem completely
try {
  JSON.parse("{oops");
} catch {
  // empty catch — the bug disappears
}

// ✅ GOOD — at least log it, or rethrow after adding context
try {
  JSON.parse("{oops");
} catch (error) {
  console.log("9) logged instead of swallowed:", error.name);
}

// ── 10. One-line summary ─────────────────────────────────────────────────
// try = risky code, catch = handle, finally = always clean up.
// throw Error (or a subclass) with a clear message.
// Catch where you can actually do something; never leave catch blocks empty.
