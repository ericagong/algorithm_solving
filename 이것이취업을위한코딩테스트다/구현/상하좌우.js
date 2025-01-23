const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(inputs[0]);
const moves = inputs[1].split(' ');
// console.log(N, moves)

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
const d = { U: 0, R: 1, D: 2, L: 3 };
let cx = 0;
let cy = 0;
for (const move of moves) {
  const i = d[move];
  const nx = cx + dx[i];
  const ny = cy + dy[i];
  if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
  cx = nx;
  cy = ny;
}

console.log(cx + 1, cy + 1);
