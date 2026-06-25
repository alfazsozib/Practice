// CAREFUL: sort() original array MUTATE করে — pure নয়!
// সবসময় copy করে sort করো

// String sort (default — alphabetical)
const names = ["Banana", "Apple", "Mango", "Cherry"];
const sorted = [...names].sort(); // copy first!
// ["Apple","Banana","Cherry","Mango"]

// Number sort — comparator function দিতে হবে
const prices = [75000, 800, 5500, 2200, 45000];

// Ascending (কম থেকে বেশি)
const asc  = [...prices].sort((a, b) => a - b);
// [800, 2200, 5500, 45000, 75000]

// Descending (বেশি থেকে কম)
const desc = [...prices].sort((a, b) => b - a);
// [75000, 45000, 5500, 2200, 800]

// Object array sort
const byPrice = [...products].sort((a, b) => a.price - b.price);
const byRating = [...products].sort((a, b) => b.rating - a.rating);
// সবচেয়ে বেশি rated first


