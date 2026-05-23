----------------------- Day 1 ---------------------------

1. How javascript stores variables in memory?
   => Js has two phase when it runs any script: a create phase and an execution phase. This is the root of hoisting and the TDZ.
   Phase-1: JS Scans the entire file first. It finds all variables and functions declarations and sets them up in memory before executing a single line. This is called hoisting.
   Phase-2: Only after the createion phase does JS run our code top to bottom. But by then, variable already exists in memory. just not necessarily with their values yet.

2. This is a common interview trap: "Why does changing b also change a?" — because both variables point to the same object in heap memory. Primitives don't have this issue.

3. var was the only way to declare a variable before ES6. Var is function Scoped not Block Scoped
4. let and const are block-scoped, cannot be re declared, and have a completely different hoisting behaviour -- The temporal Deadzone
5. The Temporal Deadzone. let and const are hoisted just like var. But unlike var, they are not initialized with undefined. Instead, they sit in a special state called the Temporal Deadzone from the start of their scope until their declaration line is reached.

The 3 interview answers you must know cold

// Q1: "What is hoisting?"
// Hoisting is JavaScript's behaviour of moving variable and
// function declarations to the top of their scope during the
// creation phase — before any code executes.
// var → hoisted and initialized to undefined
// let/const → hoisted but in TDZ (uninitialized) → ReferenceError if accessed early

// Q2: "What is the Temporal Dead Zone?"
// The TDZ is the period between the start of a let/const
// variable's scope and its declaration line. During this
// period, the variable exists in memory but is uninitialized.
// Accessing it throws a ReferenceError.

// Q3: "What is the difference between var, let, and const?"
// var: function-scoped, can be re-declared, hoisted to undefined
// let: block-scoped, cannot be re-declared, TDZ until declaration
// const: block-scoped, cannot be re-declared OR reassigned, TDZ

Golden rule for real projects
// 1. Use const by default — for everything
const API_URL = "https://api.example.com";
const user    = { name: "Rahim" }; // object contents can still change

// 2. Use let only when you KNOW the value will change
let score = 0;
score += 10; // makes sense with let

// 3. Never use var — there is no valid reason in modern JS
// If you see var in a codebase, it's legacy code






---

----------------- Day 2 ---------------------------

# What is an execution context?

Everytime Javascript runs code, whether the whole file or a single function call, it creates a box called an Execution Context.
This box contains everything JS needs to run that piece of code: the variables, the value of this, and a reference to the outer environment.

Real-world analogy first

Imagine a chef (JS engine) working in a kitchen. Every dish order creates a new workspace (execution context) with its own cutting board, ingredients list, and tools. The chef works on one workspace at a time. When the dish is done, the workspace is cleared. That's exactly how JS handles function calls.

Two components inside every execution context

Variable Environment
— all variable declarations
— function declarations
— arguments object

Scope Chain
— reference to outer EC
— enables variable lookup
— set at creation time

Two types of execution context
// 1. GLOBAL EXECUTION CONTEXT (GEC)
// — created automatically when JS starts running your file
// — there is exactly ONE global EC per program
// — creates global object (window in browser, global in Node)
// — sets this = window (browser) or global (Node)
// — runs through your entire file

// 2. FUNCTION EXECUTION CONTEXT (FEC)
// — created EVERY TIME a function is CALLED (not defined)
// — each call = fresh execution context
// — destroyed after the function returns
// — has its own variable environment

function greet(name){
A new FEC is created right here when greet() is called
It contains name = "Alfaz", this = ..., outer = GEC

const message = `hello ${name}`
return message;
FEC is destroyed here - message is gone from memory.
}

greet("Rahim")
greet("Karim")

The call stack - How JS tracks what's running?
= The call stack is a data structure that tracks which execution context is currently active. It works exactly like a stack of plates,
last in, First out (LIFO). Js can onyl run ONE execution context at a time whichever is on top of the stack.

# Lexical Scope

Lexical means "at the time of writing." Lexical scope means: a variable's scope is determined by WHERE you physically write the function in your code — not where you call it from. This is one of the most fundamental concepts in JavaScript, and it's the direct parent of closures.

# functions

// Q1: Declaration vs Expression?
// Declaration: starts with 'function', fully hoisted, callable before its line.
// Expression: assigned to variable, follows TDZ rules, not callable before line.

// Q2: How are arrow functions different?
// 1. No own 'this' — inherits lexically
// 2. No 'arguments' object — use rest params
// 3. Cannot be used as constructor with 'new'

// Q3: What is an IIFE and why use it?
// Function that defines and calls itself immediately.
// Creates private scope, avoids global pollution,
// used for async IIFEs and in legacy/bundled code.

// Q4: What is a pure function?
// (a) Same inputs → always same output
// (b) No side effects — nothing outside is modified.

// Q5: What is a higher-order function?
// Takes a function as argument OR returns a function.
// Examples: map, filter, reduce, setTimeout, addEventListener.

Practice tasks
// TASK 1 — write the same logic 3 ways:
// A function that takes a number and returns its square.
// Write as: declaration, expression, and arrow function.

// TASK 2 — fix this impure function:
let discount = 10;
function getPrice(price) {
return price - discount; // impure!
}
// Rewrite as a pure function.

