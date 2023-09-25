// https://school.programmers.co.kr/learn/courses/30/lessons/64062

function canMove(mid, stones, k) {
  let jump = 0;
  for (let i = 0; i < stones.length; i++) {
    if (stones[i] < mid) jump += 1;
    else jump = 0;
    if (jump >= k) return false;
  }
  return true;
}

function solution(stones, k) {
  let left = 1;
  let right = 200_000_000;
  let maxCnt = 1;
  while (left <= right) {
    let mid = parseInt((left + right) / 2);
    if (canMove(mid, stones, k)) {
      maxCnt = mid;
      left = mid + 1;
    } else right = mid - 1;
  }
  return maxCnt;
}
