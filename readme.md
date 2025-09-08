## Answer to Q1

- **var:** values can be changed or declared again. No longer used.
- **let:** values can be changed but cannot declare again in the same scope.
- **const:** values cannot be reassigned (but objects/arrays can have their contents changed).

## Answer to Q2

- **map():** loops through an array and returns a new array with transformed values.
- **forEach():** loops through an array, doesn't return anything.
- **filter():** loops through an array and returns items that pass the condition.
- **Example**

```javascript
const numbers = [1, 2, 3, 4, 5];
// map:
const doubled = numbers.map((num) => num * 2);
console.log(doubled);
// Output: [2, 4, 6, 8, 10]
// forEach:
numbers.forEach((num) => console.log(num * 2));
// Output: 2 4 6 8 10
// filter:
const even = numbers.filter((num) => num % 2 === 0);
console.log(even);
// Output: [2, 4]
```

## Answer to Q3

- **Arrow Functions** are a shorter syntax for writing functions in ES6.
- **Example**

```javascript
// Regular function
function sum(a, b) {
  return a + b;
}
// Arrow function
const sum = (a, b) => a + b;

console.log(sum(2, 3)); // Output: 5
```

## Answer to Q4

- **Destructuring Assignment** allows unpacking values from arrays or objects into separate variables.

```javascript
// Array destructuring
const numbers = [1, 2, 3];
const [a, b] = numbers;
console.log(a, b); // Output: 1 2

// Object destructuring
const person = { name: "Sayhan", age: 25 };
const { name, age } = person;
console.log(name, age); // Output: Sayhan 25
```

## Answer to Q5

- **Template Literals** allow embedding variables and expressions inside strings using backticks.
- **Example**
```javascript
const name = "Sayhan";
const age = 25;
const message = `My name is ${name} and I am ${age} years old.`;
console.log(message);
