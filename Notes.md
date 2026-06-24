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

# Day - 6

# Prototype

JavaScript-এ প্রতিটা object-এর একটা hidden property আছে — [[Prototype]]। এটা অন্য একটা object-কে point করে। সেই object-এ থাকা properties এবং methods তুমি নিজের object থেকে use করতে পারো। এটাই Prototype — এবং এটাই JavaScript-এর inheritance-এর ভিত্তি।

// প্রতিটা array-এ .map(), .filter(), .push() কোথা থেকে আসে?
const nums = [1, 2, 3];
nums.push(4); // push() কোথায় defined?

// nums নিজে push() define করেনি।
// কিন্তু nums-এর prototype = Array.prototype
// Array.prototype-এ push() defined আছে।
// JS খুঁজে পেয়ে গেল — তাই কাজ করলো!

console.log(nums.**proto** === Array.prototype); // true

// একইভাবে:
"hello".toUpperCase(); // String.prototype-এ defined
(42).toString(); // Number.prototype-এ defined
({}).hasOwnProperty(); // Object.prototype-এ defined

**proto** and prototype both are different things.
// **proto** (দুই underscore দিয়ে):
// প্রতিটা OBJECT-এর hidden property
// এটা object-এর prototype-কে point করে

const arr = [1, 2, 3];
arr.**proto** === Array.prototype; // true — arr-এর prototype
**proto** = object কোথায় methods খুঁজবে
prototype = methods store করার common জায়গা

এই কারণেই React, Node, JS libraries—সবখানে prototype system কাজ করে internally.

# Object.create() হলো সবচেয়ে clean এবং direct উপায় prototype set করার। এটা একটা নতুন object তৈরি করে যার prototype তুমি নিজে specify করো।

# ------------------------

# Prototype system powerful — কিন্তু ভুলভাবে use করলে বড় সমস্যা হয়। Senior developer হতে হলে এই pitfalls জানতে হবে।

# Built-in prototype modify করা — কখনো করো না

# // NEVER DO THIS — built-in prototype modify করা

# Array.prototype.sum = function() {

# return this.reduce((a, b) => a + b, 0);

# };

# [1, 2, 3].sum(); // 6 — কাজ করে, কিন্তু...

# // সমস্যা 1: সব array globally affected

# // সমস্যা 2: অন্য library একই নামে আলাদা কিছু add করলে conflict

# // সমস্যা 3: future JS version-এ same name-এ method আসলে clash

# // এটাকে বলে "Prototype Pollution" — একটা security vulnerability!

# // ✓ সঠিক উপায় — utility function তৈরি করো

# function sumArray(arr) {

# return arr.reduce((a, b) => a + b, 0);

# }

# sumArray([1, 2, 3]); // 6 — safe ✓

Prototype pollution attack — security concern

# // Attacker এই ধরনের input দিতে পারে:

# const userInput = JSON.parse('{"**proto**": {"isAdmin": true}}');

# // Merge করলে:

# const obj = {};

# Object.assign(obj, userInput); // prototype polluted!

# const victim = {};

# console.log(victim.isAdmin); // true — সব object affect হলো!

# // Fix: Object.create(null) বা structured clone use করো

# const safeObj = Object.create(null); // no prototype — safe

# // অথবা

# const safe = structuredClone(userInput); // deep safe copy

# Composition over inheritance — modern approach

# // Inheritance chain অনেক deep হলে fragile হয়ে যায়

# // Modern approach: composition — small pieces জোড়া দাও

# // Instead of:

# class FlyingSwimmingHuntingAnimal extends Animal { ... }

# // Do this:

# const canFly = (obj) => ({

# fly: () => console.log(`${obj.name} is flying`)

# });

# const canSwim = (obj) => ({

# swim: () => console.log(`${obj.name} is swimming`)

# });

# const canHunt = (obj) => ({

# hunt: () => console.log(`${obj.name} is hunting`)

# });

# function createDuck(name) {

# const duck = { name };

# return Object.assign(duck, canFly(duck), canSwim(duck));

# }

# const duck = createDuck("Donald");

# duck.fly(); // "Donald is flying"

# duck.swim(); // "Donald is swimming"

## Interview answers — এভাবে বলো

// Q1: "Prototype chain কী?"
// প্রতিটা JS object-এর একটা hidden [[Prototype]] property আছে
// যেটা অন্য object-কে point করে। কোনো property/method না পেলে
// JS এই chain ধরে উপরে উপরে খোঁজে — শেষ পর্যন্ত null পর্যন্ত।
// এটাই prototype chain — JS-এর inheritance mechanism।

// Q2: "**proto** এবং .prototype-এর পার্থক্য?"
// **proto**: প্রতিটা object-এর property — তার prototype-কে point করে
// .prototype: শুধু function-এর property — new দিয়ে তৈরি
// objects এই prototype-কে **proto** হিসেবে পাবে।

// Q3: "JavaScript class কি Java class-এর মতো?"
// না। JS class হলো prototype-based inheritance-এর syntactic sugar।
// typeof ClassName = "function" — ভেতরে prototype mechanism-ই কাজ করে।
// Java-তে class আলাদা entity, JS-এ শুধু cleaner syntax।

// Q4: "Object.create() কী করে?"
// নির্দিষ্ট prototype সহ নতুন object তৈরি করে।
// Object.create(proto) → নতুন object যার **proto** = proto।
// null দিলে prototype-less object তৈরি হয়।

Practice Task for Interviews

// TASK 1 — prototype chain trace করো:
const obj = { a: 1 };
// obj.toString() কোথা থেকে আসে? Chain লিখো।
// obj.hasOwnProperty("a") কী return করবে? কেন?
// obj.hasOwnProperty("toString") কী return করবে? কেন?

// TASK 2 — constructor function দিয়ে inheritance:
// Vehicle(speed, fuel) constructor তৈরি করো
// Car(speed, fuel, brand) তৈরি করো যেটা Vehicle extend করে
// Car.prototype-এ honk() method দাও
// Vehicle.prototype-এ describe() method দাও
// Car instance তৈরি করে দুটো method-ই call করো

// TASK 3 — same thing class দিয়ে:
// TASK 2-এর সব কিছু class syntax দিয়ে rewrite করো
// private #fuel field use করো
// static method createElectric(brand) add করো

// TASK 4 — composition:
// canDrive, canFly, canFloat — তিনটা function তৈরি করো
// createAmphibiousVehicle(name) তৈরি করো
// যেটা canDrive + canFloat combine করবে
