// https://www.acmicpc.net/problem/13458

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const N = Number(inputs.shift());
const nums = inputs.shift().split(" ").map(Number);
const [B, C] = inputs.shift().split(" ").map(Number);

let answer = N;
let rest = nums.map((num) => {
  if (num <= B) return 0;
  else return num - B;
});

rest.forEach((num) => {
  answer += Math.ceil(num / C);
});

console.log(answer);
