// https://www.acmicpc.net/problem/14501

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const N = Number(inputs.shift());
const ts = [];
const ps = [];
for (let i = 0; i < N; i++) {
  const [t, p] = inputs.shift().split(" ").map(Number);
  ts.push(t - 1);
  ps.push(p);
}

let maxRev = -Infinity;
function dfs(level, wait, sum) {
  if (level === N) {
    maxRev = Math.max(maxRev, sum);
    return;
  }

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      // 선택 X
      const wt = wait - 1 < 0 ? 0 : wait - 1;
      dfs(level + 1, wt, sum);
    } else {
      // 선택 O
      if (wait !== 0) return;
      const wt = ts[level];
      if (level + wt >= N) return;
      else dfs(level + 1, wt, sum + ps[level]);
    }
  }
}

dfs(0, 0, 0);
console.log(maxRev);
