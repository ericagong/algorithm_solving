// https://www.acmicpc.net/problem/14499

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, M, x, y, K] = inputs.shift().split(" ").map(Number);
const g = [];
for (let i = 0; i < N; i++) {
  g[i] = inputs.shift().split(" ").map(Number);
}
const moves = inputs
  .shift()
  .split(" ")
  .map((i) => Number(i) - 1);

function getNewDice(dice, i) {
  const [x1, x2, x3, x4, x5, x6] = dice;
  switch (i) {
    case 0:
      return [x3, x2, x4, x6, x5, x1];
    case 1:
      return [x6, x2, x1, x3, x5, x4];
    case 2:
      return [x5, x1, x3, x2, x4, x6];
    case 3:
      return [x2, x4, x3, x5, x1, x6];
  }
}

let dice = [0, 0, 0, 0, 0, 0];
// 동 서 북 남
// 0 1 2 3
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];
let cx = x;
let cy = y;

let result = "";
for (let i = 0; i < moves.length; i++) {
  const dir = moves[i];
  const nx = cx + dx[dir];
  const ny = cy + dy[dir];

  if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

  dice = getNewDice(dice, dir);
  cx = nx;
  cy = ny;

  const bottom = dice[3];
  const target = g[nx][ny];
  if (target === 0) g[nx][ny] = bottom;
  else {
    dice[3] = target;
    g[nx][ny] = 0;
  }

  result += `${dice[0]}\n`;
}

console.log(result);
