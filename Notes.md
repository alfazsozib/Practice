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

Lexical Scope
Lexical means "at the time of writing." Lexical scope means: a variable's scope is determined by WHERE you physically write the function in your code — not where you call it from. This is one of the most fundamental concepts in JavaScript, and it's the direct parent of closures.
