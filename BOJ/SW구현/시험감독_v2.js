const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const N = Number(inputs.shift());
const people = inputs.shift().split(" ").map(Number);
const [B, C] = inputs.shift().split(" ").map(Number);

const rest = people.map((num) => {
  if (num <= B) return 0;
  return num - B;
});
const result = rest.reduce((acc, curr) => {
  return acc + Math.ceil(curr / C);
}, N);

console.log(result);
