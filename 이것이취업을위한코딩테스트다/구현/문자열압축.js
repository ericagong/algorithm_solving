function compact(str, base) {
  let prev = str.slice(0, base);
  let cnt = 1;
  let result = '';

  for (let i = base; i < str.length; i += base) {
    const curr = str.slice(i, i + base);
    if (prev === curr) {
      cnt += 1;
    } else {
      result += (cnt > 1 ? cnt : '') + prev;
      prev = curr;
      cnt = 1; // 카운트 초기화
    }
  }

  // 마지막 블록 처리
  result += (cnt > 1 ? cnt : '') + prev;
  return result;
}

function solution(s) {
  let minLength = s.length; // 최솟값 초기화
  const maxBase = Math.floor(s.length / 2); // 최대 base 계산

  for (let base = 1; base <= maxBase; base++) {
    const compacted = compact(s, base);
    minLength = Math.min(minLength, compacted.length);
  }

  return minLength;
}
