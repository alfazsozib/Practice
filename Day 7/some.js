// some() — যেকোনো একটা true হলেই true return করে
// প্রথম true পেলেই বাকিগুলো check করা বন্ধ করে (short-circuit)

// কোনো out-of-stock product আছে?
const hasOutOfStock = products.some(p => !p.inStock);
console.log(hasOutOfStock); // true (Headphones, Watch)

// কোনো 5-star rated product আছে?
const hasPerfectRating = products.some(p => p.rating === 5.0);
console.log(hasPerfectRating); // false

// Cart-এ কোনো Electronics আছে?
const cart = [products[0], products[1], products[5]]; // Laptop, T-Shirt, Sneakers
const hasElectronics = cart.some(p => p.category === "Electronics");
console.log(hasElectronics); // true — Laptop আছে