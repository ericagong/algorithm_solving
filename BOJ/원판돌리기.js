// https://www.acmicpc.net/problem/17822

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, M, T] = inputs.shift().split(" ").map(Number);
let g = [];
for (let i = 0; i < N; i++) {
  g[i] = inputs.shift().split(" ").map(Number);
}
let turns = [];
for (let i = 0; i < T; i++) {
  turns.push(inputs.shift().split(" ").map(Number));
}

function turn(x, d, k) {
  for (let i = 0; i < g.length; i++) {
    // 배수 아니면 회전 제외 (연산자 우선순위 주의)
    if ((i + 1) % x !== 0) continue;

    // 시계 방향
    if (d === 0) {
      const idx = g[i].length - k;
      g[i] = g[i].slice(idx).concat(g[i].slice(0, idx));
    }
    // 반시계 방향
    else {
      const idx = k;
      g[i] = g[i].slice(idx).concat(g[i].slice(0, idx));
    }
  }
}

function has_number() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (g[i][j] !== "x") return true;
    }
  }
  return false;
}

// bfs
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
let v = Array.from({ length: N }, () => new Array(M).fill(false));

function delete_number(x, y) {
  if (v[x][y]) return 0;
  if (g[x][y] === "*") return 0;

  const nums = [];
  const q = [];
  q.push([g[x][y], [x, y]]);
  v[x][y] = true;
  nums.push([x, y]);

  while (q.length > 0) {
    const [cnum, [cx, cy]] = q.shift();
    for (let i = 0; i < 4; i++) {
      let nx = cx + dx[i];
      let ny = cy + dy[i];

      // 원판 처리
      if (ny < 0) ny = M - 1;
      if (ny >= M) ny = 0;

      if (nx < 0 || nx >= N) continue;

      if (g[nx][ny] !== cnum) continue;
      if (v[nx][ny]) continue;

      q.push([g[nx][ny], [nx, ny]]);
      v[nx][ny] = true;
      nums.push([nx, ny]);
    }
  }

  // 숫자 지우기
  if (nums.length > 1) {
    nums.forEach(([cx, cy]) => {
      g[cx][cy] = "*";
    });
    return 1;
  }

  // 숫자 못지움
  return 0;
}

function get_avg() {
  let total_cnt = 0;
  let total_num = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (g[i][j] !== "*") {
        total_cnt += 1;
        total_num += g[i][j];
      }
    }
  }

  if (total_cnt === 0) return 0; // 예외처리
  return total_num / total_cnt;
}

function get_sum() {
  let sum = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (g[i][j] !== "*") {
        sum += g[i][j];
      }
    }
  }
  return sum;
}

turns.forEach((t) => {
  const [x, d, k] = t;
  turn(x, d, k);

  v = Array.from({ length: N }, () => new Array(M).fill(false));
  let deleted_cnt = 0;

  if (has_number()) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        deleted_cnt += delete_number(i, j);
      }
    }
    // 숫자 못 지운 경우,
    if (deleted_cnt === 0) {
      const avg = get_avg();

      for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
          if (g[i][j] !== "*") {
            if (g[i][j] < avg) {
              g[i][j] += 1;
            } else if (g[i][j] > avg) {
              g[i][j] -= 1;
            }
          }
        }
      }
    }
  }
});

console.log(get_sum());
