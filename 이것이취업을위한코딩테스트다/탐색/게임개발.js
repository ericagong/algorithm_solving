const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = inputs[0].split(' ').map(Number);
const t = inputs.slice(1).map((row) => row.split('').map(Number));

let min = Infinity;
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

console.log(min);
