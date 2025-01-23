const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const cx = inputs[0][0].charCodeAt(0) - 97;
const cy = Number(inputs[0][1]) - 1;
// console.log(cx, cy)

let cnt = 0;
const dx = [-2, -2, -1, 1, 2, 2, -1, 1];
const dy = [-1, 1, 2, 2, -1, 1, -2, -2];
const N = 8;
for (let i = 0; i < N; i++) {
  const nx = cx + dx[i];
  const ny = cy + dy[i];
  if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
  // console.log(nx, ny)
  cnt += 1;
}
console.log(cnt);
