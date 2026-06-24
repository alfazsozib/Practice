// reduce() হলো array methods-এর মধ্যে সবচেয়ে powerful — কিন্তু beginners-এর কাছে সবচেয়ে confusing। Concept টা হলো: array-কে একটাই value-তে "reduce" করো। সেই value যেকোনো কিছু হতে পারে — number, string, object, এমনকি আরেকটা array।
// Concept first — accumulator

// reduce() একটা "accumulator" নিয়ে চলে। প্রতিটা element-এ accumulator update হয়। শেষে final accumulator return হয়। ভাবো একটা running total যেখানে প্রতিটা step-এ নতুন value যোগ হচ্ছে।
const products = [
  { id: 1, name: "Laptop",    price: 75000, category: "Electronics", inStock: true,  rating: 4.5, reviews: 120 },
  { id: 2, name: "T-Shirt",   price: 800,   category: "Clothing",    inStock: true,  rating: 4.2, reviews: 85  },
  { id: 3, name: "Headphones",price: 5500,  category: "Electronics", inStock: false, rating: 4.8, reviews: 200 },
  { id: 4, name: "Jeans",     price: 2200,  category: "Clothing",    inStock: true,  rating: 3.9, reviews: 45  },
  { id: 5, name: "Tablet",    price: 45000, category: "Electronics", inStock: true,  rating: 4.3, reviews: 95  },
  { id: 6, name: "Sneakers",  price: 4500,  category: "Footwear",    inStock: true,  rating: 4.7, reviews: 160 },
  { id: 7, name: "Watch",     price: 12000, category: "Accessories", inStock: false, rating: 4.1, reviews: 70  },
  { id: 8, name: "Backpack",  price: 3500,  category: "Accessories", inStock: true,  rating: 4.6, reviews: 110 },
];

// sytax 
Array.reduce((accumulator, currentElem, index, array)=>{
    return updatedAccumulator;
}, initialValue);

// সবচেয়ে সহজ — সংখ্যার যোগফল
const nums = [1, 2, 3, 4, 5];

const sum = nums.reduce((acc, curr) => acc + curr, 0);
// Step 1: acc=0, curr=1 → return 1
// Step 2: acc=1, curr=2 → return 3
// Step 3: acc=3, curr=3 → return 6
// Step 4: acc=6, curr=4 → return 10
// Step 5: acc=10,curr=5 → return 15
console.log(sum); // 15

// find out the product with max price 
const totalPrice = products.reduce((acc, curr) => {
    return curr.price > acc.price ? curr : acc;
});
console.log(totalPrice)

// 3. Category অনুযায়ী group করো (খুবই common interview question)
const byCategory = products.reduce((groups, product) => {
  const cat = product.category;
  // এই category-র group না থাকলে তৈরি করো
  if (!groups[cat]) groups[cat] = [];
  groups[cat].push(product);
  return groups;
}, {}); // initial value = empty object

console.log(Object.keys(byCategory));
// ["Electronics", "Clothing", "Footwear", "Accessories"]
console.log(byCategory["Electronics"].length); // 3

// 4. Statistics একসাথে বের করো
const stats = products.reduce((acc, p) => ({
  totalRevenue:   acc.totalRevenue + p.price,
  avgRating:      acc.avgRating + p.rating / products.length,
  inStockCount:   acc.inStockCount + (p.inStock ? 1 : 0),
  totalReviews:   acc.totalReviews + p.reviews
}), { totalRevenue: 0, avgRating: 0, inStockCount: 0, totalReviews: 0 });

console.log(stats);
// { totalRevenue:148500, avgRating:4.39, inStockCount:6, totalReviews:885 }


// implement map filter using reduce 
// map() with reduce 
const myMap = (arr, fn) => arr.reduce((acc, item)=>{
    acc.push(fn(item));
    return acc;
},[]);

 // filter() with reduce:
const myFilter = (arr, fn) => arr.reduce((acc, item) => {
  if (fn(item)) acc.push(item);
  return acc;
}, []);

// Test:
const prices = myMap(products, p => p.price);       // [75000, 800, ...]
const cheap  = myFilter(products, p => p.price < 5000); // affordable ones