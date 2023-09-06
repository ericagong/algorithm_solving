// https://www.acmicpc.net/problem/16234

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, L, R] = inputs.shift().split(" ").map(Number);
const g = [];
for (let i = 0; i < N; i++) {
  g[i] = inputs.shift().split(" ").map(Number);
}

let v = Array.from({ length: N }, () => new Array(N).fill(false));

// bfs로 연합 찾기 - [연합 내 도시 수, 연합 내 인구 수, [연합 내 도시 좌표 반환]]
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
function get_unions(x, y) {
  if (v[x][y]) return [1, 0, []];

  const q = [];
  q.push([g[x][y], [x, y]]);

  const union = [];
  union.push([x, y]);
  v[x][y] = true; // 맨 처음 요소 visited 처리 필수

  let union_num = 1;
  let union_pop = g[x][y];

  while (q.length > 0) {
    const [cpop, [cx, cy]] = q.shift();
    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (v[nx][ny]) continue;

      const diff = Math.abs(g[nx][ny] - cpop);
      if (diff < L || diff > R) continue;

      q.push([g[nx][ny], [nx, ny]]);
      union_pop += g[nx][ny];
      union_num += 1;
      union.push([nx, ny]);
      v[nx][ny] = true;
    }
  }

  if (union_num === 1) return [1, 0, []];
  return [union_num, union_pop, union];
}

let days = 0;
while (true) {
  let unions = new Map(); // key: [연합 내 도시 좌표, ...], value: 조정 인구 수
  v = Array.from({ length: N }, () => new Array(N).fill(false));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const [union_num, union_pop, union] = get_unions(i, j);
      if (union_num === 1) continue;
      const adj_pop = parseInt(union_pop / union_num);
      unions.set(union, adj_pop); // key가 중복처리되지 않게 주의! primitive type은 중복 시 오버라이드
    }
  }

  if (unions.size === 0) {
    console.log(days);
    return;
  }

  for (const [cities, adj_pop] of unions.entries()) {
    cities.forEach((city) => {
      const [cx, cy] = city;
      g[cx][cy] = adj_pop;
    });
  }

  days += 1;
}
