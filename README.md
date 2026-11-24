<div align="center">

# js-sharma

### Topic-wise JavaScript, one runnable lesson at a time.

![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Beginner Friendly](https://img.shields.io/badge/Level-Beginner%20%E2%86%92%20Intermediate-brightgreen?style=for-the-badge)
![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**[Topics](#-topics)** · **[Quick start](#-quick-start)** · **[Structure](#-folder-structure)** · **[Explanations](#-deep-explanations)** · **[Roadmap](#-roadmap)**

</div>

---

## What is this repo?

A **hand-written JavaScript notebook** that lives on GitHub. Instead of one giant
file, every topic gets its own small file. Every file:

- ✅ is **runnable** with plain Node.js (no frameworks, no installs),
- ✅ is **heavily commented** — the comments *are* the explanation,
- ✅ prints its output so you can see exactly what each concept does,
- ✅ follows the same readable format: *what → why → how → gotcha → example*.

It is meant for two kinds of people:

1. **You**, revising a topic in 5 minutes by opening one file.
2. **Anyone else** learning JavaScript who wants clean, copy-pasteable examples
   instead of a 400-line wall of code.

> **No mock data, no magic.** Every number and every output you see is produced
> by actually running the code in that file.

---

## Quick start

```bash
# 1. clone
git clone https://github.com/<your-username>/js-sharma.git
cd js-sharma

# 2. run everything (no npm install needed — zero dependencies)
npm start

# 3. or run just one lesson
node 05-arrays/arrays.js
```

Requirements: **Node.js 18 or newer**. That's it.

<sub>Prefer a cloud setup? The repo includes a `.devcontainer` — open it in VS Code
and GitHub Codespaces will give you a ready-made Node 24 environment.</sub>

---

## Topics

| # | Topic | File | Concepts covered |
|:-:|---|---|---|
| 01 | Basics | [`01-basics/`](01-basics/) | `var`/`let`/`const`, scope, primitive & reference types, `typeof`, operators, truthy/falsy, type conversion |
| 02 | Control flow | [`02-control-flow/conditions.js`](02-control-flow/conditions.js) | `if`/`else`, `else if`, `switch`, ternary, guard clauses |
| 03 | Loops | [`03-loops/loops.js`](03-loops/loops.js) | `for`, `while`, `do...while`, `for...of`, `for...in`, `break`, `continue` |
| 04 | Functions | [`04-functions/functions.js`](04-functions/functions.js) | declarations, expressions, arrows, default/rest params, callbacks, IIFE, closures, recursion |
| 05 | Arrays | [`05-arrays/arrays.js`](05-arrays/arrays.js) | mutating vs non-mutating methods, `map`/`filter`/`reduce`, destructuring, spread, copying |
| 06 | Objects | [`06-objects/objects.js`](06-objects/objects.js) | literals, methods & `this`, destructuring, spread, `Object.*` helpers, JSON |
| 07 | Strings | [`07-strings/strings.js`](07-strings/strings.js) | template literals, indexing, searching, slicing, splitting, trimming, padding |
| 08 | Math & dates | [`08-math-dates/`](08-math-dates/) | `Math` methods, rounding, random numbers, `Date`, timestamps, `Intl` formatting |
| 09 | Modern JS | [`09-es6-plus/modern-features.js`](09-es6-plus/modern-features.js) | destructuring, spread/rest, shorthand, optional chaining, `??`, logical assignment |
| 10 | OOP | [`10-oop/classes.js`](10-oop/classes.js) | classes, constructor, inheritance, `super`, private fields, getters/setters, static methods |
| 11 | Async JS | [`11-async/async-javascript.js`](11-async/async-javascript.js) | event loop, callbacks, Promises, `Promise.all`, `async`/`await`, parallel vs sequential |
| 12 | Errors | [`12-error-handling/errors.js`](12-error-handling/errors.js) | `try`/`catch`/`finally`, `throw`, custom errors, safe parsing |
| 13 | DOM 🌐 | [`13-dom/`](13-dom/) | `querySelector`, events, `textContent` vs `innerHTML`, `classList`, forms — **browser only** |
| 14 | Practice | [`14-practice/mini-projects.js`](14-practice/mini-projects.js) | 12 solved mini problems: FizzBuzz, primes, Fibonacci, anagram, bank closure… |

---

## Folder structure

```text
js-sharma/
├── 01-basics/               # the building blocks
│   ├── 01-variables.js
│   ├── 02-data-types.js
│   ├── 03-operators.js
│   └── 04-type-conversion.js
├── 02-control-flow/         # making decisions
│   └── conditions.js
├── 03-loops/                # repeating work
│   └── loops.js
├── 04-functions/            # reusable blocks of logic
│   └── functions.js
├── 05-arrays/               # ordered collections
│   └── arrays.js
├── 06-objects/              # key/value collections
│   └── objects.js
├── 07-strings/              # working with text
│   └── strings.js
├── 08-math-dates/           # numbers, random, time
│   └── math-and-dates.js
├── 09-es6-plus/             # the modern syntax you'll see everywhere
│   └── modern-features.js
├── 10-oop/                  # classes & objects done properly
│   └── classes.js
├── 11-async/                # time, promises, await
│   └── async-javascript.js
├── 12-error-handling/       # failing gracefully
│   └── errors.js
├── 13-dom/                  # browser-only lesson
│   ├── index.html
│   └── dom-basics.js
├── 14-practice/             # exercises with worked solutions
│   └── mini-projects.js
├── .devcontainer/           # ready-made Codespaces environment
├── .github/dependabot.yml   # keeps the devcontainer updated
├── test.js                  # runs every lesson in order
├── package.json             # scripts + project metadata
├── EXPLANATION.md           # deep notes on the tricky concepts
└── README.md                # this file
```

---

## How a lesson is written

Open any `.js` file and you'll see the same four-part pattern:

```js
/**
 * TOPIC NAME
 * WHAT:     one-line definition in plain English
 * WHY:      the problem this concept solves
 * HOW:      syntax + rules
 * GOTCHA:   the mistake beginners usually make
 */

// ── 1. The simplest possible example ─────────────────────────────
// ── 2. A realistic example ───────────────────────────────────────
// ── 3. The gotcha, demonstrated safely ───────────────────────────
// ── 4. A tiny summary you can memorise ───────────────────────────
```

Block comments (`/** */`) explain **concepts**. Line comments (`//`) explain
**individual lines**. You can read a file top-to-bottom like a short article,
or just run it and read the console output.

---

## Browser-only lesson

Topic 13 cannot run in Node because there is no `document` in Node. To try it:

```bash
# open the file directly in your browser, or serve it:
npx serve 13-dom
```

Then open `13-dom/index.html` and check the browser console. The lesson covers
DOM selection, creating elements, event listeners, and why `textContent` is
safer than `innerHTML` for user input.

---

## Deep explanations

Some ideas deserve more than a code comment. [`EXPLANATION.md`](EXPLANATION.md)
goes deeper on the ones that confuse people most:

- `==` vs `===`
- hoisting (and why `let`/`const` feel different)
- closures — functions that remember
- `this` — simple rules that actually work
- the event loop — how `setTimeout` and `await` really behave
- primitives vs references — why two identical arrays are not equal
- mutating vs non-mutating array methods

---

## Roadmap

- [x] Basics, control flow, loops, functions
- [x] Arrays, objects, strings, math & dates
- [x] Modern syntax, classes, async, errors
- [x] Browser DOM basics
- [x] 12 solved practice problems
- [ ] Regex basics
- [ ] Modules (`import` / `export`) in depth
- [ ] `fetch` + a real API lesson
- [ ] Mini project: todo app (DOM + state)
- [ ] Mini project: expense tracker (reusing the `newjavas` ideas)

Pull requests are welcome — if you add a topic, keep the same comment style
and add one row to the table above.

---

## License

MIT — use this code to learn, teach, or build something of your own.
See [`LICENSE`](LICENSE).

<div align="center">

**Happy learning. Small files, big clarity. ⚡**

</div>
