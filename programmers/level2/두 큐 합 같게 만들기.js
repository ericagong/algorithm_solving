// https://school.programmers.co.kr/learn/courses/30/lessons/118667

function solution(queue1, queue2) {
  const q = queue1.concat(queue2);
  // q1 [s, e)
  let s = 0;
  let e = queue1.length;
  const ts = q.reduce((acc, curr) => curr + acc, 0);

  if (ts % 2 !== 0) return -1;

  const TARGET = ts / 2;
  let hs = queue1.reduce((acc, curr) => curr + acc, 0);

  let moveCnt = 0;
  while (hs !== TARGET && moveCnt <= 2 * q.length) {
    if (hs < TARGET) {
      hs += q[e];
      e = (e + 1) % q.length;
      moveCnt += 1;
    } else if (hs > TARGET) {
      hs -= q[s];
      s = (s + 1) % q.length;
      moveCnt += 1;
    }
  }
  if (moveCnt > 2 * q.length) return -1;
  return moveCnt;
}
