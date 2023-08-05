// Solution1) Map으로 등장횟수 카운트해서 풀이
// 시간복잡도: O(N + N + N) 최악의 경우, 150만으로 가능
// const fs = require("fs");
// const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

// const N = Number(inputs.shift());
// const cards = inputs.shift().split(" ").map(Number);
// const M = Number(inputs.shift());
// const nums = inputs.shift().split(" ").map(Number);

// const cnts = new Map();
// cards.forEach((card) => {
//   cnts.set(card, cnts.get(card) + 1 || 1);
// });

// const arr = [];
// nums.forEach((num) => {
//   if (cnts.has(num)) arr.push(cnts.get(num));
//   else arr.push(0);
// });

// console.log(arr.join(" "));

// TODO solution2 이진 탐색으로 다시 풀기
// 시간복잡도: O(NlogN + 2MlogN) 최악의 경우, 100만 + 100만 = 200만으로 가능
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const N = Number(inputs.shift());
const cards = inputs.shift().split(" ").map(Number);
const M = Number(inputs.shift());
const nums = inputs.shift().split(" ").map(Number);

function lowerBound(arr, val, s, e) {
  while (s < e) {
    const m = parseInt((s + e) / 2);
    if (arr[m] >= val) e = m;
    else s = m + 1;
  }
  // console.log(`lowerBound: ${e}`)
  return e;
}

function upperBound(arr, val, s, e) {
  while (s < e) {
    const m = parseInt((s + e) / 2);
    if (arr[m] > val) e = m;
    else s = m + 1;
  }
  // console.log(`upperBound: ${e}`)
  return e;
}

function countByRange(arr, leftVal, rightVal) {
  const leftIdx = lowerBound(arr, leftVal, 0, arr.length);
  const rightIdx = upperBound(arr, rightVal, 0, arr.length);
  return rightIdx - leftIdx;
}

// 정렬 함수 필수
cards.sort((a, b) => a - b);

const counts = [];
nums.forEach((num) => {
  counts.push(countByRange(cards, num, num));
});

console.log(counts.join(" "));
