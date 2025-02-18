// https://www.acmicpc.net/problem/14503

const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = inputs.shift().split(' ').map(Number);
const [r, c, d] = inputs.shift().split(' ').map(Number);
const g = Array.from({ length: N }, () =>
  inputs.shift().split(' ').map(Number),
);

// 북 동 남 서
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

function hasDirt(cx, cy) {
  for (let i = 0; i < 4; i++) {
    const nx = cx + dx[i];
    const ny = cy + dy[i];
    if (nx >= 0 && nx < N && ny >= 0 && ny < M && g[nx][ny] === 0) return true;
  }
  return false;
}

function move(cx, cy, cd) {
  if (g[cx][cy] === 0) g[cx][cy] = 2; // 현재 위치 청소

  if (!hasDirt(cx, cy)) {
    // 주변 청소 가능 칸 없음
    const bd = (cd + 2) % 4; // 후진 방향
    const nx = cx + dx[bd];
    const ny = cy + dy[bd];

    if (nx >= 0 && nx < N && ny >= 0 && ny < M && g[nx][ny] !== 1) {
      move(nx, ny, cd); // 후진 가능하면 후진
    }
    return; // 벽이면 종료
  }

  // 반시계 방향 회전 후 이동
  const nd = (cd + 3) % 4;
  const nx = cx + dx[nd];
  const ny = cy + dy[nd];

  if (nx >= 0 && nx < N && ny >= 0 && ny < M && g[nx][ny] === 0) {
    move(nx, ny, nd); // 이동 가능하면 이동
  } else {
    move(cx, cy, nd); // 이동 불가능하면 방향만 바꾸고 재귀 호출
  }
}

function getCleanArea(arr) {
  return arr.flat().filter((elem) => elem === 2).length;
}

move(r, c, d);
console.log(getCleanArea(g));
