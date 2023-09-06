const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const X = "-";
const A = "A";

const N = Number(inputs.shift());
const g = Array.from(Array(N), () => Array(N).fill(X));
const K = Number(inputs.shift());
for (let i = 0; i < K; i++) {
  const [ax, ay] = inputs.shift().split(" ").map(Number);
  g[ax - 1][ay - 1] = A;
}
const L = Number(inputs.shift());
const turns = new Map();
for (let i = 0; i < L; i++) {
  const [t, action] = inputs.shift().split(" ");
  turns.set(Number(t), action);
}

// 북 동 남 서
// 0 1 2 3
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
let time = 0;
let snake = [`0,0`];
function move(cx, cy, cd) {
  time += 1;
  const nx = cx + dx[cd];
  const ny = cy + dy[cd];

  if (nx < 0 || nx >= N || ny < 0 || ny >= N) return;
  const head = `${nx},${ny}`;
  if (snake.includes(head)) return;

  snake.push(head);
  if (g[nx][ny] !== A) snake = snake.slice(1);
  else g[nx][ny] = X;

  if (turns.has(time)) {
    const action = turns.get(time);
    if (action === "D") cd = (cd + 1) % 4;
    if (action === "L") cd = (cd + 3) % 4;
  }

  move(nx, ny, cd);
}

// 초기 방향: 동쪽
move(0, 0, 1);
console.log(time);
