export const JS_FORMULAS = [
  {
    category: 'Variables & Types',
    items: [
      { syntax: 'let name = "Alex";', note: 'Declares a variable that can change later.' },
      { syntax: 'const maxHealth = 100;', note: 'Declares a variable that cannot be reassigned.' },
      { syntax: 'typeof value', note: 'Returns the data type as a string, e.g. "number".' },
    ],
  },
  {
    category: 'Arithmetic Operators',
    items: [
      { syntax: 'a + b', note: 'Addition' },
      { syntax: 'a - b', note: 'Subtraction' },
      { syntax: 'a * b', note: 'Multiplication' },
      { syntax: 'a / b', note: 'Division' },
      { syntax: 'a % b', note: 'Remainder (modulo)' },
      { syntax: 'a ** b', note: 'Exponent (a to the power of b)' },
    ],
  },
  {
    category: 'Comparison Operators',
    items: [
      { syntax: 'a === b', note: 'Strictly equal (value and type)' },
      { syntax: 'a !== b', note: 'Strictly not equal' },
      { syntax: 'a > b / a < b', note: 'Greater than / less than' },
      { syntax: 'a >= b / a <= b', note: 'Greater or equal / less or equal' },
    ],
  },
  {
    category: 'Logical Operators',
    items: [
      { syntax: 'a && b', note: 'AND — true only if both are true' },
      { syntax: 'a || b', note: 'OR — true if either is true' },
      { syntax: '!a', note: 'NOT — flips true/false' },
    ],
  },
  {
    category: 'Conditionals',
    items: [
      { syntax: 'if (condition) { ... } else { ... }', note: 'Runs code based on a true/false test.' },
      { syntax: 'condition ? valueIfTrue : valueIfFalse', note: 'Ternary operator — a compact if/else.' },
    ],
  },
  {
    category: 'Loops',
    items: [
      { syntax: 'for (let i = 0; i < n; i++) { ... }', note: 'Repeats code a set number of times.' },
      { syntax: 'while (condition) { ... }', note: 'Repeats code while a condition stays true.' },
      { syntax: 'array.forEach((item) => { ... })', note: 'Runs code once for every item in an array.' },
    ],
  },
  {
    category: 'Functions',
    items: [
      { syntax: 'function greet(name) { return "Hi " + name; }', note: 'A named, reusable block of code.' },
      { syntax: 'const greet = (name) => "Hi " + name;', note: 'Arrow function — a shorter way to write functions.' },
    ],
  },
  {
    category: 'Arrays',
    items: [
      { syntax: 'array.map((item) => item * 2)', note: 'Builds a new array by transforming each item.' },
      { syntax: 'array.filter((item) => item > 5)', note: 'Builds a new array keeping only matching items.' },
      { syntax: 'array.reduce((total, item) => total + item, 0)', note: 'Combines all items into one value.' },
      { syntax: 'array.length', note: 'Number of items in the array.' },
    ],
  },
  {
    category: 'Strings',
    items: [
      { syntax: '`Score: ${score}`', note: 'Template literal — embeds variables inside text.' },
      { syntax: 'str.toUpperCase() / str.toLowerCase()', note: 'Changes text casing.' },
      { syntax: 'str.length', note: 'Number of characters in the string.' },
    ],
  },
];
