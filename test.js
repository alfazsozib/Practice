

// Arrow function — inherits 'this' from where it was WRITTEN
const timer = {
  name: "MyTimer",
  start: function() {
    setTimeout(() => {
      console.log(this.name); // "MyTimer" ✓
      // arrow function has no own 'this' — uses start()'s 'this'
      // start() was called on timer, so this = timer
    }, 1000);
  }
};


timer.start()