// https://school.programmers.co.kr/learn/courses/30/lessons/64065

function solution(s) {
  const regex = /\d+/g;
  const nums = s.match(regex).map(Number);
  const cnt = new Map();

  nums.forEach((num) => {
    cnt.set(num, cnt.get(num) + 1 || 1);
  });

  let result = [];
  for (let [k, v] of cnt.entries()) {
    result.push([v, k]);
  }

  return result.sort((a, b) => b[0] - a[0]).map((v) => v[1]);
}
