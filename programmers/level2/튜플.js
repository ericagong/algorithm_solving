// https://school.programmers.co.kr/learn/courses/30/lessons/64065

function solution(s) {
  let nums = s.match(/\d+/g).map(Number);
  const counter = new Map();

  for (const num of nums) {
    counter.set(num, (counter.get(num) || 0) + 1);
  }

  return [...counter.entries()].sort((a, b) => b[1] - a[1]).map(([num]) => num);
}
