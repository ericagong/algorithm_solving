// https://www.acmicpc.net/problem/3273

// 1차 풀이: 완전 탐색
// const fs = require("fs");
// const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

// const n = Number(inputs.shift());
// const nums = inputs.shift().split(" ").map(Number);
// const x = Number(inputs.shift());

// let cnt = 0;
// for (let si = 0; si < nums.length - 1; si++) {
//   for (let ei = si + 1; ei < nums.length; ei++) {
//     if (nums[si] + nums[ei] === x) cnt += 1;
//   }
// }

// console.log(cnt);

// 2차 풀이: 투 포인터
const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const n = Number(inputs.shift());
const nums = inputs.shift().split(" ").map(Number);
const x = Number(inputs.shift());

nums.sort((a, b) => a - b); // 숫자 오름차순 정렬

let si = 0;
let ei = n - 1;
let cnt = 0;
while (true) {
  while (ei > si && nums[si] + nums[ei] >= x) {
    if (nums[si] + nums[ei] === x) cnt += 1;
    ei -= 1;
  }
  si += 1;
  if (si >= ei) break; // 서로 다른 두 개의 정수를 고르는 조합임
}

console.log(cnt);
