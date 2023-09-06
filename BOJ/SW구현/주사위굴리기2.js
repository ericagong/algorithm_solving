// https://www.acmicpc.net/problem/23288

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, M, K] = inputs.shift().split(" ").map(Number);
const g = [];
for (let i = 0; i < N; i++) {
  g[i] = inputs.shift().split(" ").map(Number);
}

// 북 동 남 서
// 0 1 2 3
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
let temp = Array.from(Array(N), () => Array(M).fill(0));
function dfs(x, y, B) {
  if (x < 0 || x >= N || y < 0 || y >= M) return;
  if (g[x][y] !== B) return;
  if (temp[x][y] !== 0) return;
  temp[x][y] = 1;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    dfs(nx, ny, B);
  }
}

const scores = Array.from(Array(N), () => Array(M).fill(0));
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    temp = Array.from(Array(N), () => Array(M).fill(0));
    dfs(i, j, g[i][j]);
    const cnt = temp.reduce((acc, cur) => {
      return acc + cur.reduce((a, c) => a + c, 0);
    }, 0);
    scores[i][j] = g[i][j] * cnt;
  }
}

function getNewDice(dice, i) {
  const [x1, x2, x3, x4, x5, x6] = dice;
  switch (i) {
    case 0:
      return [x5, x1, x3, x2, x4, x6];
    case 1:
      return [x3, x2, x4, x6, x5, x1];
    case 2:
      return [x2, x4, x3, x5, x1, x6];
    case 3:
      return [x6, x2, x1, x3, x5, x4];
  }
}

let ts = 0; // 전체 점수
let times = K;
let ci = 1;
let dice = [1, 2, 4, 6, 5, 3];
function move(cx, cy) {
  let nx = cx + dx[ci];
  let ny = cy + dy[ci];
  if (nx < 0 || nx >= N || ny < 0 || ny >= M) {
    ci = (ci + 2) % 4; // 이동 방향 반대
    nx = cx + dx[ci];
    ny = cy + dy[ci];
  }

  dice = getNewDice(dice, ci);
  cx = nx;
  cy = ny;
  ts += scores[nx][ny];
  times -= 1;

  const A = dice[3];
  const B = g[nx][ny];

  if (A > B) ci = (ci + 1) % 4; // 시계 방향
  if (A < B) ci = (ci - 1 + 4) % 4; // 반시계 방향
  if (A === B) ci = ci;

  if (times !== 0) move(nx, ny);
}

move(0, 0);
console.log(ts);
