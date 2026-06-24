// E-commerce products dataset — real-world scenario
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


// সব product-এর name বের করো
const names = products.map(product => product.name);
// ["Laptop","T-Shirt","Headphones","Jeans","Tablet","Sneakers","Watch","Backpack"]

// সব price-এ 10% discount apply করো
const discounted = products.map(product => ({
  ...product,
  price:           Math.round(product.price * 0.9),
  originalPrice:   product.price,
  discountApplied: true
}));

// Display-এর জন্য format করো
const displayCards = products.map(product => ({
  id:       product.id,
  title:    product.name.toUpperCase(),
  price:    `৳${product.price.toLocaleString()}`,
  badge:    product.inStock ? "In Stock" : "Out of Stock",
  stars:    "⭐".repeat(Math.round(product.rating))
}));

console.log(displayCards[0]);
// { id:1, title:"LAPTOP", price:"৳75,000", badge:"In Stock", stars:"⭐⭐⭐⭐⭐" }

// React-এ map() — render list
// products.map(p => <ProductCard key={p.id} product={p} />)
// এভাবেই React-এ array থেকে UI তৈরি হয়