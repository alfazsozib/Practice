// flat() — nested arrays-কে একটা array-এ নামিয়ে আনে
const nested = [1, [2, 3], [4, [5, 6]]];

nested.flat();    // [1, 2, 3, 4, [5, 6]] — 1 level flat
nested.flat(2);   // [1, 2, 3, 4, 5, 6]  — 2 levels flat
nested.flat(Infinity); // সব levels flat — যতই nested হোক

// Real use case — categories with products
const categories = [
  { name: "Electronics", products: ["Laptop", "Tablet"] },
  { name: "Clothing",    products: ["T-Shirt", "Jeans"]  },
];

const allProducts = categories.map(c => c.products).flat();
// [["Laptop","Tablet"], ["T-Shirt","Jeans"]].flat()
// ["Laptop", "Tablet", "T-Shirt", "Jeans"]

// flatMap() = map() করো তারপর 1 level flat করো
// map().flat() থেকে বেশি efficient

const sentences = ["Hello world", "JS is awesome", "Learn every day"];

// প্রতিটা sentence-এর words বের করো — flat array
const words = sentences.flatMap(sentence => sentence.split(" "));
// ["Hello","world","JS","is","awesome","Learn","every","day"]

// vs map + flat:
const words2 = sentences.map(s => s.split(" ")).flat(); // same result

// Real use: tags from products
const productTags = [
  { name: "Laptop",   tags: ["electronics", "computer", "work"] },
  { name: "T-Shirt",  tags: ["clothing", "casual"]              },
  { name: "Sneakers", tags: ["footwear", "sport", "casual"]     },
];
const allTags   = productTags.flatMap(p => p.tags);
const uniqueTags = [...new Set(allTags)]; // duplicate বাদ দাও
// ["electronics","computer","work","clothing","casual","footwear","sport"]

