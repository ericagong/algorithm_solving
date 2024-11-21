const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = inputs[0].split(' ').map(Number);
const t = inputs.slice(1).map((row) => row.split('').map(Number));

let minD = Infinity;
function dfs(x, y, cnt) {
  if (x === N - 1 && y === M - 1) {
    min = Math.min(cnt, min);
    return;
  }
  if (x < 0 || y < 0 || x >= N || y >= M) return;
  if (t[x][y] !== 1) return; // 괴물 있는 칸이거나 이미 방문한 칸
  t[x][y] = 2; // 방문 처리
  // 상하좌우 이동
  dfs(x - 1, y, cnt + 1);
  dfs(x + 1, y, cnt + 1);
  dfs(x, y - 1, cnt + 1);
  dfs(x, y + 1, cnt + 1);
}

// cnt = 1부터 시작
dfs(0, 0, 1);
console.log(minD);

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
let minB = Infinity;
function bfs(cnt) {
  const q = [[0, 0, 1]];
  while (q.length) {
    const [x, y, cnt] = q.shift();
    if (x === N - 1 && y === M - 1) {
      minB = Math.min(minB, cnt);
      return;
    }
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (t[nx][ny] !== 1) continue; // 괴물 있는 칸이거나 이미 방문한 칸
      t[nx][ny] = 2; // 방문 처리
      q.push([nx, ny, cnt + 1]);
    }
  }
}

bfs(1); // cnt = 1부터 시작
console.log(minB);
