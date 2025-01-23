const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = inputs[0].split(' ').map(Number);
const pt = Array.from({ length: N + 1 }, (_, i) => i);
// console.log(N, M, pt)

function find_parent(pt, n) {
  if (pt[n] !== n) pt[n] = find_parent(pt, pt[n]);
  return pt[n];
}

function union_parent(pt, a, b) {
  const pa = find_parent(pt, a);
  const pb = find_parent(pt, b);
  if (pa < pb) pt[b] = pa;
  else pt[a] = pb;
}

function check_parent(pt, a, b) {
  if (find_parent(pt, a) === find_parent(pt, b)) console.log('YES');
  else console.log('NO');
}

for (let i = 0; i < M; i++) {
  const [op, a, b] = inputs[i + 1].split(' ').map(Number);
  if (op === 0) union_parent(pt, a, b);
  if (op === 1) check_parent(pt, a, b);
}
