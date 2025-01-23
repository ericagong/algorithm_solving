const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 입력 처리
const [N, M] = inputs[0].split(' ').map(Number);
const [A, B, D] = inputs[1].split(' ').map(Number);
const g = Array.from({ length: N }, (_, i) =>
  inputs[i + 2].split(' ').map(Number),
);

// 초기값 설정
let cx = A,
  cy = B,
  cd = D;
const dx = [-1, 0, 1, 0]; // 북, 동, 남, 서
const dy = [0, 1, 0, -1];
let stop = false;

g[cx][cy] = 2; // 시작 지점 방문 처리

while (!stop) {
  let moved = false;
  let rotations = 0; // 회전 횟수 추적

  // 4방향 회전하며 이동 시도
  while (rotations < 4) {
    const nd = (cd + 3) % 4; // 왼쪽 방향
    const nx = cx + dx[nd];
    const ny = cy + dy[nd];

    if (nx >= 0 && nx < N && ny >= 0 && ny < M && g[nx][ny] === 0) {
      // 이동 가능
      cx = nx;
      cy = ny;
      cd = nd;
      g[nx][ny] = 2; // 방문 처리
      moved = true;
      break;
    }

    // 회전만 진행
    cd = nd;
    rotations++;
  }

  // 네 방향 모두 이동할 수 없는 경우
  if (!moved) {
    const backDir = (cd + 2) % 4; // 후진 방향
    const bx = cx + dx[backDir];
    const by = cy + dy[backDir];

    if (bx < 0 || bx >= N || by < 0 || by >= M || g[bx][by] === 1) {
      stop = true; // 후진 불가 → 종료
    } else {
      cx = bx;
      cy = by; // 후진
    }
  }
}

// 방문한 칸의 개수 계산
const result = g.flat().filter((cell) => cell === 2).length;
console.log(result);
