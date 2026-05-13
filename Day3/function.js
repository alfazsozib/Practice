// Syntax: starts with the keyword "function" as the FIRST word
// function calculateTax(amount) {
//   return amount * 0.15;
// }

// KEY BEHAVIOUR: fully hoisted — available before its definition
// console.log(calculateTax(1000)); // 150 — works even before the line above!

// function calculateTax(amount) {  // declared AFTER the call
//   return amount * 0.15;
// }

// WHY: During the creation phase, JS stores the ENTIRE function
// body in memory — not just "undefined" like var does.


// const calculateTax = function (amount){
//     return amount * 0.5;
// }


// console.log(calculateTax(1000))

// function calculateTax (amount){
//     return amount * 0.5;
// }


// Arrow functions were introduced in ES6. They look shorter and cleaner, but they are NOT just shorthand for regular functions — they have fundamentally different behaviour in 3 key ways. This is tested constantly in React interviews because React uses both.

// normal function 
const double = function(n){
    return n*2;
}

// Arrow function 
const double = (n)=>{
    return n;
}

// One parameter - drop the parentheses 
const double = n =>{
    return n*2;
}

// single expression body - drop braces AND return keyword 
const double = n => n * 2;

// No parameters - empty parens required 
const greet = () => "Hello";


// returning an object literal - wrap in parentheses 
const makeUser = (name, age) => ({name, age});


// Regular function - 'this' depends on how it's called 
const timer = {
    name: "Alfaz",
    start: function(){
        setTimeout(function(){
            console.log(this.name) // undefined -  this is now window/undefined because the callback is called by setTimeout, not by timer
        }, 100);
    }
};


// store a function in a variable 

const hell0 = function(){console.log("Stored Hello")}
hell0()

// Pass a function as an argument ()
function runTwice(fn){
    fn();
    fn()
}
runTwice(()=>{console.log('Running!')})


// store function in objects 
const mathUtils = {
    add: (a,b) => a+b,
}
console.log(mathUtils.add(3,4));


// store function in arrays
const pipeline = [
    x => x*2,
    x => x*3
]




// Higher order function. Functions that work with functions 
// A higher order function either:
// a) takes a function as an argument, OR
// b) Returns a function, Or both

// Example a — takes a function:
function applyOperation(num, operation) {
  return operation(num);
}
console.log(applyOperation(5, n => n * n));  // 25
console.log(applyOperation(5, n => n + 10)); // 15



// Example b — returns a function:
function createValidator(min, max) {
  return function(value) {       // returned function
    return value >= min && value <= max;
  };
}
const isValidAge   = createValidator(18, 65);
const isValidScore = createValidator(0, 100);

console.log(isValidAge(25));   // true
console.log(isValidAge(15));   // false
console.log(isValidScore(85)); // true

// Real-world: Array methods like map, filter, reduce
// are ALL higher-order functions — they take a function as argument
[1,2,3].map(n => n * 2); // map is HOF, n => n*2 is callback