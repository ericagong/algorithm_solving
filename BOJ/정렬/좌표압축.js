// https://www.acmicpc.net/problem/18870

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const N = Number(inputs.shift());
const Xs = inputs.shift().split(" ").map(Number);

const unique = [...new Set(Xs)];
unique.sort((a, b) => a - b);

const counts = new Map();
for (let i = 0; i < unique.length; i++) {
  counts.set(unique[i], i);
}

let answer = "";
for (x of Xs) {
  answer += counts.get(x) + " ";
}
console.log(answer);
