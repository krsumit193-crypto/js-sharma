/**
 * ============================================================================
 *  13 · THE DOM (BROWSER ONLY)
 * ============================================================================
 *  WHAT:  The DOM is the browser's object representation of an HTML page.
 *  WHY:   JavaScript uses it to read and change what the user sees.
 *  HOW:   select an element → change its content, style or classes →
 *         listen for events.
 *  GOTCHA: This file needs a `document`, which Node.js does NOT have.
 *          Open index.html in a browser and check the console (F12).
 *
 *  RUN:   open 13-dom/index.html in Chrome / Edge / Firefox
 *         (or: npx serve 13-dom)
 * ============================================================================
 */

console.log("13) DOM lesson loaded ✅ (open index.html to interact)");

// ── 1. Selecting elements ────────────────────────────────────────────────

// querySelector returns the FIRST match (or null).
const heading = document.querySelector("#heading");
const welcomeCard = document.querySelector(".card");
const todoList = document.querySelector("#todo-list");

// querySelectorAll returns a static NodeList of ALL matches.
const cards = document.querySelectorAll(".card");

console.log("1) selected:", {
  heading: heading?.textContent,
  cardCount: cards.length,
  firstItem: todoList?.firstElementChild?.textContent,
});

// Older alternatives: getElementById, getElementsByClassName, getElementsByTagName

// ── 2. Reading and changing content ──────────────────────────────────────

console.log("\n2) textContent:", heading.textContent);

// textContent = plain text (SAFE — treats HTML as literal text)
// innerHTML   = parses HTML (DANGEROUS with user input — XSS risk)
// innerText   = visible text, respects CSS (slower)

document.querySelector("#change-text")?.addEventListener("click", () => {
  heading.textContent = "The DOM just changed this text! 🎉";
  console.log("   heading changed via textContent");
});

document.querySelector("#add-highlight")?.addEventListener("click", () => {
  // classList is the clean way to toggle CSS classes.
  heading.classList.toggle("highlight");
  console.log("   highlight class toggled");
});

// ── 3. Creating and inserting elements ───────────────────────────────────

function addTodo(text) {
  const li = document.createElement("li");
  li.textContent = text; // not innerHTML — user text must stay text

  // Click a task to mark it done
  li.addEventListener("click", () => li.classList.toggle("done"));

  // A remove button created with the DOM API
  const removeButton = document.createElement("button");
  removeButton.textContent = "✕";
  removeButton.style.marginLeft = "0.5rem";
  removeButton.addEventListener("click", (event) => {
    event.stopPropagation(); // don't also trigger the li's click
    li.remove();
  });

  li.append(removeButton);
  todoList.appendChild(li); // insert at the end
}

const todoForm = document.querySelector("#todo-form");
todoForm?.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading
  const input = document.querySelector("#todo-input");
  const value = input.value.trim();

  if (!value) return; // guard clause: ignore empty input
  addTodo(value);
  input.value = "";
  input.focus();
  console.log("   added todo:", value);
});

// ── 4. Events ────────────────────────────────────────────────────────────

// addEventListener(type, handler) — the modern way.
// Common events: click, submit, input, change, keydown, mouseover, load.

const unsafeForm = document.querySelector("#unsafe-form");
unsafeForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = document.querySelector("#unsafe-input").value;
  const output = document.querySelector("#output-area");

  // ✅ SAFE: typed text is displayed literally
  output.textContent = value;

  // ❌ UNSAFE (do NOT do this with user input):
  // output.innerHTML = value; // <img onerror=...> would execute!

  console.log("   rendered safely as text:", value);
});

// Event object: event.target = element that triggered it
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") console.log("   Escape key pressed");
});

// ── 5. Styles and attributes ─────────────────────────────────────────────

welcomeCard.style.borderColor = "#f7df1e"; // inline style (use classes normally)
heading.setAttribute("title", "I am a DOM element");
console.log("\n5) title attribute:", heading.getAttribute("title"));

// dataset = data-* attributes
heading.dataset.lesson = "13";
console.log("   data-lesson:", heading.dataset.lesson);

// ── 6. Traversal ─────────────────────────────────────────────────────────

console.log("\n6) traversal:");
console.log("   parent:", todoList.parentElement.className);
console.log("   children:", [...todoList.children].map((li) => li.firstChild?.textContent));
console.log("   next sibling of card:", welcomeCard.nextElementSibling?.tagName);

// ── 7. Removing and replacing ────────────────────────────────────────────

// element.remove()  — remove it
// parent.replaceChild(newNode, oldNode) — swap
// element.before() / after() / prepend() / append() — insert relatively

// ── 8. Waiting for the page ──────────────────────────────────────────────

// The <script> uses `defer`, so the DOM is ready when this file runs.
// Alternative (without defer):
// document.addEventListener("DOMContentLoaded", () => { /* ... */ });

// ── 9. One-line summary ──────────────────────────────────────────────────
// querySelector to find, textContent for safe text, createElement to build,
// appendChild to insert, addEventListener to react, classList to style.
// NEVER put user input into innerHTML.
