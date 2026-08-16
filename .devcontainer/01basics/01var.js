// Understanding var, let and const in JavaScript

console.log("Sumit");

// const → value cannot be reassigned
const accountId = 14524;

// let → value can be changed later
let accountEmail = "krsumit@gmail.com";

// var → old way of declaring variables
// It can be reassigned, but modern JavaScript generally prefers let/const
var accountPassword = "12345";

// Always declare variables using let, const, or var
let accountCity = "Jaipur";


// -------------------------
// Reassigning variables
// -------------------------

// accountId = 555;
// ❌ Error: Assignment to constant variable.
// const variables cannot be reassigned.

accountEmail = "krss@gmail.com";
// ✅ let variable can be reassigned

accountPassword = "krus";
// ✅ var variable can be reassigned

accountCity = "Udaipur";
// ✅ let variable can be reassigned


// Display all values in table format
console.table([
    accountId,
    accountEmail,
    accountPassword,
    accountCity
]);


//let accountState; --this will be undefined if printed
//diff than not defined that means it doesnt even exist
