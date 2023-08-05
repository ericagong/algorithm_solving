// https://www.acmicpc.net/problem/17142

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, M] = inputs.shift().split(" ").map(Number);
const g = [];
for (let i = 0; i < N; i++) {
  g[i] = inputs.shift().split(" ").map(Number);
}

// viruses, empties 저장
const viruses = [];
const empties = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (g[i][j] === 2) viruses.push([i, j]);
    if (g[i][j] === 0) empties.push([i, j]);
  }
}

const activated = [];
let min_time = Infinity;
let c = [];
// viruses 중 M개 선택
function dfs(cnt, nextIdx) {
  if (cnt === M) {
    // 완전 탐색 수행한 후, 최소시간 반영
    c = get_copy(g, activated);
    activated.forEach(([vx, vy]) => {
      spread_virus(vx, vy);
    });
    min_time = Math.min(get_time(c), min_time);
    return;
  }
  for (let i = nextIdx; i < viruses.length; i++) {
    activated.push(viruses[i]);
    dfs(cnt + 1, i + 1);
    activated.pop();
  }
}

function log(g) {
  for (let i = 0; i < g.length; i++) {
    console.log(g[i].join(" "));
  }
  console.log();
}

// - 벽 * 비활성 바이러스 0 활성 바이러스 0 빈칸 형태로 변경
function get_copy(g, activated) {
  const copied = Array.from({ length: N }, () => new Array(N));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      switch (g[i][j]) {
        case 0: // 빈 칸 유지
          copied[i][j] = Infinity;
          break;
        case 1: // 벽 '-'
          copied[i][j] = "-";
          break;
        case 2: // 바이러스는 모두 비활성화 처리 '*'
          copied[i][j] = "*";
      }
    }
  }
  activated.forEach(([ax, ay]) => {
    copied[ax][ay] = 0; // 활성 바이러스 0으로 변경
  });
  return copied;
}

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
// BFS로 바이러스 전파
function spread_virus(ax, ay) {
  const q = [];
  q.push([0, [ax, ay]]); // [초, 위치]
  while (q.length > 0) {
    const [cd, [cx, cy]] = q.shift();
    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];
      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (c[nx][ny] === "-" || c[nx][ny] === 0) continue;
      if (c[nx][ny] === "*") {
        // 비활성 바이러스
        const newd = cd + 1;
        q.push([newd, [nx, ny]]);
        c[nx][ny] = newd;
      } else {
        // 이미 거리 반영되어 있음.
        const newd = cd + 1;
        const oldd = c[nx][ny];
        if (newd < oldd) {
          // 최소시간인 경우만 시간 단축해 반영
          q.push([newd, [nx, ny]]);
          c[nx][ny] = newd;
        }
      }
    }
  }
}

// 빈 칸이었던 곳의 최단 시간을 도출
function get_time(c) {
  let max_time = 0;
  for (let i = 0; i < empties.length; i++) {
    const [ex, ey] = empties[i];
    if (c[ex][ey] === "*" || c[ex][ey] === "-") continue;
    max_time = Math.max(max_time, c[ex][ey]);
  }
  return max_time;
}

if (empties.length !== 0) {
  dfs(0, 0);
  console.log(min_time === Infinity ? -1 : min_time); // 예외처리: 도달할 수 없는 경우
} else {
  // 예외처리: emtpies 없는 경우, 0 리턴
  console.log(0);
}
