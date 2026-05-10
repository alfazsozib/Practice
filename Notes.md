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
