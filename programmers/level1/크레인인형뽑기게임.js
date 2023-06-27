// https://school.programmers.co.kr/learn/courses/30/lessons/64061

function solution(board, moves) {
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
