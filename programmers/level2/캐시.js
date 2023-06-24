// https://school.programmers.co.kr/learn/courses/30/lessons/17680

function solution(cacheSize, cities) {
  const MISS = 5;
  const HIT = 1;

  // cacheSize 0인 경우, 예외 처리
  if (cacheSize === 0) return MISS * cities.length;

  let answer = 0;
  let cache = [];

  cities.forEach((city) => {
    city = city.toUpperCase();

    // cache hit 여부 확인
    let idx = cache.indexOf(city);

    if (idx > -1) {
      // cache hit
      cache.splice(idx, 1);
      answer += HIT;
    } else {
      // cache miss
      if (cache.length >= cacheSize) cache.shift(); // LRU FIFO
      answer += MISS;
    }

    cache.push(city);
  });

  return answer;
}
