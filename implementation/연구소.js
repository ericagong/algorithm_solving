// https://www.acmicpc.net/problem/14502

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = inputs.shift().split(" ").map(Number);
g = [];
for (let i = 0; i < N; i++) {
  g[i] = inputs.shift().split(" ").map(Number);
}

// console.log(g)

let virus = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (g[i][j] === 2) virus.push([i, j]);
  }
}

// console.log(virus)

let max_area = -Infinity;

// build wall
function dfs(cnt) {
  if (cnt === 3) {
    // 3개의 벽
    // do sth
    let graph = JSON.parse(JSON.stringify(g));
    virus.forEach((v) => {
      const [vx, vy] = v;
      spread(vx, vy, graph);
    });
    let result = calc(graph);
    max_area = Math.max(max_area, result);
    return;
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (g[i][j] === 0) {
        g[i][j] = 1;
        dfs(cnt + 1);
        g[i][j] = 0;
      }
    }
  }
}

// spread virus from each position
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
function spread(vx, vy, graph) {
  let q = [];
  q.push([vx, vy]);
  while (q.length > 0) {
    const [cx, cy] = q.shift(); // pop과 헷갈리지 않기
    for (let i = 0; i < 4; i++) {
      let nx = cx + dx[i];
      let ny = cy + dy[i];
      // 영역을 벗어나거나 벽이거나 바이러스인 경우 중단
      if (nx < 0 || ny < 0 || nx >= N || ny >= M || graph[nx][ny] > 0) {
        continue;
      } else {
        // 바이러스 전파
        graph[nx][ny] = 2;
        q.push([nx, ny]);
      }
    }
  }
}

// 안전 영역 계산
function calc(graph) {
  let cnt = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (graph[i][j] === 0) cnt += 1;
    }
  }
  return cnt;
}

dfs(0);
console.log(max_area);
