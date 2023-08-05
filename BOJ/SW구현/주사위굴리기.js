// https://www.acmicpc.net/problem/14499

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, M, x, y, K] = inputs.shift().split(" ").map(Number);
const g = [];
for (let i = 0; i < N; i++) {
  g[i] = inputs.shift().split(" ").map(Number);
}
const moves = inputs.shift().split(" ").map(Number);

function getNewDice(d, dice) {
  // 위 아래 앞 뒤 좌 우
  const [x0, x1, x2, x3, x4, x5] = dice;
  // 동 서 북 남 1 2 3 4
  switch (d) {
    case 1:
      return [x4, x5, x2, x3, x1, x0];
    case 2:
      return [x5, x4, x2, x3, x0, x1];
    case 3:
      return [x2, x3, x1, x0, x4, x5];
    case 4:
      return [x3, x2, x0, x1, x4, x5];
  }
}

function changeBottom(to, dice) {
  const [top, bottom, ...rest] = dice;
  return [top, to, ...rest];
}

// 동 서 북 남 0123
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];
let dice = [0, 0, 0, 0, 0, 0];
let cx = x;
let cy = y;
for (let i = 0; i < moves.length; i++) {
  const d = moves[i];

  // 동서남북 1234
  const nx = cx + dx[d - 1];
  const ny = cy + dy[d - 1];

  if (nx < 0 || nx > N - 1 || ny < 0 || ny > M - 1) continue;

  // 주사위 현재 위치 변경
  cx = nx;
  cy = ny;

  // 주사위 굴림
  dice = getNewDice(d, dice);

  // 주사위 맨 아래 값이나 지도 값 변경
  if (g[nx][ny] === 0) g[nx][ny] = dice[1];
  else {
    dice = changeBottom(g[nx][ny], dice);
    g[nx][ny] = 0;
  }

  // 주사위 맨 위 출력
  console.log(dice[0]);
}
