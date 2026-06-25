// forEach() — loop করে, কিছু return করে না (undefined)
// Side effects-এর জন্য use করো (logging, DOM update, etc.)

products.forEach(product => {
  console.log(`${product.name}: ৳${product.price}`);
});

// forEach কখন, map কখন?
// map()     → value দরকার (নতুন array)
// forEach() → side effect দরকার (log, DOM update, API call)

// forEach দিয়ে DOM update:
products.forEach(product => {
  const li = document.createElement("li");
  li.textContent = product.name;
  document.getElementById("list").appendChild(li);
});

// MISTAKE — forEach-এর return value use করা
const result = products.forEach(p => p.name); // undefined!
// forEach nothing return করে — map use করো

// Chain করো — একলাইনে complex query
// "In-stock Electronics, price descending, name ও price দেখাও"

const result = products
  .filter(p => p.category === "Electronics" && p.inStock)
  .sort((a, b) => b.price - a.price)
  .map(p => ({ name: p.name, price: `৳${p.price.toLocaleString()}` }));

console.log(result);
// [
//   { name: "Laptop",  price: "৳75,000" },
//   { name: "Tablet",  price: "৳45,000" },
// ]

// Real React component — full pipeline:
const ProductList = ({ products, searchQuery, maxPrice, sortBy }) => {
  const displayed = products
    .filter(p => p.inStock)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(p => p.price <= maxPrice)
    .sort((a, b) => sortBy === "price"
      ? a.price - b.price
      : b.rating - a.rating
    )
    .map(p => ({ ...p, displayPrice: `৳${p.price.toLocaleString()}` }));

  return displayed; // এটাই render হবে
};