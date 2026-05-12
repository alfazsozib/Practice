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