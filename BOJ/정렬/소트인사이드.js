// https://www.acmicpc.net/problem/1427

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const str = inputs.shift();
const cnts = Array.from({ length: 10 }).fill(0);

for (let digit of str) {
  cnts[Number(digit)] += 1;
}

let answer = "";
for (let i = cnts.length - 1; i >= 0; i--) {
  answer += String(i).repeat(cnts[i]);
}

console.log(answer);
