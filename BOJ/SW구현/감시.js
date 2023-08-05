// https://www.acmicpc.net/problem/15683

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = inputs.shift().split(" ").map(Number);
const g = [];
for (let i = 0; i < N; i++) {
  g[i] = inputs.shift().split(" ").map(Number);
}

function log(graph) {
  console.log();
  for (let i = 0; i < graph.length; i++) {
    console.log(graph[i].join(" "));
  }
}

const cctvs = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (g[i][j] !== 0 && g[i][j] !== 6) cctvs.push([g[i][j], [i, j]]); // [num, [x, y]]
  }
}

// 상 하 좌 우
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
const dir = new Map([
  [1, [[0], [1], [2], [3]]],
  [
    2,
    [
      [0, 1],
      [2, 3],
    ],
  ],
  [
    3,
    [
      [0, 3],
      [1, 3],
      [1, 2],
      [0, 2],
    ],
  ],
  [
    4,
    [
      [0, 2, 3],
      [0, 1, 3],
      [1, 2, 3],
      [0, 1, 2],
    ],
  ],
  [5, [[0, 1, 2, 3]]],
]);

const ds = [];
let c = [];
let min_area = Infinity;
function DFS(cnt) {
  if (cnt === cctvs.length) {
    // do sth
    c = JSON.parse(JSON.stringify(g));
    cctvs.forEach((cctv, idx) => {
      const [_, [cx, cy]] = cctv;
      work_cctv(cx, cy, ds[idx]);
    });
    min_area = Math.min(calc_area(), min_area);
    return;
  }

  const directions = dir.get(cctvs[cnt][0]);
  for (let i = 0; i < directions.length; i++) {
    const cd = directions[i];
    ds.push(cd);
    DFS(cnt + 1);
    ds.pop();
  }
}

function work_cctv(cx, cy, cds) {
  cds.forEach((cd) => {
    let nx = cx + dx[cd];
    let ny = cy + dy[cd];
    while (nx >= 0 && ny >= 0 && nx < N && ny < M) {
      if (c[nx][ny] === 6) break; // 벽 통과 불가
      if (c[nx][ny] === 0) c[nx][ny] = "#";
      nx += dx[cd];
      ny += dy[cd];
    }
  });
}

function calc_area() {
  let cnt = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (c[i][j] === 0) cnt += 1;
    }
  }
  return cnt;
}

DFS(0);
console.log(min_area);
