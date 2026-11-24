# Deep explanations

The `.js` lessons show you **what** the code does. This file explains **why**
it behaves that way. Keep it open in a second tab while you learn.

---

## 1. `==` vs `===`

| Operator | Name | What it checks |
|---|---|---|
| `===` | strict equality | value **and** type |
| `==` | loose equality | value **after converting types** |

```js
5 === "5"   // false — number vs string
5 ==  "5"   // true  — "5" is converted to 5
null == undefined  // true
null === undefined // false
```

**Rule:** use `===` always. The only common exception is
`value == null`, which conveniently catches *both* `null` and `undefined`.
In modern code even that is usually written `value === null || value === undefined`
or simply `if (!value)` when the distinction doesn't matter.

🎯 Lesson: [`01-basics/03-operators.js`](01-basics/03-operators.js)

---

## 2. Hoisting

Before your code runs, JavaScript does a "creation pass". Function declarations
and `var` are lifted (hoisted) to the top of their scope; `let` and `const` are
also lifted, but they sit in a **temporal dead zone** until their definition
line is reached.

```js
console.log(a); // undefined  (var was hoisted, value is not)
var a = 1;

console.log(b); // ReferenceError (TDZ)
let b = 2;

sayHi();        // works — whole function was hoisted
function sayHi() {}
```

**Rule:** declare everything at the top of its scope, use `const` by default,
`let` when you must reassign, and never use `var`.

🎯 Lesson: [`01-basics/01-variables.js`](01-basics/01-variables.js)

---

## 3. Closures

A closure is a function that **remembers the variables around it** even after
the outer function has finished running.

```js
function makeCounter() {
  let count = 0;              // lives in the closure
  return () => ++count;       // inner function keeps a reference to it
}

const next = makeCounter();
next(); // 1
next(); // 2
```

Why it matters: it is the basis of private state, function factories, callbacks
that keep configuration, and React hooks.

Gotcha: every iteration of `let` in a loop gets a **fresh binding**, which is
why `for (let i…)` works with callbacks while old `for (var i…)` needed an IIFE.

🎯 Lessons: [`04-functions/functions.js`](04-functions/functions.js),
[`14-practice/mini-projects.js`](14-practice/mini-projects.js) (bank account)

---

## 4. `this`

`this` is decided by **how a function is called**, not where it was written.

| Call style | `this` |
|---|---|
| `obj.method()` | `obj` |
| `const f = obj.method; f()` | `undefined` (in strict mode / modules) |
| `fn.call(obj)` / `fn.apply(obj)` | explicitly `obj` |
| arrow function | inherits `this` from the surrounding scope |

```js
const user = {
  name: "Sumit",
  normal()  { return this.name; },       // "Sumit"
  arrow: () => this.name,                // undefined at module scope!
};
```

**Rule:** use a regular function for object methods; use an arrow function for
callbacks (`map`, `setTimeout`, event handlers) so `this` is not lost.

🎯 Lessons: [`06-objects/objects.js`](06-objects/objects.js),
[`10-oop/classes.js`](10-oop/classes.js)

---

## 5. The event loop

JavaScript runs one thing at a time, but it can **schedule** work.

```
call stack  →  web APIs / timers  →  callback (microtask) queue  →  back to stack
```

Order of execution:

1. Synchronous code (the call stack).
2. **Microtasks**: resolved Promises and `queueMicrotask` — they run *before* timers.
3. **Macrotasks**: `setTimeout`, `setInterval`, I/O.

```js
console.log("1 sync");
setTimeout(() => console.log("4 timer"), 0);
Promise.resolve().then(() => console.log("3 promise"));
console.log("2 sync");

// 1 sync → 2 sync → 3 promise → 4 timer
```

This is why `await` resumes *after* all currently queued microtasks, and why a
`while (true)` loop can freeze a page: it never gives the queue a turn.

🎯 Lesson: [`11-async/async-javascript.js`](11-async/async-javascript.js)

---

## 6. Primitives vs references

**Primitives** (`string`, `number`, `boolean`, `undefined`, `null`, `bigint`,
`symbol`) are copied **by value**. **Objects** (including arrays and functions)
are copied **by reference** — two variables can point to the same object.

```js
let a = 5;
let b = a;      // b gets its own copy
b = 9;
console.log(a); // 5 — unchanged

const x = [1, 2];
const y = x;    // y points to the SAME array
y.push(3);
console.log(x); // [1, 2, 3] — changed!
```

To copy an array use `[...x]` or `x.slice()`. For objects use `{...obj}` or
`Object.assign({}, obj)`. Both are **shallow**: nested objects are still shared.
Use `structuredClone(obj)` for a deep copy.

🎯 Lessons: [`01-basics/02-data-types.js`](01-basics/02-data-types.js),
[`05-arrays/arrays.js`](05-arrays/arrays.js)

---

## 7. Mutating vs non-mutating array methods

| Changes the original ✅ | Returns a new array ❌ |
|---|---|
| `push`, `pop`, `shift`, `unshift` | `map`, `filter`, `slice`, `concat` |
| `splice`, `sort`, `reverse`, `fill` | `toSorted`, `toReversed`, `flat` |

`sort()` is the classic trap: it sorts **in place** and compares items as
**strings**, so `[10, 2, 1].sort()` gives `[1, 10, 2]`. Supply a comparator:

```js
[10, 2, 1].sort((a, b) => a - b);   // [1, 2, 10]
// or, in newer runtimes:
[10, 2, 1].toSorted((a, b) => a - b);
```

Prefer non-mutating methods in application code — accidental mutation of shared
state causes some of the hardest bugs to find.

🎯 Lesson: [`05-arrays/arrays.js`](05-arrays/arrays.js)

---

## 8. Truthy and falsy

In a boolean context (`if`, `&&`, `||`, `!`) these eight values are **falsy**:

```js
false, 0, -0, 0n, "", null, undefined, NaN
```

Everything else is truthy — including `[]`, `{}`, `"0"` and `"false"`.

That is why `if (user.name)` is a shortcut for "is there a non-empty name?",
but `if (arr)` only checks that the array *exists*, not that it is empty —
check `arr.length` instead.

🎯 Lessons: [`01-basics/04-type-conversion.js`](01-basics/04-type-conversion.js),
[`02-control-flow/conditions.js`](02-control-flow/conditions.js)

---

## Keep going

After finishing the lessons, try this order for revision:

1. [`14-practice/mini-projects.js`](14-practice/mini-projects.js) — test yourself first.
2. Re-read only the "GOTCHA" comment in each file.
3. Rebuild one mini project from memory.
4. Add your own lesson and open a PR. 🚀
