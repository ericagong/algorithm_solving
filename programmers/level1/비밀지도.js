// https://school.programmers.co.kr/learn/courses/30/lessons/17681

function solution(n, arr1, arr2) {
  arr1 = arr1.map((i) => i.toString(2).padStart(n, '0'));
  arr2 = arr2.map((i) => i.toString(2).padStart(n, '0'));

  let answer = [];
  for (let i = 0; i < n; i++) {
    let str = '';
    for (let j = 0; j < n; j++) {
      if (arr1[i][j] || arr2[i][j]) str += '#';
      else str += ' ';
    }
    answer.push(str);
  }

  return answer;
}

// function getDecimal(n, num) {
//   let res = [];
//   while (num >= 2) {
//     r = num % 2;
//     num = parseInt(num / 2);
//     res.push(r);
//   }
//   if (num !== 0) res.push(num);
//   res.reverse();
//   return res.join('').padStart(n, 0);
// }
