const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = inputs[0].split(' ').map(Number);
const edges = [];
for (let i = 0; i < M; i++) {
  const [A, B, C] = inputs[i + 1].split(' ').map(Number);
  edges.push([C, A, B]);
}
const pt = Array.from({ length: N + 1 }, (_, i) => i);
// console.log(edges)

function find_parent(pt, n) {
  if (pt[n] !== n) pt[n] = find_parent(pt, pt[n]);
  return pt[n];
}

function union_parent(pt, a, b) {
  const pa = find_parent(pt, a);
  const pb = find_parent(pt, b);
  if (pa < pb) pt[pb] = pa;
  else pt[pa] = pb;
}

edges.sort((a, b) => a[0] - b[0]);
// console.log(N, M, edges, pt)

let totalCost = 0;
let maxCost = 0;
for (let [ec, ea, eb] of edges) {
  if (find_parent(pt, ea) !== find_parent(pt, eb)) {
    union_parent(pt, ea, eb);
    totalCost += ec;
    maxCost = Math.max(ec, maxCost);
  }
}

// console.log(pt, totalCost, maxCost)
const result = totalCost - maxCost;
console.log(result);
