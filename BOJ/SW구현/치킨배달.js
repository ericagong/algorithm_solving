// https://www.acmicpc.net/problem/15686

const fs = require("fs");
let inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = inputs.shift().split(" ").map(Number);
let g = [];
for (let i = 0; i < N; i++) {
  g[i] = inputs.shift().split(" ").map(Number);
}

let houses = [];
let stores = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (g[i][j] === 1) houses.push([i, j]);
    if (g[i][j] === 2) stores.push([i, j]);
  }
}

// console.log(g)
// console.log(stores, houses)

// 치킨 집 M개 선택
let visited = new Array(stores.length).fill(false);
let selected = [];
let min_d = Infinity;

function dfs(cnt, idx) {
  if (cnt === M) {
    // do sth
    console.log(selected);
    let temp = calc(selected);
    min_d = Math.min(min_d, temp);
    return;
  }

  // i = 0 이면 순열 i = idx 부터 시작이면 조합
  for (let i = idx; i < stores.length; i++) {
    if (visited[i]) continue;
    else {
      visited[i] = true;
      selected.push(stores[i]);
      dfs(cnt + 1, i);
      visited[i] = false;
      selected.pop();
    }
  }
}

function calc(selected_stores) {
  let ds = new Array(houses.length).fill(Infinity);
  houses.forEach(([hx, hy], i) => {
    selected_stores.forEach(([sx, sy]) => {
      cd = Math.abs(hx - sx) + Math.abs(hy - sy);
      // cd = Math.abs(hx - sx) + Math.abs(sx - sy) // 오타 주의하기!
      ds[i] = Math.min(ds[i], cd);
    });
  });
  return ds.reduce((acc, cur) => acc + cur);
}

dfs(0, 0);

console.log(min_d);
