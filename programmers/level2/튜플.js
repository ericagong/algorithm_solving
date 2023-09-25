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

function solution2(s) {
  nums = s.replace(/[{}]/g, "").split(",").map(Number);
  const count = new Map();
  nums.forEach((num) => {
    count.set(num, count.get(num) + 1 || 1);
  });

  const answer = [];
  for (const [k, v] of count.entries()) {
    answer.push([k, v]);
  }

  return answer.sort((a, b) => b[1] - a[1]).map((elem) => elem[0]);
}
