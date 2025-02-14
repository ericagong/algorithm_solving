// https://www.acmicpc.net/problem/18405

const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, K] = inputs.shift().split(' ').map(Number);
const g = Array.from({ length: N }, () =>
  inputs.shift().split(' ').map(Number),
);
let vs = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (g[i][j] !== 0) vs.push([i, j, g[i][j]]);
  }
}
const [S, X, Y] = inputs.shift().split(' ').map(Number);

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
function spread(cx, cy, cv) {
  for (let i = 0; i < 4; i++) {
    const nx = cx + dx[i];
    const ny = cy + dy[i];
    if (nx >= 0 && nx < N && ny >= 0 && ny < N && g[nx][ny] === 0) {
      g[nx][ny] = cv;
      vs.push([nx, ny, cv]);
    }
  }
}

for (let i = 0; i < S; i++) {
  vs.sort((a, b) => a[2] - b[2]);
  vs.forEach(([cx, cy, cv]) => {
    spread(cx, cy, cv);
  });
}

console.log(g[X - 1][Y - 1]);
