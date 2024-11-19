// test input
// 4 4
// 1 1 0
// 1 1 1 1
// 1 0 0 1
// 1 1 0 1
// 1 1 1 1

// test output
// 3

const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n'); // trim 꼭 넣기

const [N, M] = inputs[0].split(' ').map(Number);
const [A, B, d] = inputs[1].split(' ').map(Number);
const m = inputs.slice(2).map((items) => items.split(' ').map(Number));

// console.log(N, M, A, B, d);
// console.log(m);

// 북 동 남 서
// 0 1 2 3
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
let cx = A;
let cy = B;
let cd = d;
let checked = 0;
while (checked <= 4) {
  if (checked === 4) {
    let bd = cd - 2 < 0 ? cd + 2 : cd - 2;
    const nx = cx + dx[bd];
    const ny = cy + dy[bd];
    if (nx < 0 || ny < 0 || nx >= N || ny >= M || m[nx][ny] === 1) break;
    else {
      // 후진 로직
      cd = cd;
      m[nx][ny] = 2;
      cx = nx;
      cy = ny;
      checked = 0;
    }
  }
  let nd = cd - 1 < 0 ? 3 : cd - 1;
  checked += 1;
  const nx = cx + dx[nd];
  const ny = cy + dy[nd];
  if (nx >= 0 && ny >= 0 && nx < N && ny < M && m[nx][ny] === 0) {
    // 전진 로직
    cd = nd;
    m[nx][ny] = 2;
    cx = nx;
    cy = ny;
    checked = 0;
  } else cd = nd;
}

// console.log(m);

let count = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (m[i][j] === 2) count += 1;
  }
}

console.log(count);
