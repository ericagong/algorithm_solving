// https://www.acmicpc.net/problem/19237

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, M, K] = inputs.shift().split(" ").map(Number);
const g = Array.from({ length: N }, () => new Array(N).fill([0, 0]));

const temp = [];
for (let i = 0; i < N; i++) {
  temp[i] = inputs.shift().split(" ").map(Number);
}
const init_dirs = inputs
  .shift()
  .split(" ")
  .map((str) => Number(str) - 1);

let sharks = new Map();
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (temp[i][j] !== 0) {
      const key = `${i},${j}`;
      const num = temp[i][j];
      const shark_info = [num, init_dirs[num - 1]];

      sharks.set(key, [shark_info]);
    }
  }
}

const priorities = new Map();
// 0 1 2 3
// 상 하 좌 우
for (let i = 1; i <= sharks.size; i++) {
  const num = i;
  const value = new Map();
  for (let j = 0; j < 4; j++) {
    const dir = j;
    const priority = inputs
      .shift()
      .split(" ")
      .map((str) => Number(str) - 1);
    value.set(dir, priority); // 숫자
  }
  priorities.set(num, value);
}

function set_smell() {
  // 모든 칸의 상어 순회하며, 냄새 뿌리기
  for (const [pos, value] of sharks.entries()) {
    const [x, y] = pos.split(",").map(Number);
    const [num, dir] = value[0];
    g[x][y] = [num, K + 1];
  }

  // 모든 칸의 냄새 -1 처리
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const [num, sec] = g[i][j];
      if (num !== 0) {
        if (sec === 1) g[i][j] = [0, 0];
        else g[i][j] = [num, sec - 1];
      }
    }
  }
}

// 상 하 좌 우 0 1 2 3
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
function get_move_pos(sx, sy, sn, sd) {
  const p = priorities.get(sn).get(sd);

  // 냄새 없는 칸, 방향 찾아 반환
  for (const idx of p) {
    const nx = sx + dx[idx];
    const ny = sy + dy[idx];
    if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
    else if (g[nx][ny][0] === 0) {
      return [nx, ny, idx];
    }
  }

  // 자기 냄새인 칸, 방향 찾아 반환
  for (const idx of p) {
    const nx = sx + dx[idx];
    const ny = sy + dy[idx];
    if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
    else if (g[nx][ny][0] === sn) {
      return [nx, ny, idx];
    }
  }

  // 움직이지 못하면 그대로 유지?
  return [sx, sy, sd];
}

function move(sx, sy, sn, sd) {
  const [nx, ny, nd] = get_move_pos(sx, sy, sn, sd);

  const key = `${nx},${ny}`;
  let value = "";
  const shark_info = [sn, nd];
  if (moved_sharks.has(key)) {
    value = moved_sharks.get(key).concat([shark_info]);
  } else {
    value = [shark_info];
  }

  moved_sharks.set(key, value);
}

function remove_shark() {
  for (let [key, value] of sharks.entries()) {
    if (value.length !== 1) {
      value = value.sort((a, b) => a[0] - b[0]); // 상어 번호 오름차순 정렬
      const remained_shark = value[0];
      sharks.set(key, [remained_shark]);
    }
  }
}

let time = 0;
let moved_sharks = new Map();

while (sharks.size !== 1 && time <= 1000) {
  time += 1;

  set_smell();

  moved_sharks = new Map();
  for (let [key, value] of sharks.entries()) {
    const [x, y] = key.split(",").map(Number);
    const [num, dir] = value[0];

    move(x, y, num, dir);
  }
  sharks = moved_sharks;

  remove_shark();
}

if (time > 1000) console.log(-1);
else console.log(time);
