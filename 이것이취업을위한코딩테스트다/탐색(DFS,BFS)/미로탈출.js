const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = inputs[0].split(' ').map(Number);
const t = inputs.slice(1).map((row) => row.split('').map(Number));

// 최단 경로 탐색 문제는 BFS 사용 권장
// (BFS는 시작 지점에서 가까운 노드부터 차례대로 탐색하기 때문에 맨 처음 도달한 경로가 최단경로임)
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
let minBFS = Infinity;
function solutinon_bfs(cnt) {
  const q = [[0, 0, 1]];
  while (q.length) {
    const [x, y, cnt] = q.shift();
    if (x === N - 1 && y === M - 1) return cnt; // 처음 도달한 경우가 최단 경로
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

solutinon_bfs(1); // cnt = 1부터 시작
console.log(minBFS);

// 최단 경로 탐색 문제는 DFS 사용 비권장
// (DFS는 모든 경로를 탐색하기 때문에 최단 경로를 찾는데 비효율적)
let minDFS = Infinity;
function solution_dfs(x, y, cnt) {
  if (x === N - 1 && y === M - 1) {
    minDFS = Math.min(cnt, min);
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
  t[x][y] = 1; // 방문 처리 취소(백트래킹)
}

// cnt = 1부터 시작
solution_dfs(0, 0, 1);
console.log(minDFS);
