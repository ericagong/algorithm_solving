// https://www.acmicpc.net/problem/2606

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const N = Number(inputs.shift());
const M = Number(inputs.shift());
const g = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < M; i++) {
  const [com1, com2] = inputs.shift().split(" ").map(Number);
  g[com1].push(com2);
  g[com2].push(com1);
}

const v = new Array(N + 1).fill(false);
let cnt = 0;
function dfs(com) {
  v[com] = true;
  cnt += 1;

  for (let curr of g[com]) {
    if (v[curr]) continue;
    else dfs(curr);
  }
}

dfs(1);
console.log(cnt - 1);
