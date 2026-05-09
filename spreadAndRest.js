const fruit = ['mango', 'orange', 'apple'];
const veggies = ["carrot", "tomtto"];

const foodie = [...fruit, ...veggies]
console.log(foodie)

// copy without reference issues 
const original = [1,2,3,4];
const copy = [...original];
copy.push(5);
console.log(copy)
// console.log(original) untouched array/original as it was 


// spread with objects 
const defaults = {theme: "dark", lang:"Eng"};
const userPrefs = {lang: "bn", fontSize:"Bng"};

const settings = {...defaults, ...userPrefs};
// console.log(settings)
// userPrefs override userPrefs.lang with defaults.lng 



// Rest Operator //
// Same three dots but in function parameters. It collects all remaining arguments into an array 

function sum(...numbers){
    return numbers.reduce((total,n)=>total + n, 0)
}

// console.log(sum(3,4,6,67,789,34))


// First named, rest collected 
function introduce(firstName, lastName, ...hobbies) {
  console.log(`${firstName} ${lastName}`);
  console.log("Hobbies:", hobbies);
}
// introduce("Rahim", "Chowdhury", "coding", "gaming", "chess");

const {a=10, b=20} = {a: 5}
console.log(a,b)