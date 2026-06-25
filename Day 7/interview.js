// নতুন transformed array চাই        → map()
// কিছু elements বাদ দিতে চাই         → filter()
// একটা value বের করতে চাই            → reduce()
// প্রথম matching element চাই         → find()
// matching element-এর index চাই      → findIndex()
// কোনো একটা condition পূরণ করে?     → some()
// সবগুলো condition পূরণ করে?        → every()
// nested array flat করতে চাই        → flat() / flatMap()
// side effect করতে চাই (no return)  → forEach()
// sort করতে চাই                     → sort() (copy আগে!)

// Interview golden answers:
// Q: "map() কি original array change করে?"
// A: না। map() একটা new array return করে। original unchanged।

// Q: "filter() এবং find()-এর পার্থক্য?"
// A: filter() সব matching elements-এর array return করে।
//    find() শুধু প্রথম matching element return করে (array নয়)।

// Q: "reduce()-এ initial value কেন দেওয়া উচিত?"
// A: Initial value না দিলে empty array-এ TypeError হয়।
//    Initial value accumulator-এর type নির্ধারণ করে।


// TASK 1 — map():
// সব products-এর জন্য একটা "summary string" তৈরি করো
// Format: "Laptop (Electronics) - ৳75,000 ⭐4.5"

// TASK 2 — filter():
// দুটো আলাদা filter করো:
// a) Rating 4.5 বা তার বেশি এমন in-stock products
// b) Price 5000-এর নিচে এবং in-stock products

// TASK 3 — reduce():
// a) সব in-stock products-এর মোট reviews count
// b) Category অনুযায়ী average price বের করো
//    { Electronics: 41833, Clothing: 1500, ... }

// TASK 4 — chaining:
// E-commerce sort/filter pipeline:
// → in-stock products
// → rating 4.0-এর উপরে
// → price ascending sort
// → শুধু name, price, rating রাখো

// TASK 5 — সবচেয়ে কঠিন:
// reduce() দিয়ে নিজে map() implement করো
// function myMap(array, transformFn) { ... }
// Test: myMap([1,2,3], n => n * 2) // [2,4,6]