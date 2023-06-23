// https://www.acmicpc.net/problem/16236

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const N = Number(inputs.shift());
const g = [];
for (let i = 0; i < N; i++) {
  g[i] = inputs.shift().split(" ").map(Number);
}

// 아기상어 위치 찾기
let shark_size = 2;
let shark_pos = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (g[i][j] === 9) {
      shark_pos = [i, j];
      g[i][j] = 0;
    }
  }
}

// bfs
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
function get_edible(sx, sy) {
  let v = Array.from({ length: N }, () => new Array(N).fill(false));
  let edible = [];

  const q = [];
  q.push([0, [sx, sy]]);
  v[sx][sy] = true;

  while (q.length > 0) {
    const [cd, [cx, cy]] = q.shift();
    // 먹이 후보 추가
    if (g[cx][cy] < shark_size && g[cx][cy] !== 0) {
      edible.push([cd, [cx, cy]]);
    }

    for (let i = 0; i < 4; i++) {
      const nd = cd + 1;
      const nx = cx + dx[i];
      const ny = cy + dy[i];
      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (g[nx][ny] > shark_size) continue;
      if (v[nx][ny]) continue;
      // 큐 추가
      q.push([nd, [nx, ny]]);
      v[nx][ny] = true;
    }
  }

  return edible;
}

let time = 0;
let acc_num = 0;
while (true) {
  const [sx, sy] = shark_pos;
  let edible = get_edible(sx, sy);

  if (edible.length === 0) {
    console.log(time);
    break;
  }

  edible.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0]; // 거리 오름차순
    if (a[1][0] !== b[1][0]) return a[1][0] - b[1][0]; // x좌표 오름차순
    return a[1][1] - b[1][1]; // y좌표 오름차순
  });

  const target = edible[0];
  const [td, [tx, ty]] = target;

  // 상어 이동 및 타겟 섭취
  time += td;
  g[sx][sy] = 0;
  // g[tx][ty] = 9   // 9로 처리할 경우. 아기상어 크기 >= 9 일 때, 자기 자신도 먹이로 보아 무한 루프에 빠짐!
  g[tx][ty] = 0;
  shark_pos = [tx, ty];
  acc_num += 1;

  // 상어 크기 변경
  if (acc_num === shark_size) {
    shark_size += 1;
    acc_num = 0;
  }
}

// 무한 루프 이슈
// 7
// 1 1 1 1 1 1 1
// 1 1 1 1 1 1 1
// 1 1 1 1 1 1 1
// 1 1 1 1 1 1 1
// 1 1 1 1 1 1 1
// 1 1 1 1 1 1 1
// 1 1 1 1 1 1 9
