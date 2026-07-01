const product = {
    name: "Laptop",
    price : 7500
}

// to return array of property names 
const keys = Object.keys(product);
// to return array of property values 
const values = Object.values(product);
// return key and value [key, value] key-pairs
const entries = Object.entries(product);
// Object loop করো — forEach দিয়ে
Object.entries(product).forEach(([key, value]) => {
//   console.log(`${key}: ${value}`);
});
// Object filter করো — entries + filter + fromEntries

const onlyString = Object.fromEntries(
Object.entries(product).filter(([_, value]) => typeof value === "string"));

// Count properties
console.log(Object.keys(product).length); // 5


// Object.assign() — merge করা -----------------
// Object.assign(target, source1, source2, ...)
// source-গুলো target-এ copy হয়, target mutate হয়
const target  = { a: 1, b: 2 };
const source1 = { b: 3, c: 4 }; // b override করবে
const source2 = { d: 5 };

Object.assign(target, source1, source2);
console.log(target); // { a:1, b:3, c:4, d:5 }

// Shallow copy (target = নতুন empty object)
const copy = Object.assign({}, product);
console.log(copy);

// Object.freeze() — immutable object  -------------------
// freeze() — object-এর properties আর change করা যাবে না
const CONFIG = Object.freeze({
  API_URL:  "https://api.myapp.com",
  MAX_RETRIES: 3,
  TIMEOUT:  5000
});

CONFIG.API_URL = "changed"; // silently fails (or error in strict mode)
CONFIG.newProp = "new";     // silently fails
delete CONFIG.TIMEOUT;      // silently fails

// Shallow freeze — nested objects freeze হয় না!
const state = Object.freeze({
  user: { name: "Rahim" } // nested object NOT frozen
});
state.user.name = "Karim"; // works! — nested not frozen
console.log(state.user.name); // "Karim"


// Object.fromEntries() — entries থেকে object তৈরি -----------------
// entries() এর reverse — [key,value] array → object
const entries = [["name","Rahim"],["age",24],["city","Dhaka"]];
const obj = Object.fromEntries(entries);
// { name:"Rahim", age:24, city:"Dhaka" }


// Real use — URL search params process করা
const params = new URLSearchParams("name=Rahim&age=24&city=Dhaka");
const paramsObj = Object.fromEntries(params);
// { name:"Rahim", age:"24", city:"Dhaka" }

// Map → object
const map = new Map([["a", 1], ["b", 2], ["c", 3]]);
const fromMap = Object.fromEntries(map);
// { a:1, b:2, c:3 }

// Object transform — values double করো
const prices = { laptop: 75000, phone: 25000, tablet: 45000 };

const dis = Object.fromEntries(
    
    Object.entries(prices).map(([key, val]) => [key, val * 0.9])

);

console.log(dis);