const user = {
    name: "Alfaz",
    age: 20,
    city: "Rajshahi"
}

// Es6 Destructering 
const {name, age, city, salary=300} = user

// Rename while destructering. [here the name property will rename as userName so we can print the name by console log of userName]
const { name: userName} = user
console.log(userName)

// Default value if property is missing [in the object there is no salary value but we can use a default value like the way below]
// const {name, age, city, salary=300} = user
// console.log(salary)