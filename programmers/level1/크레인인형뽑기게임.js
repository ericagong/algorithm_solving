// https://school.programmers.co.kr/learn/courses/30/lessons/64061

function solution(board, moves) {
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
