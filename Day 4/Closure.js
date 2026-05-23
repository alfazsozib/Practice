// Example of a simple closure function 

// function outer() {
//   const message = "আমি outer-এর variable"; // outer-এর scope

//   function inner() {
//     // inner function টা outer-এর message দেখতে পাচ্ছে
//     console.log(message); // ← এটাই closure!
//   }

//   return inner; // function টা return করছি — call করছি না
// }

// const myFunc = outer(); // outer() শেষ হলো — message মুছে যাওয়ার কথা
// myFunc();                // "আমি outer-এর variable"
// // কিন্তু মুছে যায়নি! কারণ inner function সেটা ধরে রেখেছে।
// // এটাই Closure।

// function makeCounter(){
//     let count = 0;

//     return{
//         increment() {count+=1},
//         decrement() {count--},
//         getCount() {return count}
//     }
// }

// const counter = makeCounter();
// counter.increment(); // count = 1
// counter.increment(); // count = 2

// console.log(counter.getCount()); // 3



// দুটো সম্পূর্ণ independent — একজন অন্যজনকে affect করে না!

// function makeCounter(){
//     let count = 0;
//     return {
//         increment() {count++},
//         getCount() {return count}
//     };
// };

// const counterA = makeCounter(); // counter for A 
// const counterB = makeCounter(); // Counter for B 

// counterA.increment();
// counterA.increment();
// counterA.increment();

// counterB.increment();

// console.log(counterA.getCount()); // 3 — A-র নিজের count
// console.log(counterB.getCount()); // 1 — B-র নিজের count

// সবচেয়ে বিখ্যাত closure bug — loop-এ var
// Day 1-এ দেখেছিলে এই bug — এখন পুরো কারণ বুঝবে:
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output: 3, 3, 3  ← expected: 0, 1, 2

// কেন? var function-scoped — একটাই i সবার জন্য shared।
// Closure তিনটাই সেই একই i-এর reference ধরে আছে।
// 1 second পরে loop শেষ — i = 3।
// তিনটা callback-ই একই i দেখে → 3, 3, 3


for (let i=0; i<3; i++){
    setTimeout(()=> console.log(i), 1000);
}

// let can solve that problem. because let create separate lexical environment for each iteration 
// কারণ let block-scoped।
// আর for loop এ JavaScript special behavior করে:
// প্রতিটা iteration এ নতুন variable তৈরি হয়
// Callback 1 ---> i = 0
// Callback 2 ---> i = 1
// Callback 3 ---> i = 2

// IIFE can solve that problem because it call the function on each iteration.
for(var i=0; i<3; i++){
    ((j)=>{
        setTimeout(()=>{
            console.log(j)
        })
    })(i);
}

// Output: 0, 1, 2 ✓

// Fix 2 — IIFE দিয়ে প্রতিটা i capture করো (পুরনো পদ্ধতি)

// Output: 0, 1, 2 ✓



// Real life cases for closure 
//Use case 1 — Data privacy / encapsulation
function createBankAccount(initialBalance){
    let balance = initialBalance;

    return{
        deposit(amount){
            if (amount<=0) throw new Error("Invalid Amount");
            balance += amount;
            console.log(`Deposited ${amount}. Balance ${balance}`);
        },

        withdraw(amount){
            if(amount > balance) throw new Error("Insufficient Balance");
            balance -= amount;
            console.log(`withdrawn ${amount}. New Balance ${balance}`);
        },

        getBalance() {return balance}
    };

}

const account = createBankAccount(5000);
account.deposit(1000);    // Deposited ৳1000. Balance: ৳6000
account.withdraw(2000);   // Withdrawn ৳2000. Balance: ৳4000
console.log(account.getBalance()); // 4000
console.log(account.balance);      // undefined — truly private!

//Use case 2 — Function factory

// same logic just different config 
function createMultiplier(factor){
    return (number) => number * factor;  // factor closure a captured
}

const double = createMultiplier(2);
const tripple = createMultiplier(3);
const tenX = createMultiplier(10);

console.log(double(5));
consol.log(tripple(5));
console.log(tenX(5));

// Button click counter — closure keeps track
function setupClickCounter(buttonId) {
  let clickCount = 0; // private state for this button

  const button = document.getElementById(buttonId);
  button.addEventListener("click", () => {
    // arrow function closes over clickCount
    clickCount++;
    button.textContent = `Clicked ${clickCount} times`;
  });
}

setupClickCounter("btn1"); // btn1 has its own clickCount
setupClickCounter("btn2"); // btn2 has its own clickCount — independent!


// Reate useState (closure under the hood) 

function createState(initialValue){
    let state = initialValue;

    function getState(){
        return state;
    }

    function setState(newValue){
        state = newValue;
        // react trigger re-rander in this case
        console.log("State updated: ", state); 
    }

    return {getState, setState};
}

const [getCount, setCount] = createState(0);
console.log(getCount());
setCount(5);
console.log(getCount());

// React-এ তুমি যখন useState লেখো:
// const [count, setCount] = useState(0);
// এটা internally এইভাবেই কাজ করে — closure দিয়ে!



// --------------- Closure In Loop ------------------
// Problem: Create a button which on click display index 
function createButton(){
    for(let i = 0; i<3; i++){
        document.getElementById(`btn${i}`)
        .addEventListener("click",()=>{
            console.log(`Button Clicked ${i}`);
        })
    }
}

// let প্রতিটা iteration-এ নতুন i তৈরি করে।
// প্রতিটা closure নিজস্ব i ধরে রাখে।

// Note: we must need to use let not var because let create separate variable for each iteration while var just keep updated the same one 
// কেন? var i একটাই। Loop শেষে i=3।
// সব buttons-এর closure একই i দেখে।





// Cons of closures- memory leak and over-use 
function processData() {
  const hugeArray = new Array(1000000).fill("data"); // 1 million items!

  return function() {
    // এই function শুধু hugeArray-এর length দরকার
    // কিন্তু পুরো array টাই closure-এ আটকে আছে!
    return hugeArray.length;
  };
}

const getLength = processData();
// processData() শেষ হয়েছে, কিন্তু hugeArray মুছেনি
// কারণ getLength তার reference ধরে আছে → memory leak!


// Fix ------------------- 
function processData() {
  const hugeArray = new Array(1000000).fill("data");
  const length    = hugeArray.length; // শুধু length নাও

  // hugeArray আর দরকার নেই — close করে দাও
  return function() {
    return length; // শুধু একটা number ধরে আছে — efficient!
  };
}

const getLength = processData();
// এখন শুধু একটা number memory-তে আছে — not 1 million items!