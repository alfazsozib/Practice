function Animal(name){
    this.name = name
}

Animal.prototype.eat = function(){
    console.log(`${this.name} is eating`)
};

function Dog(name, breed) {
  Animal.call(this, name); // Animal-এর constructor call
  this.breed = breed;
}

// Dog er prototype = Animal er instance
// etai prototype-based inheritance

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // constructor ঠিক করা


Dog.prototype.bark = function() {
  console.log(`${this.name} says Woof!`);
};

const buddy = new Dog("Buddy", "Labrador");
buddy.bark(); // "Buddy says Woof!" — Dog.prototype থেকে
buddy.eat();  // "Buddy is eating" — Animal.prototype থেকে
buddy.toString(); // "[object Object]" — Object.prototype থেকে

// hasOwnProperty — নিজের property কিনা check করো
console.log(buddy.hasOwnProperty("name"));  // true — নিজের
console.log(buddy.hasOwnProperty("bark"));  // false — prototype-এর




// Property shadowing — prototype-এর উপরে নিজের property ------------

function Vehicle(speed) {
  this.speed = speed;
}
Vehicle.prototype.describe = function() {
  console.log(`Speed: ${this.speed}`);
};

const car = new Vehicle(120);
car.describe(); // "Speed: 120" — prototype method

// car-এ নিজের describe দিলে prototype-এরটা shadow হয়
car.describe = function() {
  console.log(`Car speed: ${this.speed} km/h`);
};

car.describe(); // "Car speed: 120 km/h" — নিজেরটা use হলো
// prototype-এরটা এখনো আছে — শুধু shadowed

delete car.describe; // নিজেরটা মুছে দিলে
car.describe(); // "Speed: 120" — prototype-এরটা আবার কাজ করে

// Syntax: Object.create(prototypeObject)
// Notun object toiri hobe jar __proto__ = prototype
const animal = {
    eat(){console.log(`${this.name} is eating`)},
    sleep(){console.log(`${this.name} is sleeping`)}
};


// dog er prototype = animal

const dog = Object.create(animal);
dog.name = 'Buddy';
dog.breed = "Labrador";
dog.bark = function (){console.log('Woof!')}


dog.eat();   // "Buddy is eating" — animal থেকে inherited ✓
dog.sleep(); // "Buddy is sleeping" — animal থেকে inherited ✓
dog.bark();  // "Woof!" — নিজের method ✓

console.log(dog.__proto__); // true
 


// chain inheritance without constructor function
const personPhoto = {
    greet(){
        console.log(`Hi I'm ${this.name} years old`);
    },

    birthday(){
        this.age ++;
        console.log(`${this.name} is not ${this.age}`)
    }
};

const developerProto = Object.create(personPhoto);
developerProto.code = () =>{
      console.log(`${this.name} is coding in ${this.language}`);
}

// Factory Function 

function createDeveloper(name, age, language) {
  const dev = Object.create(developerProto);
  dev.name     = name;
  dev.age      = age;
  dev.language = language;
  return dev;
}

const rahim = createDeveloper("Rahim", 24, "JavaScript");
rahim.greet();    // "Hi I'm Rahim, 24 years old" — personProto থেকে
rahim.code();     // "Rahim is coding in JavaScript" — developerProto থেকে
rahim.birthday(); // "Rahim is now 25" — personProto থেকে

// Chain: rahim → developerProto → personProto → Object.prototype → null

class BankAccount {
  // Class field — instance variable (no need for this.x in constructor)
  #balance = 0;      // # = private field (ES2022) — বাইরে access নেই
  owner;             // public field

  constructor(owner, initialBalance) {
    this.owner    = owner;
    this.#balance = initialBalance;
  }

  // Instance method — prototype-এ যায়
  deposit(amount) {
    if (amount <= 0) throw new Error("Invalid amount");
    this.#balance += amount;
    return this; // method chaining support
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Insufficient");
    this.#balance -= amount;
    return this;
  }

  // Getter — property-র মতো access করা যায়
  get balance() { return this.#balance; }

  // Static method — instance নয়, class থেকে call
  static createSavings(owner) {
    return new BankAccount(owner, 1000); // bonus 1000
  }

  toString() {
    return `${this.owner}: ৳${this.#balance}`;
  }
}

const acc = new BankAccount("Rahim", 5000);
acc.deposit(1000).withdraw(500); // method chaining
console.log(acc.balance);        // 5500 — getter
console.log(acc.toString());     // "Rahim: ৳5500"

// Private field — বাইরে থেকে access নেই
console.log(acc.#balance); // SyntaxError — truly private!

// Static method — class থেকে call
const savings = BankAccount.createSavings("Karim");
console.log(savings.balance); // 1000


// Class inheriitance 
class Animal {
  constructor(name, sound) {
    this.name  = name;
    this.sound = sound;
  }

  speak() {
    console.log(`${this.name} says ${this.sound}`);
  }

  toString() {
    return `Animal: ${this.name}`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name, "Woof"); // Animal-এর constructor call — MUST be first!
    this.breed = breed;
  }

  // Override parent method
  speak() {
    super.speak();        // parent-এর speak() call
    console.log(`${this.name} wags tail`);
  }

  fetch() {
    console.log(`${this.name} fetches the ball!`);
  }
}

const buddy = new Dog("Buddy", "Labrador");
buddy.speak();
// "Buddy says Woof" — super.speak()
// "Buddy wags tail" — extra behavior
buddy.fetch(); // "Buddy fetches the ball!"

// instanceof — prototype chain check করে
console.log(buddy instanceof Dog);    // true
console.log(buddy instanceof Animal); // true — chain-এ আছে
console.log(buddy instanceof Array);  // false

function Vehicle(speed, fuel) {
    this.speed = speed;
    this.fuel = fuel
}

function Car(speed, fuel, brand){
    Vehicle.call(this, speed, fuel );
    this.brand = brand;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.honk = function () {
  console.log(`${this.brand} says Beep Beep!`);
};

const myCar = new Car(180, "Petrol", "Toyota");

myCar.honk();
myCar.describe();