const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = inputs[0].split(' ').map(Number);
const g = Array.from({ length: N }, () => Array(M).fill(0));
for (let i = 0; i < N; i++) {
  g[i] = inputs[i + 1].split('').map(Number);
}

// console.log(N, M, g)

// dfs 풀이
function dfs(s) {
  const [sx, sy] = s;
  if (sx < 0 || sy < 0 || sx >= N || sy >= M) {
    return false;
  }
  if (g[sx][sy] === 0) {
    g[sx][sy] = 2;
    dfs([sx - 1, sy]);
    dfs([sx + 1, sy]);
    dfs([sx, sy - 1]);
    dfs([sx, sy + 1]);
    return true; // dfs 시작점만 true 반환
  }
  return false;
}

// bfs 풀이
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function bfs(s) {
  q = [];
  const [sx, sy] = s;
  if (g[sx][sy] > 0) return;
  q.push(s);
  g[sx][sy] = 2; // 맨 처음 bfs 시작 노드는 2로 처리
  while (q.length > 0) {
    const [cx, cy] = q.shift();
    for (let i = 0; i < 4; i++) {
      const nx = cx - dx[i];
      const ny = cy - dy[i];
      if (nx >= 0 && ny >= 0 && nx < N && ny < M && g[nx][ny] === 0) {
        q.push([nx, ny]);
        g[nx][ny] = 3; // 맨 처음 시작한 노드는 아닌 경우 3으로 처리
      }
    }
  }
}

let cnt = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    // if (dfs([i, j])) cnt += 1;
    bfs([i, j]);
  }
}

// console.log(g)

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (g[i][j] === 2) cnt += 1;
  }
}

console.log(cnt);
