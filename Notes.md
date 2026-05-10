1. How javascript stores variables in memory?
   => Js has two phase when it runs any script: a create phase and an execution phase. This is the root of hoisting and the TDZ.
   Phase-1: JS Scans the entire file first. It finds all variables and functions declarations and sets them up in memory before executing a single line. This is called hoisting.
   Phase-2: Only after the createion phase does JS run our code top to bottom. But by then, variable already exists in memory. just not necessarily with their values yet.

2. This is a common interview trap: "Why does changing b also change a?" — because both variables point to the same object in heap memory. Primitives don't have this issue.

3. var was the only way to declare a variable before ES6. Var is function Scoped not Block Scoped
4. let and const are block-scoped, cannot be re declared, and have a completely different hoisting behaviour -- The temporal Deadzone
5. The Temporal Deadzone. let and const are hoisted just like var. But unlike var, they are not initialized with undefined. Instead, they sit in a special state called the Temporal Deadzone from the start of their scope until their declaration line is reached.
