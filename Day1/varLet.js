// using var 

// for (var i=0; i<3; i++){
//     console.log(i)
//     setTimeout(()=>{
//         console.log(i);
//     },1000)
// }


// using let and const  
function orderProcessing(){
    const status = "pending";   // exists only in this function
    if(true){
        let discount = 10;   // exists only inside this if block
        const TAX = 0.45;    // exists only inside this if block
        console.log(discount, TAX);   // works fine here
    }
    console.log(status); // pending works because of function scope
    console.log(discount) // will get reference error because its block scoped
}


// orderProcessing()



// //  const- not truely "immutable", just non-reassignable 
// const age = 24;
// age = 25; // will get typeError -> Assignment to constant variable X

// // But, if const holds an object the object's content can change  
// const user = {name: "Alfaz", age: 24};
// user.age = 25;  // works fine! bject itself is mutable
// user = {name: "X"} // TypeError - you can't reassign user itself 

// // Same with arrays:
// const colors = ["red", "blue"];
// colors.push("green"); // works — array contents are mutable
// colors = [];           // TypeError — can't reassign the variable


// // To make an object truly immutable, use Object.freeze() 
// const config = Object.freeze({api:"xxxxxxxxxxxxxx"});
// config.api = "change"  // silently failed or error if we are in strict mode 

// console.log(config.api) // still the output is xxxxxxxxxxxxxxx.



// ----------------- Temporal Deadzon --------------------- 

// var hositing -> hoisted + initialized to undefined (usable)
// let hoisting -> hoisted + NOT initialized (TDZ - unusable)
// const hoisting -> hoisted + NOT initialized (TDZ - unusable)

// console.log(a); // undefined  (var — hoisted + initialized)
// console.log(b); // ReferenceError: Cannot access 'b' before initialization
// console.log(c); // ReferenceError: Cannot access 'c' before initialization

// var a = 1;
// let b = 2;
// const c = 3;

// The TDZ for 'b' and 'c' starts at the TOP of their scope
// and ends exactly at their declaration line.

// Real-world TDZ trap — inside a function

function getDiscount(isPrime){
    // TDZ for discount starts here 

    if(isPrime){
        console.log(discount);
        let discount = 20;
        return discount
    }

    return 0;
}

getDiscount(true);