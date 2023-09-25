// https://school.programmers.co.kr/learn/courses/30/lessons/67259

let minCost = Infinity;

// 북 동 남 서
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
let cand = [];
function dfs(cx, cy, cd, cost, v, N, board) {
  if (cx === N - 1 && cy === N - 1) {
    minCost = Math.min(minCost, cost);
    return;
  }

  for (let i = 0; i < 4; i++) {
    const nx = cx + dx[i];
    const ny = cy + dy[i];
    if (
      nx < 0 ||
      nx >= N ||
      ny < 0 ||
      ny >= N ||
      board[nx][ny] === 1 ||
      v[nx][ny]
    )
      continue;
    let cc = 0;
    if (cd === i || cd === 4) cc = 100; // 맨 처음은 어느 방향으로 가든 100원
    else cc = 600;
    v[nx][ny] = true;
    dfs(nx, ny, i, cost + cc, v, N, board);
    v[nx][ny] = false;
  }
}

function solution(board) {
  const N = board.length;
  let v = Array.from(Array(N), () => new Array(N).fill(false));
  v[0][0] = true;
  dfs(0, 0, 4, 0, v, N, board);
  return minCost;
}
