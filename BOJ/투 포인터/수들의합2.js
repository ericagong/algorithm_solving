// https://www.acmicpc.net/problem/2003

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = inputs.shift().split(" ").map(Number);
const nums = inputs.shift().split(" ").map(Number);

let ei = 0;
let selectedSum = 0;
let cnt = 0;
for (let si = 0; si < N; si++) {
  while (selectedSum < M && ei < N) {
    selectedSum += nums[ei];
    ei += 1;
  }
  if (selectedSum === M) cnt += 1;
  selectedSum -= nums[si];
}

console.log(cnt);
