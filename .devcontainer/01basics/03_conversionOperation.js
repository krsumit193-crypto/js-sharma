// String to Number Conversion in JavaScript

let score = "30abc";

// typeof tells us the data type of a variable
console.log(typeof score); // string


// Number() attempts to convert the value into a Number
let valueInNumber = Number(score);

console.log(typeof valueInNumber); // number
console.log(valueInNumber);        // NaN


// Important:
// "30abc" is not a valid number because it contains "abc".
// Number("30abc") therefore returns NaN (Not a Number).
//
// Note: typeof NaN is still "number" because NaN is a special
// numeric value in JavaScript that represents an invalid number result.
// Number to String Conversion

let someNumber = 33;

let stringNumber = String(someNumber);

console.log(stringNumber);        // 33
console.log(typeof stringNumber);  // string


// String() converts the given value into a String.
// Even though the output looks like 33, its data type is now "string".