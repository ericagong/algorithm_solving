// https://school.programmers.co.kr/learn/courses/30/lessons/72411?language=javascript

let select = "";
const comb = new Map();

// 가능한 모든 조합 구하기
function DFS(order, r, cnt, startIdx) {
  if (cnt === r) {
    // 조합의 카운트 수를 추가
    comb.set(select, comb.get(select) + 1 || 1);
    return;
  }
  for (let i = startIdx; i < order.length; i++) {
    select += order[i];
    DFS(order, r, cnt + 1, i + 1);
    select = select.slice(0, select.length - 1);
  }
}

function solution(orders, course) {
  const candidates = [];

  course.forEach((r) => {
    orders.forEach((order) => {
      order = Array.from(order).sort().join(""); // AB BA는 같으므로 정렬한 뒤 조합 구하도록 처리
      DFS(order, r, 0, 0);
    });

    let max_order = -Infinity;
    let temp = [];

    // 가장 많은 손님들이 시킨 조합을 추출
    for (let [key, value] of comb.entries()) {
      if (value < 2) continue;
      if (max_order === value) temp.push(key);
      else if (max_order < value) {
        max_order = value;
        temp = [key];
      }
    }

    candidates.push(...temp);
    comb.clear();
  });

  // 유니코드 사전 순으로 정렬해 반환
  return candidates.sort();
}

function dfs(comb, lastIdx, cnt, word, dict) {
  if (cnt === comb.length) {
    dict.set(comb, dict.get(comb) + 1 || 1);
    return;
  }
  for (let i = lastIdx; i < word.length; i++) {
    comb += word[i];
    dfs(comb, i + 1, cnt, word, dict);
    comb = comb.slice(0, comb.length - 1);
  }
}

function getCourses(dict) {
  let max = -Infinity;
  for (let cnt of dict.values()) {
    max = Math.max(max, cnt);
  }

  if (max === 1) return [];

  const courses = [];
  for (let [course, cnt] of dict.entries()) {
    if (cnt === max) courses.push(course);
  }

  return courses;
}

function solution(orders, course, result) {
  const courses = [];
  course.forEach((cnt) => {
    let dict = new Map();
    orders.forEach((order) => {
      const word = order.split("").sort();
      let comb = "";
      dfs(comb, 0, cnt, word, dict);
    });

    courses.push(...getCourses(dict));
  });

  return courses.sort();
}
