function log(arr) {
  arr.forEach((row) => console.log(row.join(' ')));
  console.log();
}

function rotate(arr) {
  const N = arr.length;
  const M = arr[0].length;
  const rotated = Array.from({ length: M }, () => Array(N).fill(0));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      rotated[j][N - i - 1] = arr[i][j];
    }
  }
  return rotated;
}

function checkUnlock(eLock) {
  const N = parseInt(eLock.length / 3);

  for (let i = N; i < 2 * N; i++) {
    for (let j = N; j < 2 * N; j++) {
      if (eLock[i][j] !== 1) return false;
    }
  }

  return true;
}

function solution(key, lock) {
  const N = lock.length;
  const M = key.length;

  const eLock = Array.from({ length: 3 * N }, () => Array(3 * N).fill(0));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      eLock[N + i][N + j] = lock[i][j];
    }
  }
  // log(eLock)

  let rCnt = 0;
  while (rCnt < 4) {
    key = rotate(key);
    rCnt += 1;
    // log(key)

    for (let r = 0; r < 2 * N; r++) {
      for (let c = 0; c < 2 * N; c++) {
        for (let i = 0; i < M; i++) {
          for (let j = 0; j < M; j++) {
            eLock[r + i][c + j] += key[i][j];
          }
        }

        if (checkUnlock(eLock)) return true;

        for (let i = 0; i < M; i++) {
          for (let j = 0; j < M; j++) {
            eLock[r + i][c + j] -= key[i][j];
          }
        }
      }
    }
  }

  return false;
}
