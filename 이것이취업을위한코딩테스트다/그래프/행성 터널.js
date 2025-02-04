const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(inputs[0]);
const xs = [],
  ys = [],
  zs = [];

for (let i = 0; i < N; i++) {
  const [px, py, pz] = inputs[i + 1].split(' ').map(Number);
  xs.push([px, i]);
  ys.push([py, i]);
  zs.push([pz, i]);
}

// 좌표 정렬
xs.sort((a, b) => a[0] - b[0]);
ys.sort((a, b) => a[0] - b[0]);
zs.sort((a, b) => a[0] - b[0]);

const pt = Array.from({ length: N + 1 }, (_, i) => i);
const edges = [];
let resultCost = 0;

// 간선 3 * (N-1)개에 대해서만 수행
// 간선 비용 추가 (각 좌표별 최소 간선)
for (let i = 0; i < N - 1; i++) {
  edges.push([Math.abs(xs[i + 1][0] - xs[i][0]), xs[i][1], xs[i + 1][1]]);
  edges.push([Math.abs(ys[i + 1][0] - ys[i][0]), ys[i][1], ys[i + 1][1]]);
  edges.push([Math.abs(zs[i + 1][0] - zs[i][0]), zs[i][1], zs[i + 1][1]]);
}

// 간선 정렬 (최소 스패닝 트리 Kruskal 알고리즘)
edges.sort((a, b) => a[0] - b[0]);

// 유니온 파인드 (Find-Union)
function find_parent(n) {
  if (pt[n] !== n) pt[n] = find_parent(pt[n]);
  return pt[n];
}

// 경로 압축 필수
function union_parent(a, b) {
  a = find_parent(a);
  b = find_parent(b);
  if (a < b) pt[b] = a;
  else pt[a] = b;
}

// 최소 스패닝 트리 구성
for (let [ec, ea, eb] of edges) {
  if (find_parent(ea) !== find_parent(eb)) {
    union_parent(ea, eb);
    resultCost += ec;
  }
}

console.log(resultCost);
