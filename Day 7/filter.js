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


// to check if the product in stock or not 
const isStock = products.filter(product => product.inStock);
console.log(isStock);

// to check if there is any Electronics category product 
const electricCat = products.filter(p => p.category=='Electronics');
console.log(electricCat);

// Price range filter
const affordable = products.filter(p => p.price >= 1000 && p.price <= 10000);

// High rating + in stock — multiple conditions
const topPicks = products.filter(p => p.rating >= 4.5 && p.inStock);

// React search box:
// const results = products.filter(p =>
//   p.name.toLowerCase().includes(query.toLowerCase())
// );


// map() এবং filter()-এর callback function-এ তিনটা argument পাওয়া যায়: (element, index, array)। বেশিরভাগ সময় শুধু element দরকার — কিন্তু index দরকার হলে দ্বিতীয় argument নাও।