// TASK 3 — build a private counter using IIFE:
// Returns object with increment(), decrement(), reset(), getValue()
// Internal count must be completely private.

// TASK 4 — predict the output BEFORE running:
const obj = {
name: "Rahim",
regularFn: function() {
setTimeout(function() {
console.log("regular:", this.name);
}, 100);
},
arrowFn: function() {
setTimeout(() => {
console.log("arrow:", this.name);
}, 100);
}
};
obj.regularFn(); // what prints?
obj.arrowFn(); // what prints?

#-------------------------- Closure ------------------

# function outer() {

# const message = "আমি outer-এর variable"; // outer-এর scope

# function inner() {

# // inner function টা outer-এর message দেখতে পাচ্ছে

# console.log(message); // ← এটাই closure!

# }

# return inner; // function টা return করছি — call করছি না

# }

# const myFunc = outer(); // outer() শেষ হলো — message মুছে যাওয়ার কথা

# myFunc(); // "আমি outer-এর variable"

# // কিন্তু মুছে যায়নি! কারণ inner function সেটা ধরে রেখেছে।

# // এটাই Closure।

Memory-তে কী হচ্ছে step by step
1
outer() call হলো
Execution Context তৈরি হলো। message = "আমি outer-এর variable" memory-তে বসলো।
2
inner function তৈরি হলো
inner function define হওয়ার সময় সে তার lexical scope-এর একটা reference রেখে দিলো — মানে message-এর দিকে একটা pointer।
3
outer() return করলো এবং শেষ হলো
outer-এর Execution Context destroyed। কিন্তু message মুছলো না — কারণ inner function এখনো সেটার reference ধরে আছে।
4
myFunc() call হলো
inner function run হলো। সে তার backpack-এ থাকা message খুঁজে পেলো এবং print করলো।

# এটা একটা critical concept যেটা না বুঝলে closure নিয়ে বড় bug করবে। Closure variable-এর value copy করে রাখে না — সে variable-এর actual memory location-এর reference রাখে।

# Reference রাখে — তাই update হলে নতুন value পায়

function makeCounter() {
let count = 0; // একটাই count — shared

return {
increment() { count++; },
decrement() { count--; },
getCount() { return count; }
};
}

const counter = makeCounter();
counter.increment(); // count = 1
counter.increment(); // count = 2
counter.increment(); // count = 3
console.log(counter.getCount()); // 3

// increment, decrement, getCount — তিনটাই
// একই count variable-এর LIVE reference ধরে আছে।
// একজন change করলে বাকিরাও নতুন value দেখে।

প্রতিটা closure-এর নিজস্ব scope — independent

function makeCounter() {
let count = 0; // প্রতিবার নতুন count তৈরি হয়
return {
increment() { count++; },
getCount() { return count; }
};
}

const counterA = makeCounter(); // নতুন count = 0 (A-র জন্য)
const counterB = makeCounter(); // নতুন count = 0 (B-র জন্য) — আলাদা!

counterA.increment();
counterA.increment();
counterA.increment();

counterB.increment();

console.log(counterA.getCount()); // 3 — A-র নিজের count
console.log(counterB.getCount()); // 1 — B-র নিজের count
// দুটো সম্পূর্ণ independent — একজন অন্যজনকে affect করে না!

# 3টা interview answer — এভাবে বলো

// Q1: "What is a closure?"
// A closure is a function that retains access to its outer
// lexical scope even after the outer function has finished
// executing. The inner function keeps a live reference to
// the outer variables — not a copy.

// Q2: "Why do closures exist / what are they useful for?"
// 1. Data privacy — variables inaccessible from outside
// 2. Stateful functions — functions that remember state
// between calls (like counters, event handlers)
// 3. Function factories — creating specialized functions
// from a general template (e.g. createMultiplier)
// 4. Callbacks & async — setTimeout, event listeners
// all rely on closures to remember surrounding context

// Q3: "Explain the var loop closure bug"
// var is function-scoped — all loop iterations share
// ONE variable. Closures hold a live reference, not a copy.
// By the time the callbacks run, the loop has ended and the
// shared variable holds the final value. Fix: use let
// (creates a new scope per iteration) or IIFE to capture
// each value immediately.
\

# \Practice tasks — সব করো

// TASK 1 — makeAdder factory:
// Write a function makeAdder(x) that returns a function.
// The returned function takes y and returns x + y.
// const add5 = makeAdder(5);
// console.log(add5(3)); // 8
// console.log(add5(10)); // 15

// TASK 2 — private counter:
// Create a createCounter() function that returns
// { increment, decrement, reset, getValue }
// The count must be private — not accessible directly.

// TASK 3 — once() function:
// Write a once(fn) function that returns a wrapper.
// The wrapper calls fn only on the first call.
// Every subsequent call returns the first result silently.

// TASK 4 — predict the output:
function outer() {
let x = 10;

function inner() {
let y = 20;
console.log(x + y);
}

x = 50; // x changed AFTER inner was defined
return inner;
}

const fn = outer();
fn(); // what prints? 30 or 70? Write your reasoning first.

// TASK 5 — fix the loop bug:
// Rewrite this so it prints 0, 1, 2 after 1 second:
for (var i = 0; i < 3; i++) {
setTimeout(() => console.log(i), 1000);
}
// Write TWO different solutions.
