// https://www.acmicpc.net/problem/1240

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = inputs.shift().split(" ").map(Number);
const g = Array.from({ length: N + 1 }, () => new Array());
for (let i = 0; i < N - 1; i++) {
  const [n1, n2, dis] = inputs.shift().split(" ").map(Number);
  g[n1].push([n2, dis]);
  g[n2].push([n1, dis]);
}

let v = new Array(N + 1).fill(false);
let cd = 0;
function dfs(cn, cd, en) {
  // 기방문 노드 도달시 종료
  if (v[cn]) return;
  v[cn] = true;

  // 특정 노드 도달 시 dfs 종료
  if (cn === en) {
    console.log(cd);
    return;
  }

  for (const [n, d] of g[cn]) {
    dfs(n, cd + d, en);
  }
}

for (let i = 0; i < M; i++) {
  const [n1, n2] = inputs.shift().split(" ").map(Number);

  // 매 쿼리마다 정보 초기화 필요
  cd = 0;
  v = new Array(N + 1).fill(false);

  dfs(n1, 0, n2);
}
