// https://school.programmers.co.kr/learn/courses/30/lessons/67258

function solution(gems) {
  const cnt = new Set(gems).size;
  let ans = [1, gems.length];

  let l = 0,
    r = 0;
  const hit = new Map();
  hit.set(gems[0], 1);

  while (r < gems.length) {
    if (hit.size === cnt) {
      if (ans[1] - ans[0] > r - l) ans = [l + 1, r + 1];

      hit.set(gems[l], hit.get(gems[l]) - 1);
      if (hit.get(gems[l]) === 0) hit.delete(gems[l]);
      l += 1;
    } else {
      r += 1;
      hit.set(gems[r], hit.get(gems[r]) + 1 || 1);
    }
  }
  return ans;
}

function solution2(gems) {
  const gemVarietyCounts = new Set(gems).size;
  const map = new Map();
  const gemLengths = [];
  gems.forEach((gem, i) => {
    map.delete(gem);
    map.set(gem, i);
    if (map.size === gemVarietyCounts) {
      // forEach 에서 인덱스 순서로 map 에 저장되니, 첫번째 보석은 map.values().next().value로 구해진다
      gemLengths.push([map.values().next().value + 1, i + 1]);
    }
  });

  gemLengths.sort((a, b) => {
    // 사이즈 다른 거 우선
    if (a[1] - a[0] !== b[1] - b[0]) {
      return a[1] - a[0] - (b[1] - b[0]);
    } else {
      return a[1] - b[1];
    }
  });

  return gemLengths[0];
}
