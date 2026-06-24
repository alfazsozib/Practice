// find() — condition match করা প্রথম element return করে
// না পেলে undefined return করে

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

const laptop = products.find(p => p.id === 1);
console.log(laptop)
// সবচেয়ে কম দামে in-stock Electronics
const cheapElectronics = products.find(
  p => p.category === "Electronics" && p.inStock
);
console.log(cheapElectronics.name); // "Laptop" (প্রথম match)

// না পেলে undefined — handle করো
const missing = products.find(p => p.id === 999);
console.log(missing);        // undefined
console.log(missing?.name);  // undefined — optional chaining (safe)


// --------------------- findIndex() ---------------------------- 

// findIndex() — same কিন্তু element-এর বদলে index return করে
// না পেলে -1 return করে

const laptopIndex = products.findIndex(p => p.id === 1);
console.log(laptopIndex); // 0

// কখন দরকার? Array update করতে হলে (React state update)
const updateProduct = (products, id, updates) => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return products; // না পেলে unchanged

  return [
    ...products.slice(0, index),
    { ...products[index], ...updates }, // updated product
    ...products.slice(index + 1)
  ];
};

const updated = updateProduct(products, 3, { inStock: true });
console.log(updated.find(p => p.id === 3).inStock); // true ✓
// Original products array unchanged!