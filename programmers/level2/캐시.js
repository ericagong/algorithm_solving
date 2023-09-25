// https://school.programmers.co.kr/learn/courses/30/lessons/17680

function solutionWithQueue(cacheSize, cities) {
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

function solutionWithMap(cacheSize, cities) {
  if (cacheSize === 0) return cities.length * 5;

  cities = cities.map((city) => city.toLowerCase());

  let time = 0;
  const cache = new Map();

  cities.forEach((city, t) => {
    if (cache.has(city)) {
      time += 1;
      cache.delete(city);
      cache.set(city, t);
    } else {
      time += 5;
      if (cache.size === cacheSize) {
        const target = cache.keys().next().value;
        cache.delete(target);
      }
      cache.set(city, t);
    }
  });

  return time;
}
