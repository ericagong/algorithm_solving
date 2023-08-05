// https://www.acmicpc.net/problem/2512

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const N = Number(inputs.shift());
const budgets = inputs.shift().split(" ").map(Number);
const M = Number(inputs.shift());

const maxB = Math.max(...budgets);
const requiredB = budgets.reduce((acc, curr) => acc + curr, 0);

if (requiredB <= M) {
  console.log(maxB);
} else {
  binarySearch(0, maxB);
}

function binarySearch(s, e) {
  let upperB = 0;
  while (s <= e) {
    const m = parseInt((s + e) / 2);
    let assignedB = 0;
    for (budget of budgets) {
      assignedB += Math.min(m, budget);
    }

    if (assignedB <= M) {
      upperB = m;
      s = m + 1;
    } else {
      e = m - 1;
    }
  }
  console.log(upperB);
}
