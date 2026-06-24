// every() — সবগুলো true হলেই true return করে
// প্রথম false পেলেই বাকিগুলো check করা বন্ধ করে

// সব products কি in stock?
const allInStock = products.every(p => p.inStock);
console.log(allInStock); // false — Headphones এবং Watch out of stock

// Cart validate করো — সব items কি in stock?
const cart = [products[0], products[1], products[5]]; // Laptop, T-Shirt, Sneakers
const canCheckout = cart.every(p => p.inStock);
console.log(canCheckout); // true — proceed to payment!

// সব products কি rating 3.5-এর উপরে?
const allQuality = products.every(p => p.rating >= 3.5);
console.log(allQuality); // true

// Form validation — real React use case
const formFields = [
  { name: "email",    value: "rahim@gmail.com", valid: true },
  { name: "password", value: "123456",           valid: true },
  { name: "phone",    value: "",                 valid: false }
];
const isFormValid = formFields.every(field => field.valid);
console.log(isFormValid); // false — phone invalid
// Submit button: <button disabled={!isFormValid}>Submit</button>