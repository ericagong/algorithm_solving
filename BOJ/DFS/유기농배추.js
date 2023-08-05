// https://www.acmicpc.net/problem/1012

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const T = Number(inputs.shift());

function log(graph) {
  for (let i = 0; i < graph.length; i++) {
    console.log(graph[i].join(" "));
  }
  console.log();
}

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
function dfs(x, y, g, N, M) {
  // 범위 벗어나면 정상 종료 X
  if (x < 0 || y < 0 || x >= N || y >= M) return false;

  if (g[x][y] === 0) return false;
  if (g[x][y] === 2) return false;

  // 방문처리
  g[x][y] = 2;

  // 상하좌우에 대해 재귀호출
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    dfs(nx, ny, g, N, M);
  }

  // 정상 종료
  return true;
}

let time = 0;
while (time < T) {
  time += 1;
  const [M, N, K] = inputs.shift().split(" ").map(Number);
  const g = Array.from({ length: N }, () => new Array(M).fill(0));

  for (let i = 0; i < K; i++) {
    const [y, x] = inputs.shift().split(" ").map(Number);
    g[x][y] = 1;
  }

  let cnt = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (dfs(i, j, g, N, M)) cnt += 1;
    }
  }

  console.log(cnt);
}
