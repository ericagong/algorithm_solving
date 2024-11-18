// https://school.programmers.co.kr/learn/courses/30/lessons/17681

function getDecimal(n, num) {
  let res = [];
  while (num >= 2) {
    r = num % 2;
    num = parseInt(num / 2);
    res.push(r);
  }
  if (num !== 0) res.push(num);
  res.reverse();
  return res.join("").padStart(n, 0);
}

function solution(n, arr1, arr2) {
  let answer = [];
  let map1 = [];
  let map2 = [];

  for (const num of arr1) {
    // map1.push(getDecimal(n, num))
    // Number.toString(base) 함수로 바로 특정 진법의 문자열 얻을 수 있음
    map1.push(num.toString(2).padStart(n, 0));
  }
  for (const num of arr2) {
    // map2.push(getDecimal(n, num))
    map2.push(num.toString(2).padStart(n, 0));
  }

  for (let i = 0; i < n; i++) {
    temp = "";
    for (let j = 0; j < n; j++) {
      // 숫자가 아닌 문자열로 확인해야함에 주의하기
      if (map1[i][j] === "0" && map2[i][j] === "0") {
        temp += " ";
      } else temp += "#";
    }
    answer[i] = temp;
  }

  return answer;
}

// solution1 : 손이 가장 빠른 하드코딩 풀이
function solution1(n, arr1, arr2) {
  arr1 = arr1.map((i) => i.toString(2).padStart(n, "0"));
  arr2 = arr2.map((i) => i.toString(2).padStart(n, "0"));

  let answer = [];
  for (let i = 0; i < n; i++) {
    let str = "";
    for (let j = 0; j < n; j++) {
      if (arr1[i][j] | arr2[i][j]) str += "#";
      else str += " ";
    }
    answer.push(str);
  }

  return answer;
}
