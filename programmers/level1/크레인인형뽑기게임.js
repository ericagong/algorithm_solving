// https://school.programmers.co.kr/learn/courses/30/lessons/64061

// 1. 기존 행렬 그대로 stack 기반 풀이
function solution1(board, moves) {
  let cnt = 0;
  let stack = [];

  for (let i = 0; i < moves.length; i++) {
    let now = moves[i] - 1;
    for (let j = 0; j < board.length; j++) {
      // 맨 위의 요소 뽑기
      if (board[j][now] != 0) {
        // stack top과 동일하면 삭제하고 cnt + 2
        if (stack[stack.length - 1] === board[j][now]) {
          stack.pop();
          cnt += 2;
        } else {
          stack.push(board[j][now]);
        }
        // 맨 위 요소 뽑음 처리
        board[j][now] = 0;
        break;
      }
    }
  }

  return cnt;
}

// 2. n * n 행렬 회전 기반 풀이
function solution2(board, moves) {
  const n = board.length;
  const rotated = Array.from({ length: n }, () => new Array(n).fill(0));

  // 90도 우측 회전
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rotated[j][n - i - 1] = board[i][j];
    }
  }

  let cnt = 0;
  const basket = [];
  for (let i = 0; i < moves.length; i++) {
    const idx = moves[i];
    const row = rotated[idx - 1].filter((x) => x !== 0);
    if (row.length === 0) continue;
    else {
      const doll = row.pop();
      rotated[idx - 1] = row.concat(
        Array.from({ length: n - row.length }).fill(0),
      );

      if (basket.length === 0) basket.push(doll);
      else {
        const target = basket.pop();
        if (target === doll) cnt += 2;
        else {
          basket.push(target, doll);
        }
      }
    }
  }

  return cnt;
}
