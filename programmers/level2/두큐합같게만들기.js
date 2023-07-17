// https://school.programmers.co.kr/learn/courses/30/lessons/118667

function solution(queue1, queue2) {
  const TOTAL_ARRAY = [...queue1, ...queue2];
  const MAXCOUNT = 4 * TOTAL_ARRAY.length;
  const sum = (array) => array.reduce((a, b) => a + b);
  const TARGET = sum(TOTAL_ARRAY) / 2;
  let count = 0;
  let start = 0;
  let end = queue1.length;
  let totalSum = sum(TOTAL_ARRAY.slice(start, end));
  while (count <= MAXCOUNT) {
    if (TARGET > totalSum) {
      totalSum += TOTAL_ARRAY[end];
      end++;
    } else if (TARGET < totalSum) {
      totalSum -= TOTAL_ARRAY[start];
      start++;
    } else if (TARGET === totalSum) {
      return count;
    }
    count++;
  }
  return -1;
}
