// https://school.programmers.co.kr/learn/courses/30/lessons/72410

function solution(new_id) {
  let result = new_id;

  result = result
    .toLowerCase() // 1단계
    .replace(/[^\w-_.]/g, "") // 2단계
    .replace(/\.{2,}/g, "."); // 3단계

  // 4단계
  if (result[0] === ".") {
    result = result.slice(1);
  }
  if (result[result.length - 1] === ".") {
    result = result.slice(0, result.length - 1);
  }

  // 5단계
  if (result === "") {
    result = "a";
  }

  // 6단계
  if (result.length >= 16) {
    result = result.slice(0, 15);
    if (result[result.length - 1] === ".") {
      result = result.slice(0, 14);
    }
  }

  // 7단계
  if (result.length <= 2) {
    result = result.padEnd(3, result[result.length - 1]);
  }

  return result;
}
