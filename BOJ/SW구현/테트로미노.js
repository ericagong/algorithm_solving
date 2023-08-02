// https://www.acmicpc.net/problem/14500

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = inputs.shift().split(" ").map(Number);
const g = [];
for (let i = 0; i < N; i++) {
  g[i] = inputs.shift().split(" ").map(Number);
}

let v = Array.from({ length: N }, () => new Array(M).fill(false));
const maxs = Array.from({ length: N }, () => new Array(M).fill(-Infinity));

// 상 하 좌 우
const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];
let s = 0;
function dfs(x, y, l) {
  if (l === 4) {
    maxs[x][y] = Math.max(maxs[x][y], s, specialCase(x, y));
    return;
  }

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || ny < 0 || nx > N - 1 || ny > M - 1) continue;
    if (v[nx][ny]) continue;

    v[nx][ny] = true;
    s += g[nx][ny];
    dfs(nx, ny, l + 1);
    v[nx][ny] = false;
    s -= g[nx][ny];
  }
}

// ㅗ, ㅜ, ㅏ, ㅓ 의 DFS 불가 케이스 고려
function specialCase(x, y) {
  let score = 0;

  for (let skip = 0; skip < 4; skip++) {
    let temp = g[x][y];

    for (let i = 0; i < 4; i++) {
      if (i === skip) continue;
      const nx = x + dx[i];
      const ny = y + dy[i];

      // 모양 생성 불가하면 0 반환해 제외
      if (nx < 0 || ny < 0 || nx > N - 1 || ny > M - 1) {
        temp = 0;
        break;
      }

      temp += g[nx][ny];
    }

    score = Math.max(score, temp);
  }

  return score;
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    v[i][j] = true;
    s += g[i][j];
    dfs(i, j, 1);
    v[i][j] = false;
    s -= g[i][j];
  }
}

let result = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    result = Math.max(result, maxs[i][j]);
  }
}

console.log(result);
