// https://school.programmers.co.kr/learn/courses/30/lessons/72411?language=javascript

let select = "";
const comb = new Map();

function DFS(order, r, cnt, startIdx) {
  if (cnt === r) {
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
      order = Array.from(order).sort().join("");
      DFS(order, r, 0, 0);
    });

    let max_order = -Infinity;
    let temp = [];

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

  return candidates.sort();
}
