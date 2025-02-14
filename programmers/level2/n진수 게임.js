// https://school.programmers.co.kr/learn/courses/30/lessons/17687?language=javascript

function solution(n, t, m, p) {
  let str = [];
  let num = 0;

  while (str.length < t * m) {
    str.push(...num.toString(n).toUpperCase().split(''));
    num++;
  }

  let result = '';
  for (let i = p - 1; i < str.length; i += m) {
    if (result.length === t) break;
    result += str[i];
  }

  return result;
}
