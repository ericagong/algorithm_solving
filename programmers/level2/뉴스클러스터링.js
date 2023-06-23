// https://school.programmers.co.kr/learn/courses/30/lessons/17677

function compact(s, size) {
  let result = "";
  let prev = s.slice(0, size);
  let curr = "";
  let cnt = 1;

  for (let i = size; i < s.length; i += size) {
    curr = s.slice(i, i + size);
    if (prev === curr) {
      cnt += 1;
    } else {
      if (cnt === 1) result += prev;
      else result += String(cnt) + prev;
      cnt = 1;
    }
    prev = curr;
  }

  // 맨 뒤 붙여주기
  if (cnt === 1) result += prev;
  else result += String(cnt) + prev;

  return result.length;
}

function solution(s) {
  let min_length = s.length;
  for (let i = 1; i < parseInt(s.length / 2) + 1; i++) {
    min_length = Math.min(min_length, compact(s, i));
  }
  return min_length;
}
