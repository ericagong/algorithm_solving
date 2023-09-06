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

const X = "X";

function findPangs(b, n, m) {
  const pangs = new Set();
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < m - 1; j++) {
      const curr = b[i][j];
      if (curr === X) continue;
      if (
        curr === b[i + 1][j] &&
        curr === b[i][j + 1] &&
        curr === b[i + 1][j + 1]
      ) {
        pangs.add(`${i},${j}`);
        pangs.add(`${i + 1},${j}`);
        pangs.add(`${i},${j + 1}`);
        pangs.add(`${i + 1},${j + 1}`);
      }
    }
  }
  return Array.from(pangs).map((item) => item.split(","));
}

function solution2(m, n, board) {
  let b = Array.from(Array(n), () => Array(m).fill(X));
  board.forEach((row, i) => {
    for (let j = 0; j < row.length; j++) {
      b[j][i] = row[j];
    }
  });

  let pangs = findPangs(b, n, m);
  let result = 0;
  while (pangs.length !== 0) {
    pangs.forEach(([x, y]) => {
      b[x][y] = X;
      result += 1;
    });

    const newB = [];
    b.forEach((row) => {
      const toRight = row.join("").replaceAll(X, "").padStart(m, X).split("");
      newB.push(toRight);
    });

    b = newB;
    pangs = findPangs(b, n, m);
  }

  return result;
}
