const defaults ={theme: "light", lang:"en", fontSize: 14};
const userPrefs = {lang: "bn", fontSize: 16};

// merge porer ta ager ta ke override kore 
const settings = {...defaults, ...userPrefs};
// output: { theme: 'light', lang: 'bn', fontSize: 16 }


// shallow copy - reference without problem just ekta copy kore but original a kono change hoy na
const original = {name: "Rahim", age: 25};
const copy = {... original};
copy.name = "Alfaz";
 // Output:  "Rahim" — unchanged ✓

// Add property to the copy
const updateUser = {...original, age: 26, city: "Dhaka"};
 // Output: { name: 'Rahim', age: 26, city: 'Dhaka' }


// React state update - immutable pattern (critical)
const [user, setUser] = useState({name: "Rahim", age: 24, city: "Dhaka"});

// Wrong - here we are doing mutate directly.
user.age = 25; // this way react not gonna re-render

// Correct way is to create a new object using spread operator
setUser({...user, age: 25}); // new object -> react re render


// nested update
const [profile, setProfile] = useState({
    name: "Alfaz",
    address: {city: "Rajshahi", zip: 6204}
});

// nested property update - spread twice
setProfile({
    ...profile,
    address: {...profile.address, city: "Dhaka"}
})


// Array spread — combine, copy, insert

const fruits = ["mango", "banana"];
const veggies = ["carrot", "potato"];

// Combine arrays
const food = [...fruits, ...veggies];
// ["mango","banana","carrot","potato"]

// Copy without reference
const original = [1, 2, 3];
const copy = [...original]; // true copy
copy.push(4);
console.log(original); // [1, 2, 3] — unchanged

// Insert in the middle
const withExtra = [...fruits, "jackfruit", ...veggies];
// ["mango","banana","jackfruit","carrot","potato"]

// Array to function arguments
const nums = [3, 1, 4, 1, 5, 9];
console.log(Math.max(...nums)); // 9
console.log(Math.min(...nums)); // 1

// React — add item to array state (immutable)
const [items, setItems] = useState(["item1", "item2"]);
setItems([...items, "item3"]);        // add at end
setItems(["item0", ...items]);        // add at start
setItems(items.filter(i => i !== "item1")); // remove item


// Shallow vs deep copy — important gotcha
// Spread শুধু SHALLOW copy করে
const user = {
  name: "Rahim",
  address: { city: "Dhaka" } // nested object
};

const copy = { ...user };
copy.name = "Karim";          // primitive — OK, original unchanged
copy.address.city = "CTG";    // nested object — SAME reference!

console.log(user.name);         // "Rahim" — unchanged ✓
console.log(user.address.city); // "CTG" — changed! ✗
// address object টা copy হয়নি — same reference!

// Deep copy করতে:
// Option 1 — structuredClone (modern, recommended)
const deepCopy = structuredClone(user);

// Option 2 — JSON (functions, undefined, Date হারায়)
const deepCopy2 = JSON.parse(JSON.stringify(user));

// Option 3 — manually spread nested
const deepCopy3 = { ...user, address: { ...user.address } };