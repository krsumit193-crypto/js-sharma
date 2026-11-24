/**
 * ============================================================================
 *  11 · ASYNC JAVASCRIPT
 * ============================================================================
 *  WHAT:  Code that starts now and finishes later (timers, network, files).
 *  WHY:   Waiting for a 2-second API must NOT freeze the rest of the app.
 *  HOW:   callbacks → Promises → async/await (the modern way).
 *  GOTCHA: Awaiting tasks one by one is slow when they are independent —
 *          use Promise.all() to run them in parallel.
 * ============================================================================
 */

// ── 1. The event loop in one demo ────────────────────────────────────────

console.log("1) event loop order:");
console.log("   a) sync first");

setTimeout(() => console.log("   d) setTimeout (macrotask, last)"), 0);

Promise.resolve().then(() => console.log("   c) Promise (microtask, before timer)"));

console.log("   b) sync second");

// Output: a → b → c → d. Synchronous code always finishes first.

// ── 2. Callbacks — the old way ───────────────────────────────────────────

function fetchUserCallback(id, callback) {
  setTimeout(() => {
    callback({ id, name: "Sumit" });
  }, 100);
}

fetchUserCallback(1, (user) => {
  console.log("\n2) callback result:", user);
});

// Nesting callbacks inside callbacks leads to "callback hell":
// fetchUser(1, user => fetchPosts(user, posts => fetchComments(posts, ...)))

// ── 3. Promises — a better contract ──────────────────────────────────────

// A Promise is an object representing a future result.
// It is pending → fulfilled (resolved) or rejected (failed).

function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) {
        reject(new Error("Invalid user id"));
      } else {
        resolve({ id, name: "Sumit", role: "student" });
      }
    }, 100);
  });
}

console.log("\n3) promises:");
fetchUser(2)
  .then((user) => {
    console.log("   .then →", user);
    return user.name; // the returned value flows into the next .then
  })
  .then((name) => console.log("   chained .then →", name.toUpperCase()))
  .catch((error) => console.log("   .catch →", error.message))
  .finally(() => console.log("   .finally → always runs (cleanup here)"));

fetchUser(-1).catch((error) => console.log("   rejected promise:", error.message));

// ── 4. async / await — promises, but readable ────────────────────────────

// `await` pauses THIS async function until the promise settles.
// It does not block the whole program.

async function showUser() {
  console.log("\n4) async/await:");
  try {
    const user = await fetchUser(3);
    console.log("   awaited user:", user);
    const greeting = await Promise.resolve(`Welcome, ${user.name}!`);
    console.log("   awaited greeting:", greeting);
  } catch (error) {
    console.log("   caught:", error.message);
  }
}

await showUser();

// ── 5. Sequential vs parallel — an important performance lesson ─────────

const fakeRequest = (label, ms) =>
  new Promise((resolve) => setTimeout(() => resolve(label), ms));

console.log("\n5) sequential vs parallel:");

// ❌ SEQUENTIAL: 100 + 100 + 100 = ~300 ms
let t0 = Date.now();
const a = await fakeRequest("A", 100);
const b = await fakeRequest("B", 100);
const c = await fakeRequest("C", 100);
console.log("   sequential:", [a, b, c], `in ${Date.now() - t0}ms`);

// ✅ PARALLEL: start all three, then await together = ~100 ms
t0 = Date.now();
const parallel = await Promise.all([
  fakeRequest("A", 100),
  fakeRequest("B", 100),
  fakeRequest("C", 100),
]);
console.log("   Promise.all:", parallel, `in ${Date.now() - t0}ms`);

// ── 6. Other Promise combinators ─────────────────────────────────────────

console.log("\n6) combinators:");

// allSettled — waits for everything, never rejects; gives status per item.
const settled = await Promise.allSettled([
  Promise.resolve("ok"),
  Promise.reject(new Error("failed")),
]);
console.log("   allSettled:", settled.map((r) => r.status));

// race — first one to finish wins (great for timeouts)
const raced = await Promise.race([
  fakeRequest("slow", 300),
  fakeRequest("fast", 10),
]);
console.log("   race winner:", raced);

// any — first FULFILLED result (ignores rejections until one succeeds)
const anyResult = await Promise.any([
  Promise.reject(new Error("nope")),
  fakeRequest("success", 20),
]);
console.log("   any:", anyResult);

// ── 7. A timeout wrapper ─────────────────────────────────────────────────

function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), ms)
  );
  return Promise.race([promise, timeout]);
}

try {
  await withTimeout(fakeRequest("slow server", 500), 50);
} catch (error) {
  console.log("\n7) timeout caught:", error.message);
}

// ── 8. Async iteration and promises in arrays ────────────────────────────

// ❌ WRONG — map with async gives you an array of Promises
const promises = [1, 2, 3].map(async (n) => n * 2);
console.log("\n8) map with async:", promises[0] instanceof Promise);

// ✅ RIGHT — await them all
const values = await Promise.all([1, 2, 3].map(async (n) => n * 2));
console.log("   awaited map:", values);

// ── 9. Top-level await ───────────────────────────────────────────────────

// This whole file is an ES module (package.json has "type": "module"),
// so `await showUser()` above works directly — no async wrapper needed.
console.log("\n9) top-level await worked ✅");

// ── 10. One-line summary ─────────────────────────────────────────────────
// await only works inside async functions (or at module top level).
// try/catch handles rejected promises. Independent tasks → Promise.all.
// Microtasks (promises) run before macrotasks (timers).
