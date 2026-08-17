export const TOPICS = [
  {
    id: 'variables',
    label: 'Variables & Data Types',
    icon: 'box',
    code: `// Variables store information so you can use it later.
let playerName = "Alex";
const maxHealth = 100;
let isReady = true;

console.log(playerName);
console.log(maxHealth);
console.log(isReady);
console.log(typeof playerName);`,
  },
  {
    id: 'operations',
    label: 'Basic Operations',
    icon: 'plus',
    code: `// Arithmetic, comparison, and logical operators.
let score = 10;
let bonus = 5;

console.log(score + bonus);   // arithmetic
console.log(score > bonus);   // comparison
console.log(score > 5 && bonus > 0); // logical AND
console.log(score === 10);    // strict equality`,
  },
  {
    id: 'loops',
    label: 'Loops',
    icon: 'repeat',
    code: `// Loops repeat code so you don't repeat yourself.
for (let i = 1; i <= 5; i++) {
  console.log("Round " + i);
}

let countdown = 3;
while (countdown > 0) {
  console.log(countdown);
  countdown--;
}

const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2);
console.log(doubled);`,
  },
  {
    id: 'conditionals',
    label: 'Conditional Logic',
    icon: 'shuffle',
    code: `// Conditionals let your code make decisions.
let health = 40;

if (health > 70) {
  console.log("You're healthy!");
} else if (health > 30) {
  console.log("Getting low, be careful!");
} else {
  console.log("Danger! Find healing!");
}

const status = health > 30 ? "OK" : "Critical";
console.log(status);`,
  },
];
