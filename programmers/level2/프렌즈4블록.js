// https://school.programmers.co.kr/learn/courses/30/lessons/17679?language=javascript

function spin(g, m, n) {
  const t = Array.from({ length: n }, () => new Array(m)); // n * m
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      t[i][m - 1 - j] = g[j][i];
    }
  }
  return t;
}

// function log(g) {
//     for(let i = 0; i < g.length; i++) {
//         console.log(g[i])
//     }
//     console.log()
// }

function solution(m, n, board) {
  const t = spin(board, m, n);

  let total_cnt = 0;

  while (true) {
    const deleted = new Set();

    // 2*2 삭제 대상 추출
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < m - 1; j++) {
        if (t[i][j] === "X") continue;
        if (
          t[i][j] === t[i][j + 1] &&
          t[i][j] === t[i + 1][j] &&
          t[i][j] === t[i + 1][j + 1]
        ) {
          deleted.add(`${i},${j}`);
          deleted.add(`${i},${j + 1}`);
          deleted.add(`${i + 1},${j}`);
          deleted.add(`${i + 1},${j + 1}`);
        }
      }
    }

    // 더 이상 지울 수 있는 블럭이 없으면 종료
    if (deleted.size === 0) break;

    total_cnt += deleted.size;

    // 블럭 삭제
    for (let key of deleted.keys()) {
      const [cx, cy] = key.split(",").map(Number);
      t[cx][cy] = "X";
    }

    // 삭제 후 한 칸씩 줄이기 처리
    for (let i = 0; i < n; i++) {
      const filtered = t[i].filter((v) => v !== "X");
      const padding = Array.from({ length: m - filtered.length }).fill("X");
      t[i] = filtered.concat(padding);
    }
  }

  return total_cnt;
}
