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





//operations#################//
let value=3
let negValue=-value
console.log(negValue)

//console.log(2+ or - or * or ** or / or %2)

let str1="sumit"
let str2="sharma"

let str3=str1+str2
console.log(str3)
console.log("1"+2+2)  //ans=122
console.log(1+2+"2")  // ans 32
console.log(+true)
console.log(+"")

let  num1,nuum2,num3
num1=num2=num3=2+2
console.log(num1,num2,num3)
let gameCounter=100
gameCounter++
console.log(gameCounter)