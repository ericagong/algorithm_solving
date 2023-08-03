// Solution1) Map으로 등장횟수 카운트해서 풀이
// 시간복잡도: O(N + N + N) 최악의 경우, 150만으로 가능
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const N = Number(inputs.shift());
const cards = inputs.shift().split(" ").map(Number);
const M = Number(inputs.shift());
const nums = inputs.shift().split(" ").map(Number);

const cnts = new Map();
cards.forEach((card) => {
  cnts.set(card, cnts.get(card) + 1 || 1);
});

const arr = [];
nums.forEach((num) => {
  if (cnts.has(num)) arr.push(cnts.get(num));
  else arr.push(0);
});

console.log(arr.join(" "));

// TODO solution2 이진 탐색으로 다시 풀기
