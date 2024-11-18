// https://blog.naver.com/boostcamp_official/223085597916

function solution(arr) {
  let counter = new Map();

  arr.forEach((elem) => {
    counter.set(elem, counter.get(elem) + 1 || 1);
  });

  for (let [key, value] of counter.entries()) {
    if (value === 1) counter.delete(key);
  }

  let answer = [];
  if (counter.size === 0) return [-1];
  answer = Array.from(counter.entries()) // Map.prototype.entries는 Iterator 반환하므로 배열로 변경 시, Array.from 필요
    .sort((a, b) => {
      return a[0] - b[0]; // 오름차순
    })
    .map((elem) => elem[1]);
  return answer;
}

solution([1, 2, 3, 3, 3, 3, 4, 4]);
solution([3, 2, 4, 4, 2, 5, 2, 5, 5]);
solution([3, 5, 7, 9, 1]);
