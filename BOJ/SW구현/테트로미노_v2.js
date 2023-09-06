const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = inputs.shift().split(" ").map(Number);
const g = [];
let maxElem = 0;
for (let i = 0; i < N; i++) {
  g[i] = inputs.shift().split(" ").map(Number);
  maxElem = Math.max(...g[i], maxElem);
}

const maxG = Array.from(Array(N), () => Array(M).fill(0));

// 북 동 남 서
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
function dfs(cx, cy, l, sum) {
  if (maxVal > maxElem * (4 - l)) return;

  if (l === 4) {
    maxVal = Math.max(maxVal, sum);
    return;
  }

  if (cx < 0 || cx >= N || cy < 0 || cy >= M) return;
  if (v[cx][cy]) return;

  v[cx][cy] = true;
  sum += g[cx][cy];

  for (let i = 0; i < 4; i++) {
    const nx = cx + dx[i];
    const ny = cy + dy[i];
    dfs(nx, ny, l + 1, sum);
  }
}

let maxVal;
let v;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    maxVal = -Infinity;
    v = Array.from(Array(N), () => Array(M).fill(false));
    dfs(i, j, 0, 0);
    maxG[i][j] = maxVal;
  }
}

// 북 동 남 서
// const dx = [-1, 0, 1, 0]
// const dy = [0, 1, 0, -1]
function checkSpecial(cx, cy, skip) {
  let sum = g[cx][cy];
  for (let i = 0; i < 4; i++) {
    if (i === skip) continue;
    const nx = cx + dx[i];
    const ny = cy + dy[i];
    if (nx < 0 || nx >= N || ny < 0 || ny >= M) return 0;
    sum += g[nx][ny];
  }
  return sum;
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    let maxVal = -Infinity;
    for (let k = 0; k < 4; k++) {
      maxVal = Math.max(checkSpecial(i, j, k));
    }
    maxG[i][j] = Math.max(maxG[i][j], maxVal);
  }
}

function getMaxVal(graph) {
  let maxVal = -Infinity;
  graph.forEach((row) => {
    maxVal = Math.max(...row, maxVal);
  });
  return maxVal;
}

console.log(getMaxVal(maxG));
