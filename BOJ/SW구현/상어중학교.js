// https://www.acmicpc.net/problem/21609

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = inputs.shift().split(" ").map(Number);
let g = [];

for (let i = 0; i < N; i++) {
  g[i] = inputs.shift().split(" ").map(Number);
}

function log(x) {
  console.log();
  for (let i = 0; i < x.length; i++) {
    console.log(x[i].join(" "));
  }
  console.log();
}

// log(g)
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
let v = Array.from({ length: N }, () => new Array(N).fill(false));

function dfs(x, y, color) {
  if (x < 0 || y < 0 || x >= N || y >= N) return;
  if (v[x][y]) return;
  if (g[x][y] === "*") return;
  if (g[x][y] === -1) return;
  else if (g[x][y] === 0 || g[x][y] === color) {
    v[x][y] = true;
    group.push([x, y, g[x][y]]);
  } else return;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    dfs(nx, ny, color);
  }
  return;
}

let group = [];
function get_target_group() {
  let groups = [];
  v = Array.from({ length: N }, () => new Array(N).fill(false));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (0 < g[i][j] && g[i][j] <= M) {
        // 일반 블록
        if (v[i][j]) continue;

        group = [];
        dfs(i, j, g[i][j]);

        if (group.length <= 1) continue;
        const targets = group
          .filter(([_, __, color]) => color !== 0)
          .sort((a, b) => {
            if (a[0] !== b[0]) return a[0] - b[0]; // 행 오름차순
            return a[1] - b[1]; // 열 오름차순
          });
        const rainbows = group.filter(([_, __, color]) => color === 0);
        rainbows.forEach(([x, y, _]) => {
          v[x][y] = false;
        });

        const total_num = group.length;
        const rainbow_num = total_num - targets.length;
        const [bx, by] = targets[0];

        groups.push([total_num, rainbow_num, bx, by, [...group]]); // 참조 X
      }
    }
  }

  if (groups.length <= 0) return [];

  groups.sort((a, b) => {
    if (a[0] !== b[0]) return b[0] - a[0]; // 블록 그룹 크기 내림차순
    if (a[1] !== b[1]) return b[1] - a[1]; // 무지개 블록 크기 내림차순
    if (a[2] !== b[2]) return b[2] - a[2]; // 기준 블록 행 크기 내림차순
    return b[3] - a[3]; // 기준 블록 열 크기 내림차순
  });

  return groups[0][4];
}

function remove_group(targets) {
  targets.forEach(([x, y]) => {
    g[x][y] = "*";
  });
}

function work_gravity() {
  for (let c = 0; c < N; c++) {
    for (let r = N - 1; r >= 0; r--) {
      let find = false;
      if (g[r][c] === "*") {
        let tr = r - 1;
        while (tr >= 0) {
          if (g[tr][c] === -1) break;
          if (g[tr][c] === "*") {
            tr -= 1;
            continue;
          } else {
            find = true;
            break;
          }
        }

        if (find) {
          g[r][c] = g[tr][c];
          g[tr][c] = "*";
        }
      }
    }
  }
}

function rotate() {
  const temp = Array.from({ length: N }, () => new Array(N).fill(false));

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      temp[N - c - 1][r] = g[r][c];
    }
  }

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      g[r][c] = temp[r][c];
    }
  }
}

let score = 0;

while (true) {
  const target_group = get_target_group();

  if (target_group.length === 0) break;

  score += Math.pow(target_group.length, 2);

  remove_group(target_group);
  work_gravity();
  rotate();
  work_gravity();
}

console.log(score);
