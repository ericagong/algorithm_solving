const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = inputs[0].split(' ').map(Number);
const g = Array.from({ length: N + 1 }, () => Array(N + 1).fill(Infinity));

for (let i = 0; i < N; i++) {
  g[i][i] = 0;
}

for (let r = 1; r <= M; r++) {
  const [i, j] = inputs[r].split(' ').map(Number);
  g[i][j] = 1;
  g[j][i] = 1;
}

const [X, K] = inputs[M + 1].split(' ').map(Number);
// console.log(g, X, K)

for (let k = 0; k <= N; k++) {
  for (let i = 0; i <= N; i++) {
    for (let j = 0; j <= N; j++) {
      g[i][j] = Math.min(g[i][j], g[i][k] + g[k][j]);
    }
  }
}

// console.log(g)
const result = g[1][K] + g[K][X] === Infinity ? -1 : g[1][K] + g[K][X];
console.log(result);
