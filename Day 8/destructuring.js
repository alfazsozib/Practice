// Destructuring is one of the useful feature in js. By using it we can directly fetch values from arrays or objects and store them in variables 

const user = {
    name: "Rahim",
    age: 24,
    city: "Rajshahi"
}

// old ways
const name = user.name
// Destructuring 
const {name, age, city} = user;
console.log(name, age, city)
// If we want to rename 
const {name: userName, age: userAge} = user;
// Default value - property na thakle fallback 
const {name, salary = 5000, role = 'Junior'} = user;
// Rename + Default at onece 
const {city: location = "Unknown"} = user;