/**
 * ============================================================================
 *  06 · OBJECTS
 * ============================================================================
 *  WHAT:  A collection of key → value pairs.
 *  WHY:   Real-world things (a user, an order, a settings file) have named
 *         properties, not just positions in a list.
 *  HOW:   object literals, dot/bracket access, methods, destructuring, spread.
 *  GOTCHA: Objects are copied by REFERENCE — two variables can share one object.
 * ============================================================================
 */

// ── 1. Creating an object ────────────────────────────────────────────────

const student = {
  name: "Sumit",
  age: 22,
  city: "Patna",
  isActive: true,
};

console.log("1) student:", student);
console.log("   dot access:", student.name);
console.log("   bracket access:", student["age"]);

// Bracket notation is needed when the key is dynamic or has special chars.
const key = "city";
console.log(`   dynamic key "${key}":`, student[key]);

// ── 2. Adding, updating, deleting ────────────────────────────────────────

student.course = "B.Tech";   // add a new property
student.age = 23;            // update
delete student.isActive;     // remove

console.log("\n2) after add/update/delete:", student);
console.log("   'course' in student?", "course" in student);
console.log("   has own 'name'?", Object.hasOwn(student, "name"));

// ── 3. Methods and `this` ────────────────────────────────────────────────

const counter = {
  value: 0,
  // A method is just a function stored as a property.
  increment() {
    this.value += 1;   // `this` = the object that called the method
    return this.value;
  },
  reset() {
    this.value = 0;
  },
};

console.log("\n3) counter:");
console.log("   ", counter.increment()); // 1
console.log("   ", counter.increment()); // 2
counter.reset();
console.log("   after reset:", counter.value);

// ⚠️ Extracting a method loses `this`:
const lost = counter.increment;
// lost(); // ❌ TypeError / undefined in strict mode
// Fix: counter.increment.bind(counter) or use an arrow wrapper.

// ── 4. Shorthand properties & computed keys ──────────────────────────────

const name = "Riya";
const age = 21;
const field = "city";

const person = {
  name,                     // same as name: name
  age,
  [field]: "Delhi",         // computed key → city: "Delhi"
  greet() { return `Hi, I'm ${this.name}`; }, // method shorthand
};

console.log("\n4) shorthand object:", person);
console.log("   person.greet():", person.greet());

// ── 5. Nested objects ────────────────────────────────────────────────────

const order = {
  id: "ORD-101",
  customer: { name: "Aman", address: { city: "Mumbai", pin: 400001 } },
  items: [
    { name: "book", qty: 2, price: 250 },
    { name: "pen", qty: 3, price: 20 },
  ],
};

console.log("\n5) nested value:", order.customer.address.city);
console.log("   optional chaining:", order.customer?.address?.pin);
console.log("   missing nested key:", order.customer?.phone?.number); // undefined, no error

// ── 6. Object helpers ────────────────────────────────────────────────────

console.log("\n6) Object helpers:");
console.log("   keys:", Object.keys(student));
console.log("   values:", Object.values(student));
console.log("   entries:", Object.entries(student));
console.log("   fromEntries:", Object.fromEntries([["a", 1], ["b", 2]]));

// Convert an object to a map-like transformation using entries:
const prices = { apple: 40, banana: 20 };
const withGst = Object.fromEntries(
  Object.entries(prices).map(([item, price]) => [item, price * 1.05])
);
console.log("   with GST:", withGst);

// ── 7. Destructuring ─────────────────────────────────────────────────────

const { name: studentName, age: studentAge, course = "N/A" } = student;
console.log("\n7) destructured:", { studentName, studentAge, course });

// Nested destructuring with a default
const { customer: { address: { city = "unknown" } = {} } = {} } = order;
console.log("   nested city:", city);

// Rest collects the leftovers
const { name: first, ...others } = student;
console.log("   rest:", others);

// ── 8. Spread: copying and merging ───────────────────────────────────────

const base = { theme: "dark", language: "en" };
const custom = { ...base, theme: "light", fontSize: 16 };
console.log("\n8) merge:", custom);
console.log("   original untouched:", base);

// ── 9. JSON: objects ↔ strings ───────────────────────────────────────────

// APIs and localStorage send TEXT, so objects must be serialised.
const jsonText = JSON.stringify(order);
console.log("\n9) JSON.stringify (first 80 chars):", jsonText.slice(0, 80) + "...");
console.log("   round trip equal?", JSON.stringify(JSON.parse(jsonText)) === jsonText);

// JSON does NOT preserve functions, undefined, Dates (become strings), or NaN.
console.log("   JSON drops undefined:", JSON.stringify({ a: 1, b: undefined }));

// ── 10. Reference gotcha ─────────────────────────────────────────────────

const a = { value: 1 };
const b = a;        // b points to the SAME object
b.value = 99;
console.log("\n10) a.value after changing b:", a.value); // 99

const c = { ...a }; // shallow copy
c.value = 5;
console.log("    with spread copy, a.value:", a.value); // still 99

// Deep copy for nested objects:
const deepOrder = structuredClone(order);
deepOrder.customer.address.city = "Pune";
console.log("    deep copy kept original:", order.customer.address.city); // Mumbai

// ── 11. One-line summary ─────────────────────────────────────────────────
// Dot for known keys, [] for dynamic keys. Use ?. for possibly-missing nesting.
// Destructuring pulls values out; spread copies/merges objects.
// Objects are references — use {...obj} or structuredClone() to copy.
