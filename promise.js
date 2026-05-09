// Why do we need promise
// = Javascript runs one line at a time (single threaded). When you fetched data from a server it takes time, you don't want your whole app to freeze and wait. Promises say: I'll give you the result later. Keep running other code until it's ready.

// Pending -> waiting for result
// Fulfilled -> success, has a value
// Rejected -> failed, has an error

// Promises constructor accept one callback function and this callback functiuon accept 2 parameter 1. Resolve 2. Reject javascript resturn these by its own.
// we call resolve when a promise success
// we call reject when a promise cancelled

// create a promise
const myPromise = new Promise((resolve, reject) => {
  const success = true; // simulate success/fail we just hard coded the success is true so that we can test further.
  if (success) {
    resolve("Data loaded!"); // fullfiled
  } else {
    reject("Something went wrong"); // rejected
  }
});


// the promise gonna give back the result later that's why we use then to get the result later
// and we use catch to catch the errors if the promise failed
// consume the promise with then  //
// .then() return another promise thats why chaining is possible


myPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(err);
  })
  .finally(()=>{
    console.log("Always runs - success or fail")
  })


// real life example 
fetch("https://jsonplaceholder.typicode.com/users/1")
.then(response => response.json())
.then(user => {
    console.log(user.name);
    console.log(user.email);
})
.catch(error => {
    console.log("Failed to load user:", error);
})







/////////////////////// Modern way of promise

// Async Await ///////
// Await waits till the promise resolve 
// and we need asynce because await only works inside an Async 
// Async Wait is just a cleaner version of Promise 

// Promise creation is Synchronous (new Promise(...))
// bust resolution handling asynchronous (.then(...)) it goes to microtask queue 

async function safeload(){
    try{
        const data = await riskyOperation();
        return data;
    } catch(err){
        console.error("Failed:", err.message);
        return null;
    }
}


// Load multiple thins at onece Promise.all()
async function loadDashboard(){
    try{
        // Both request run at the same time 
        const [user, posts] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/users/1").then(r => r.json()),
            fetch("https://jsonplaceholder.typicode.com/posts?userId=1").then(r => r.json())
        ])
        console.log("User:", user.name);
        console.log("Posts:", posts.length);
    }catch (err){
        console.log(err.message);
    }
}

loadDashboard();