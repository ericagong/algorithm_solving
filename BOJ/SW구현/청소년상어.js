// https://www.acmicpc.net/problem/19236

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

// 0. 입력 처리
let origin = [];
const regex = /\d+ \d+/g;
for (let i = 0; i < 4; i++) {
  const input = inputs
    .shift()
    .match(regex)
    .map((v) =>
      v.split(" ").map((elem, i) => {
        if (i !== 1) return Number(elem);
        else return Number(elem % 8); // 8번째 인덱스를 0으로 처리
      })
    );
  origin[i] = input;
}

// * 디버깅용 출력
function log(graph) {
  const dir = ["↗", "↑", "↖", "←", "↙", "↓", "↘", "→"];
  for (let i = 0; i < graph.length; i++) {
    let result = "";
    for (let j = 0; j < 4; j++) {
      const [n, d] = graph[i][j];
      result = result + `[${n}, ${dir[d]}]`;
    }
    console.log(result);
  }
  console.log();
}

function swap(x1, y1, x2, y2, g) {
  const [n1, d1] = g[x1][y1];
  const [n2, d2] = g[x2][y2];

  fishes.set(n1, [x2, y2]);
  fishes.set(n2, [x1, y1]);

  g[x1][y1] = [n2, d2];
  g[x2][y2] = [n1, d1];
}

const dir = ["↗", "↑", "↖", "←", "↙", "↓", "↘", "→"];
const dx = [-1, -1, -1, 0, 1, 1, 1, 0];
const dy = [1, 0, -1, -1, -1, 0, 1, 1];
function fish_move(fx, fy, g) {
  const [cn, cd] = g[fx][fy];
  for (let di = 0; di < 8; di++) {
    const nd = (cd + di) % 8;
    const nx = fx + dx[nd];
    const ny = fy + dy[nd];
    // 경계 밖이거나 상어
    if (nx < 0 || ny < 0 || nx >= 4 || ny >= 4 || g[nx][ny][0] > 16) continue;
    // 빈칸이거나 다른 물고기
    g[fx][fy][1] = nd; // 방향 반영
    swap(fx, fy, nx, ny, g);
    break;
  }
}

function find_edible(sx, sy, g) {
  const edible = [];
  const [sn, sd] = g[sx][sy];
  for (let i = 1; i < 4; i++) {
    // 최대 3만큼
    const nx = sx + dx[sd] * i;
    const ny = sy + dy[sd] * i;
    if (nx < 0 || ny < 0 || nx >= 4 || ny >= 4) break;
    if (g[nx][ny][0] !== 0) edible.push([nx, ny]);
  }
  return edible;
}

function find_fishes(g) {
  const fishes = new Map();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const [n, d] = g[i][j];
      if (n > 0 && n <= 16) fishes.set(n, [i, j]);
    }
  }
  return fishes;
}

function get_copy(graph) {
  return JSON.parse(JSON.stringify(graph));
}

function dfs(sx, sy, g) {
  // 물고기 전부 이동
  fishes = find_fishes(g);
  // 물고기 번호 오름차순 진행
  for (let n = 1; n <= 16; n++) {
    if (!fishes.has(n)) continue;
    const [fx, fy] = fishes.get(n);
    fish_move(fx, fy, g);
  }

  // 먹을 수 있는 물고기 찾기
  let edible = find_edible(sx, sy, g);

  if (edible.length === 0) {
    // 최대값에 반영
    max_acc_num = Math.max(max_acc_num, acc_num);
    return;
  }

  for (let i = 0; i < edible.length; i++) {
    const [tx, ty] = edible[i];
    const [tn, td] = g[tx][ty];
    const c = get_copy(g);
    acc_num += tn;
    c[sx][sy] = [0, 0]; // 빈 칸 처리
    c[tx][ty] = [17, td]; // 상어 이동
    dfs(tx, ty, c); // 상어 위치기 [tx, ty]로 변경
    acc_num -= tn;
  }
}

// 초기 상어 [0, 0] 먹이 먹음
let fishes = new Map();
let acc_num = origin[0][0][0];
let max_acc_num = -Infinity;
origin[0][0] = [17, origin[0][0][1]];
dfs(0, 0, origin);

console.log(max_acc_num);
