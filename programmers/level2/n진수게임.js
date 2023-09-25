// https://school.programmers.co.kr/learn/courses/30/lessons/17687?language=javascript

function solution(n, t, m, p) {
  // 1. t*m 길이의 전체 문자열 n진수 변환
  let all = "";
  let num = 0;
  while (all.length <= t * m) {
    all += num.toString(n);
    num += 1;
  }
  all = all.slice(0, t * m); // t*m 길이로 조정
  all = all.toUpperCase(); // 전체 대문자로 표시

  // 2. 튜브 순서에 말해야하는 문자 추출
  let result = "";
  for (let i = 0; i < t * m; i += m) {
    const idx = i + p - 1;
    result += all.slice(idx, idx + 1);
  }

  return result;
}

function solution2(n, t, m, p) {
  let num = 0;
  let str = "";
  while (str.length < m * t) {
    str += num.toString(n);
    num += 1;
  }

  let answer = "";
  for (let x = 0; x < t; x++) {
    answer += str[m * x + p - 1].toUpperCase();
  }

  return answer;
}
