// https://www.acmicpc.net/problem/16236

const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(inputs.shift());
const g = inputs.map((row) => row.split(' ').map(Number));

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

function bfs(sx, sy, ss) {
  const v = Array.from({ length: N }, () => Array(N).fill(false)); // 방문 배열 초기화
  const q = [];
  q.push([sx, sy, 0]);
  v[sx][sy] = true;
  const targets = [];

  while (q.length !== 0) {
    const [cx, cy, cd] = q.shift();
    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];
      if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue; // 범위 밖
      if (v[nx][ny]) continue; // 이미 방문한 곳이면 스킵
      if (g[nx][ny] <= ss) {
        q.push([nx, ny, cd + 1]);
        v[nx][ny] = true;
        if (g[nx][ny] > 0 && g[nx][ny] < ss) {
          targets.push([nx, ny, cd + 1]);
        }
      }
    }
  }

  if (targets.length === 0) return null;

  // 물고기 정렬: 거리 -> 위쪽 -> 왼쪽 순서
  targets.sort(([ax, ay, ad], [bx, by, bd]) => {
    return ad - bd || ax - bx || ay - by;
  });

  return targets[0];
}

// 아기 상어 초기 위치 찾기
let sx = 0,
  sy = 0,
  ss = 2;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (g[i][j] === 9) {
      sx = i;
      sy = j;
      g[i][j] = 0; // 초기 위치를 찾았으면 9를 0으로 변경
    }
  }
}

let time = 0;
let eatCount = 0;
while (true) {
  const target = bfs(sx, sy, ss);
  if (!target) break;

  const [tx, ty, td] = target;
  time += td;
  sx = tx;
  sy = ty;
  g[tx][ty] = 0;
  eatCount += 1;

  // 상어 사이즈 조정
  if (eatCount === ss) {
    ss += 1;
    eatCount = 0;
  }
}

console.log(time);
