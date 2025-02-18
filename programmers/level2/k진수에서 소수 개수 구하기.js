// https://school.programmers.co.kr/learn/courses/30/lessons/92335

function isPrime(x) {
  if (x < 2) return false;
  for (let i = 2; i * i <= x; i++) {
    if (x % i === 0) return false;
  }
  return true;
}

function solution(n, k) {
  return n.toString(k).split('0').filter(Boolean).map(Number).filter(isPrime)
    .length;
}
