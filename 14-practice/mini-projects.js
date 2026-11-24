/**
 * ============================================================================
 *  14 · MINI PROJECTS (12 SOLVED PROBLEMS)
 * ============================================================================
 *  WHAT:  Small, classic JavaScript interview/practice problems.
 *  WHY:   Reading is not enough — writing code is how it sticks.
 *  HOW:   Try each problem yourself FIRST, then read the solution below.
 *         Every solution is a plain function you can copy and experiment with.
 *  GOTCHA: Most bugs here come from edge cases: 0, 1, empty input, negatives.
 * ============================================================================
 */

const section = (title) =>
  console.log(`\n${"─".repeat(60)}\n${title}\n${"─".repeat(60)}`);

// ── 1. FizzBuzz ──────────────────────────────────────────────────────────
// Print numbers 1..n. Multiples of 3 → "Fizz", of 5 → "Buzz", of both → "FizzBuzz".
// Test both FIRST (15) before the individual checks.
function fizzBuzz(n) {
  const output = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) output.push("FizzBuzz");
    else if (i % 3 === 0) output.push("Fizz");
    else if (i % 5 === 0) output.push("Buzz");
    else output.push(i);
  }
  return output;
}

section("1) FizzBuzz(15)");
console.log("  ", fizzBuzz(15).join(" | "));

// ── 2. Prime check ───────────────────────────────────────────────────────
// A prime has exactly two divisors: 1 and itself.
// Optimisation: only test up to √n — if n has a divisor above √n, it also
// has one below it.
function isPrime(n) {
  if (!Number.isInteger(n) || n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

section("2) isPrime");
console.log("   primes up to 20:", [...Array(20)].map((_, i) => i + 1).filter(isPrime));
console.log("   isPrime(1):", isPrime(1), "| isPrime(2):", isPrime(2), "| isPrime(97):", isPrime(97));

// ── 3. Factorial ─────────────────────────────────────────────────────────
// 5! = 5 × 4 × 3 × 2 × 1 = 120. Base case stops the recursion.
function factorial(n) {
  if (!Number.isInteger(n) || n < 0) throw new Error("n must be a non-negative integer");
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

section("3) factorial");
console.log("   0! =", factorial(0), "| 5! =", factorial(5), "| 10! =", factorial(10));

// ── 4. Fibonacci sequence ────────────────────────────────────────────────
// Each number is the sum of the previous two: 0, 1, 1, 2, 3, 5, 8…
function fibonacci(count) {
  const result = [];
  let [a, b] = [0, 1];
  for (let i = 0; i < count; i++) {
    result.push(a);
    [a, b] = [b, a + b]; // parallel assignment — no temp variable!
  }
  return result;
}

section("4) fibonacci(12)");
console.log("  ", fibonacci(12).join(", "));

// ── 5. Reverse a string ──────────────────────────────────────────────────
// Spread into an array first so surrogate pairs (emoji) stay intact.
function reverseString(text) {
  return [...text].reverse().join("");
}

section("5) reverseString");
console.log("   ", reverseString("JavaScript"));
console.log("   emoji-safe:", reverseString("Hi 👋🚀"));

// ── 6. Count vowels ──────────────────────────────────────────────────────
function countVowels(text) {
  return (text.match(/[aeiou]/gi) || []).length;
}

section("6) countVowels");
console.log("   'Education' →", countVowels("Education"));
console.log("   'JS' →", countVowels("JS"));

// ── 7. Anagram check ─────────────────────────────────────────────────────
// Same letters, different order. Normalise: lowercase + strip non-letters.
function normalise(text) {
  return text.toLowerCase().replace(/[^a-z]/g, "").split("").sort().join("");
}
function isAnagram(a, b) {
  const first = normalise(a);
  return first.length > 0 && first === normalise(b);
}

section("7) isAnagram");
console.log("   'listen' / 'silent':", isAnagram("listen", "silent"));
console.log("   'triangle' / 'integral':", isAnagram("triangle", "integral"));
console.log("   'apple' / 'pale':", isAnagram("apple", "pale"));

// ── 8. Second largest ────────────────────────────────────────────────────
function secondLargest(numbers) {
  const unique = [...new Set(numbers)].sort((a, b) => b - a);
  return unique.length >= 2 ? unique[1] : null;
}

section("8) secondLargest");
console.log("   [4, 1, 7, 7, 3] →", secondLargest([4, 1, 7, 7, 3]));
console.log("   [5, 5] →", secondLargest([5, 5]));

// ── 9. Unique values ─────────────────────────────────────────────────────
// A Set stores unique values; spread converts it back to an array.
function unique(values) {
  return [...new Set(values)];
}

section("9) unique");
console.log("   ", unique([1, 2, 2, 3, 1, 4, 3]));
console.log("   ", unique(["a", "b", "a"]));

// ── 10. Two Sum ──────────────────────────────────────────────────────────
// Return the INDEXES of two numbers that add up to the target.
// One pass with a Map: for each n, check if (target - n) was already seen.
function twoSum(numbers, target) {
  const seen = new Map(); // value → index
  for (let i = 0; i < numbers.length; i++) {
    const needed = target - numbers[i];
    if (seen.has(needed)) return [seen.get(needed), i];
    seen.set(numbers[i], i);
  }
  return [];
}

section("10) twoSum");
console.log("   [2,7,11,15], target 9 →", twoSum([2, 7, 11, 15], 9));
console.log("   [3,2,4], target 6 →", twoSum([3, 2, 4], 6));

// ── 11. A bank account using a closure ───────────────────────────────────
// Private balance — nobody can touch it from outside.
function createBankAccount(holder, openingBalance = 0) {
  let balance = openingBalance; // trapped in the closure
  const history = [];

  return {
    holder,
    deposit(amount) {
      if (amount <= 0) throw new Error("Deposit must be positive");
      balance += amount;
      history.push(`+${amount}`);
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) throw new Error("Insufficient funds");
      balance -= amount;
      history.push(`-${amount}`);
      return balance;
    },
    getBalance() { return balance; },
    getHistory() { return [...history]; }, // return a COPY, not the real array
  };
}

section("11) closure bank account");
const account = createBankAccount("Sumit", 500);
console.log("   deposit 200 →", account.deposit(200));
console.log("   withdraw 150 →", account.withdraw(150));
console.log("   balance:", account.getBalance());
console.log("   history:", account.getHistory());
console.log("   can we touch balance directly?", account.balance); // undefined ✅

// ── 12. Password validator ───────────────────────────────────────────────
function validatePassword(password) {
  const rules = [
    { test: (p) => p.length >= 8, message: "at least 8 characters" },
    { test: (p) => /[A-Z]/.test(p), message: "one uppercase letter" },
    { test: (p) => /[a-z]/.test(p), message: "one lowercase letter" },
    { test: (p) => /\d/.test(p), message: "one digit" },
    { test: (p) => /[^A-Za-z0-9]/.test(p), message: "one special character" },
  ];

  const errors = rules.filter((rule) => !rule.test(password)).map((rule) => rule.message);
  return { valid: errors.length === 0, errors };
}

section("12) password validator");
for (const password of ["abc", "Password1", "Strong@123"]) {
  console.log(`   "${password}" →`, validatePassword(password));
}

// ── 13. Bonus: your turn ─────────────────────────────────────────────────
// Try these on your own:
//   • count words in a sentence
//   • find the longest word
//   • flatten a nested array
//   • group students by course using reduce
//   • implement a simple todo list with closures
// Add your solutions below and open a PR — the repo grows with you! 🚀

section("Done! 🎉");
console.log("  12 problems solved. Now try the bonus list above.\n");
