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



// ------------------ IIFE (Immidiately Invoked Function Expression) 

// there are 2 forms of iife 
// Form-01 ------------ 
(function(){
    const secret = "I am Alfaz's private key";
    console.log(secret);
})();  

// () -> at the end calls the function right away 

// Form - 02 ----------
(()=>{
    const secret = "I am the still private key";
    console.log(secret);
})();


// Breakdown:
// (function() { ... })   → function EXPRESSION (not declaration)
//                    ()  → immediately calls the expression

// Without IIFE — pollutes global scope
var counter = 0;       // global — anyone can change this
var userName = "Rahim"; // global — collision risk in large apps

// With IIFE — everything stays private
(function() {
  var counter = 0;        // private to this IIFE
  var userName = "Rahim"; // private to this IIFE

  counter++;
  console.log(counter);   // 1
})();

console.log(counter);     // ReferenceError — doesn't exist outside!
console.log(typeof counter); // "undefined"



// IIFE with parameter and return value 

((myparam)=>{
    console.log(myparam);
})(window); // Passing window as argument 

// Capture return value module like pattern 
const counter = (()=>{
    let count = 0;

    return(
        increment(),
        decrement()
    )
})

counter.increment();
counter.increment();
counter.increment();
console.log(counter.getCount()); // 3
console.log(counter.count);      // undefined — truly private!



// This is usefull in nodejs where top level await 

(async()=>{
    const data = await fetch("https://api.example.com/users");
    const users = await data.json();
    console.log(users)
})();


// One time initialization code 
const CONFIG = (()=>{
    const env = ProcessingInstruction.env.NODE_ENV;

    return {
        isDev: env == "development",
        isProd: env == "production",
        apiUrl: env == "production"
        ? "httpps:":"https://"
    };
})();


// In modern Node.js and React projects, you use ES6 modules (import/export) instead of IIFEs for code isolation. But the async IIFE pattern is still used frequently. You will see IIFEs in interviews and legacy codebases regularly.







// -------------------- Pure / Impure Function -------------------------- 


// Pure function 
// Concept: what makes a function "pure"?
// A pure function has exactly two rules: first, given the same inputs, it always returns the same output. Second, it has no side effects — it doesn't change anything outside itself. That's it. Simple rules, enormous consequences.


function add(a,b){
    return a+b;
}
add(3,4) // always 5 no matter what no matter when 


// Doesn't modify input, creates new value instead 

function addItem(cart, newItem){
    return [... cart, newItem]; // return new array the old one is untouched
}

const cart = ["shirt","pant"];
const newCart = addItem(cart, "hat");


// Pure function data without touching otsidde world 
function userData(user){
    return {
        ...user,
        fullname: `${user.firstName} ${user.lastName}`,
        initials: `${user.firstName[0] } ${user.lastName[0]} `
    };
}

// Impure functions — unpredictable, have side effects

// Impure depends on external state (different output for same input)

let taxRat = 0.15;

function calculatetax(amount){
    return amount * taxRat; // depends on external variable .
}

taxRate = 0.20
calculatetax(1000);  // now return 200 instead of 150 - but the input is same;

let total = 0;
let tt = (amount) =>{
    total+=amount;    // modifies externam variable - side effect 
    return total;
}



// Impure - mutches the input argument 
function addItemToCart(cart, item){
    cart.push(item);
    return cart;
}

mycart = ["shirt"];
addItemToCart(mycart,"shoes");
console.log(myCart); // ["shirt", "shoes"] — original was changed!

// IMPURE — other common side effects:
// - console.log()        → writes to console
// - fetch() / API calls  → network request
// - DOM manipulation     → changes the page
// - Math.random()        → different output each call
// - new Date()           → different output each call
// - writing to database  → external state change 