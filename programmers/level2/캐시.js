function solution(cacheSize, cities) {
  const hitTime = 1;
  const missTime = 5;

  if (cacheSize === 0) return missTime * cities.length;

  cities = cities.map((city) => city.toLowerCase());
  // console.log(cities)
  const cache = new Map();
  let totalTime = 0;

  cities.forEach((city, idx) => {
    if (cache.has(city)) {
      totalTime += hitTime;
      cache.set(city, idx);
    } else {
      if (cache.size === cacheSize) {
        // LRU
        const target = cache.keys().next().value;
        cache.delete(target);
      }
      totalTime += missTime;
      cache.set(city, idx);
    }
  });

  return totalTime;
}
