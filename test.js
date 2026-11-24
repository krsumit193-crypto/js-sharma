/**
 * ============================================================================
 *  test.js  -  the "run every lesson" script
 * ============================================================================
 *
 *  WHAT THIS FILE DOES
 *  -------------------
 *  It imports (and therefore executes) every lesson file in topic order.
 *  Each lesson prints its own output, so one command gives you a full tour
 *  of the whole repository.
 *
 *  HOW TO RUN
 *  ----------
 *      npm start        (or)  npm run learn   (or)  node test.js
 *
 *  WHY dynamic import()?
 *  ---------------------
 *  `import()` returns a Promise, so we can `await` it. That means lesson 02
 *  only starts after lesson 01 has finished printing. With a plain `import`
 *  at the top of the file we could still control order, but dynamic import
 *  also lets us print the banner *before* the lesson runs.
 *
 *  NOTE
 *  ----
 *  The DOM lesson (13-dom) is intentionally NOT in this list because it needs
 *  a browser, not Node.js. Open 13-dom/index.html for that one.
 * ============================================================================
 */

const lessons = [
  ["01 · Variables", "./01-basics/01-variables.js"],
  ["01 · Data types", "./01-basics/02-data-types.js"],
  ["01 · Operators", "./01-basics/03-operators.js"],
  ["01 · Type conversion", "./01-basics/04-type-conversion.js"],
  ["02 · Conditions", "./02-control-flow/conditions.js"],
  ["03 · Loops", "./03-loops/loops.js"],
  ["04 · Functions", "./04-functions/functions.js"],
  ["05 · Arrays", "./05-arrays/arrays.js"],
  ["06 · Objects", "./06-objects/objects.js"],
  ["07 · Strings", "./07-strings/strings.js"],
  ["08 · Math and dates", "./08-math-dates/math-and-dates.js"],
  ["09 · Modern features (ES6+)", "./09-es6-plus/modern-features.js"],
  ["10 · Object-oriented JS", "./10-oop/classes.js"],
  ["11 · Async JavaScript", "./11-async/async-javascript.js"],
  ["12 · Error handling", "./12-error-handling/errors.js"],
  ["14 · Mini projects", "./14-practice/mini-projects.js"],
];

const line = "=".repeat(74);

console.log("\n" + line);
console.log("  js-sharma  |  topic-wise JavaScript lessons");
console.log(`  ${lessons.length} lessons, one command`);
console.log(line);

for (const [title, file] of lessons) {
  console.log(`\n\n${line}`);
  console.log(`  ▶  ${title}`);
  console.log(`     ${file}`);
  console.log(line + "\n");

  // Awaiting keeps the output in a clean, predictable order.
  await import(file);
}

console.log(`\n\n${line}`);
console.log(`  ✅  All ${lessons.length} lessons finished.`);
console.log("  Want the browser lesson? Open 13-dom/index.html");
console.log(line + "\n");
