// 4 rules of this  


// Default binding (plain function call)

function showThis(){
    console.log(this);
}

showThis(); 
// if we run that function in browser will get window object
// if we run that function in node js  will get global object
// if we run that function with strict mode will get undefined

// Strict mode এ this = undefined
"use strict";
function showThis() {
  console.log(this); // undefined
}
showThis();

// Which things should be strictly checked after applying strict mode 

// A) Undeclared Variable forbid kore (x = 10)
// B) Duplicate parameter allow kore na (function test(a, a) {})
// C) Researved keyword use kora jai na 

// Rule - 02 

// implicit binding (object method call)
const user = {
    name: 'Rahim',
    age: 24,
    greet(){
         // এই function user object-এর method
        // user.greet() — মানে user-ই call করছে
        // তাই this = user
        console.log(`Hi, I'm ${this.name}, age ${this.age}`);
    }
}

user.greet(); // "Hi, I'm Rahim, age 24" ✓
// this = user — কারণ user. দিয়ে call করা হয়েছে




// Nested object - this = direct caller 
const company = {
  name: "TechCorp",
  ceo: {
    name: "Karim",
    introduce() {
      console.log(`CEO: ${this.name} at ${this.company}`);
      // this = ceo object (direct caller)
      // this.company = undefined — ceo-র কোনো company property নেই!
    }
  }
};

company.ceo.introduce(); // "CEO: Karim at undefined"
// this = ceo, NOT company — direct caller rule!



// Implicit binding হারিয়ে যাওয়া — সবচেয়ে common bug

const user = {
  name: "Rahim",
  greet() {
    console.log(`Hello ${this.name}`);
  }
};

// Direct method call — works ✓
user.greet(); // "Hello Rahim"

// Function variable-এ assign করলে binding হারায়!
const greetFn = user.greet; // reference copy — object connection হারালো
greetFn();    // "Hello undefined" — this = window/undefined

// কেন? greetFn() = plain function call (Rule 1)
// আর কোনো object নেই সামনে — তাই default binding


// Rule 3 — new binding (constructor call)

function Person(name, age){
    // new দিয়ে call করলে:
    // 1. একটা নতুন empty object তৈরি হয়
    // 2. this = সেই নতুন object
    // 3. properties assign হয়
    // 4. নতুন object automatically return হয়
    this.name = name;
    this.age = age;
    this.greet = function (){
        console.log(`Hi I'm ${this.name}`);

    }
}
const rahim = new Person("Rahim", 24);
const karim = new Person("Karim", 28);

// --------------------- call, apply, bind ----------------------- 

// call ()
function introduce(city, job){
  console.log(`${this.name} from ${city}, works as ${job}`);
}
const person1 = { name: "Rahim" };
const person2 = { name: "Karim" };

// Syntax: fn.call(thisValue, arg1, arg2, ...)
introduce.call(person1,'Rajshahi',"Developer")
introduce.call(person2, "Chittagong", "Designer"); // "Karim from Chittagong, works as Designer"

// Real use case - borrow a method from another object 
const animal = {
  type: "Dog",
  describe(){
    console.log(`I am a ${this.type} named ${this.name}`)
  }
}

const myPet = {name: "Alfaz", type:"Cat"};
animal.describe.call(myPet);

// run the describe function from animal object but use myPet object properties 

// ----- Apply() -----------
function introduce(city, job){
  console.log(`${this.name} from ${city}, works as ${job}`);
}

const person = {name: "Rahim"};

// Syntax: fn.apply(thisValue, [arg1,arg2,arg3]) 
introduce.apply(person, ["Dhaka", "Developer"]); // same output


