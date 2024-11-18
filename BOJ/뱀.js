// https://www.acmicpc.net/problem/3190

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().trim().split(`\n`);
const N = Number(inputs.shift());
const K = Number(inputs.shift());

let g = Array.from({ length: N }, () => new Array(N).fill(0));
for (let i = 0; i < K; i++) {
  const [ax, ay] = inputs.shift().split(" ").map(Number);
  g[ax - 1][ay - 1] = 1;
}
g[0][0] = 2;

const T = Number(inputs.shift());
let turns = new Map();
for (let i = 0; i < T; i++) {
  const [time, direction] = inputs.shift().split(" ");
  turns.set(Number(time), direction);
}

let snake = [[0, 0]];
let time = 0;
const dx = [-1, 0, 1, 0]; // 상 우 하 좌
const dy = [0, 1, 0, -1];
let idx = 1; // 오른쪽 부터 시작

while (true) {
  const [hx, hy] = snake[snake.length - 1];
  let nx = hx + dx[idx];
  let ny = hy + dy[idx];

  // 뱀 이동 가능 여부 확인
  if (nx < 0 || ny < 0 || nx >= N || ny >= N || g[nx][ny] == 2) {
    console.log(time + 1);
    return;
  }

  // 사과 없는 경우, 뱀 길이 축소
  if (g[nx][ny] !== 1) {
    const [tx, ty] = snake.shift();
    g[tx][ty] = 0;
  }

  // 뱀 머리 움직이기
  // g[ny][ny] = 2 // 오타
  g[nx][ny] = 2; // 오타 주의하기!
  snake.push([nx, ny]);
  time += 1;

  // 방향 전환
  if (turns.has(time)) {
    direction = turns.get(time);
    if (direction === "D") idx += 1;
    else idx -= 1;
    // 예외처리
    if (idx === 4) idx = 0;
    if (idx === -1) idx = 3;
  }
}
