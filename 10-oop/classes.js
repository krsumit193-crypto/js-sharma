/**
 * ============================================================================
 *  10 · OBJECT-ORIENTED JAVASCRIPT (CLASSES)
 * ============================================================================
 *  WHAT:  Classes are blueprints for creating objects.
 *  WHY:   Group data (properties) and behaviour (methods) that belong together.
 *  HOW:   class, constructor, methods, extends/super, private fields, static.
 *  GOTCHA: Arrow functions as class methods do NOT get `this` from an instance
 *          the way ordinary methods do. Use regular methods by default.
 * ============================================================================
 */

// ── 1. A basic class ─────────────────────────────────────────────────────

class Student {
  // `constructor` runs automatically when you call `new Student(...)`.
  constructor(name, age, course) {
    this.name = name;    // `this` = the new object being created
    this.age = age;
    this.course = course;
    this.marks = [];
  }

  // Method shorthand — no `function` keyword, no comma.
  addMark(mark) {
    this.marks.push(mark);
    return this; // returning `this` enables chaining
  }

  getAverage() {
    if (this.marks.length === 0) return 0;
    const total = this.marks.reduce((sum, m) => sum + m, 0);
    return total / this.marks.length;
  }

  introduce() {
    return `Hi, I'm ${this.name}, ${this.age}, studying ${this.course}.`;
  }
}

const sumit = new Student("Sumit", 22, "B.Tech");
sumit.addMark(88).addMark(92).addMark(75); // chaining works because addMark returns this

console.log("1) student:", sumit.introduce());
console.log("   marks:", sumit.marks);
console.log("   average:", sumit.getAverage().toFixed(2));

// ── 2. Getters and setters ───────────────────────────────────────────────

class Product {
  constructor(name, price) {
    this.name = name;
    this._price = price; // the underscore is just a convention
  }

  // A getter is read like a property, but runs a function.
  get price() {
    return this._price;
  }

  // A setter lets you validate on assignment.
  set price(value) {
    if (value < 0) throw new Error("Price cannot be negative");
    this._price = value;
  }

  get displayPrice() {
    return `₹${this._price.toFixed(2)}`;
  }
}

const book = new Product("JavaScript Book", 499);
console.log("\n2) product:", book.displayPrice);
book.price = 449; // calls the setter
console.log("   after discount:", book.displayPrice);
try {
  book.price = -10; // ❌ throws
} catch (error) {
  console.log("   validation:", error.message);
}

// ── 3. Private fields (#) ────────────────────────────────────────────────

// True privacy — not accessible from outside the class at all.
class BankAccount {
  #balance = 0;              // private field
  #accountNumber;

  constructor(holder, accountNumber) {
    this.holder = holder;    // public
    this.#accountNumber = accountNumber;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.#balance += amount;
    return this.#balance;
  }

  withdraw(amount) {
    if (amount > this.#balance) return "Insufficient funds";
    this.#balance -= amount;
    return this.#balance;
  }

  getBalance() {
    return `₹${this.#balance}`;
  }

  static getBankName() {
    return "Sharma Bank"; // static = called on the CLASS, not an instance
  }
}

const account = new BankAccount("Sumit", "AC123");
console.log("\n3) private fields:");
console.log("   deposit:", account.deposit(1000));
console.log("   withdraw:", account.withdraw(250));
console.log("   balance:", account.getBalance());
// console.log(account.#balance); // ❌ SyntaxError — truly private
console.log("   static method:", BankAccount.getBankName());

// ── 4. Inheritance (extends + super) ─────────────────────────────────────

class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    return `${this.name} says ${this.sound}`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name, "woof"); // must call super() before using `this`
    this.breed = breed;
  }

  // Override the parent method
  speak() {
    return `${super.speak()} — and I'm a ${this.breed}`;
  }

  fetch() {
    return `${this.name} fetched the ball!`;
  }
}

const dog = new Dog("Bruno", "Labrador");
console.log("\n4) inheritance:");
console.log("   ", dog.speak());
console.log("   ", dog.fetch());
console.log("   instance of Animal?", dog instanceof Animal);
console.log("   instance of Dog?", dog instanceof Dog);

// ── 5. Polymorphism ──────────────────────────────────────────────────────

// Same method name, different behaviour depending on the object.
const animals = [
  new Animal("Cow", "moo"),
  new Dog("Rocky", "German Shepherd"),
];

console.log("\n5) polymorphism:");
for (const animal of animals) {
  console.log("   ", animal.speak());
}

// ── 6. Static properties and a factory ───────────────────────────────────

class User {
  static count = 0;

  constructor(name) {
    this.name = name;
    User.count++;
  }

  static fromObject(data) {
    return new User(data.fullName ?? data.name);
  }
}

const u1 = new User("Sumit");
const u2 = User.fromObject({ fullName: "Riya Sharma" });
console.log("\n6) static:", u1.name, "|", u2.name, "| total users:", User.count);

// ── 7. Composition is often better than inheritance ─────────────────────

// "has a" instead of "is a" keeps classes loosely coupled.
const canFly = {
  fly() { return `${this.name} is flying`; },
};
const canSwim = {
  swim() { return `${this.name} is swimming`; },
};

const duck = Object.assign({ name: "Donald" }, canFly, canSwim);
console.log("\n7) composition:", duck.fly(), "|", duck.swim());

// ── 8. The arrow-method gotcha ───────────────────────────────────────────

class BadExample {
  constructor() { this.value = 42; }
  // ❌ arrow captures `this` from the class body scope, not the instance
  arrowMethod = () => this.value;
  // ✅ regular method gets `this` from the call site
  normalMethod() { return this.value; }
}

const example = new BadExample();
console.log("\n8) methods:", example.normalMethod(), "|", example.arrowMethod());
// Arrows ARE useful as callbacks passed elsewhere — they keep `this` bound.

// ── 9. One-line summary ──────────────────────────────────────────────────
// class = blueprint, constructor = setup, methods = behaviour.
// #private fields really are private. static belongs to the class itself.
// extends/super for inheritance; prefer composition when behaviour is shared.
