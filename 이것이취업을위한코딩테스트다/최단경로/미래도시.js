const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = inputs[0].split(' ').map(Number);
const d = Array.from({ length: N }, () => Array(N).fill(Infinity));
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (i === j) d[i][j] = 0;
  }
}
for (let i = 0; i < M; i++) {
  const [A, B] = inputs[i + 1].split(' ').map(Number);
  d[A - 1][B - 1] = 1;
  d[B - 1][A - 1] = 1;
}
const [X, K] = inputs[M + 1].split(' ').map(Number);
// console.log(d)

for (let k = 0; k < N; k++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      d[i][j] = Math.min(d[i][j], d[i][k] + d[k][j]);
    }
  }
}

// console.log(d)
const minD = d[0][K - 1] + d[K - 1][X - 1];
const result = minD === Infinity ? -1 : minD;
console.log(result);
