// https://school.programmers.co.kr/learn/courses/30/lessons/92335

function isPrime(num) {
  if (num <= 1) return false; // 1은 소수 아님
  for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function solution(n, k) {
  const nums = n
    .toString(k)
    .split(0)
    .filter((v) => v !== "")
    .map(Number);

  let cnt = 0;
  nums.forEach((v) => {
    if (isPrime(v)) cnt += 1;
  });
  return cnt;
}
