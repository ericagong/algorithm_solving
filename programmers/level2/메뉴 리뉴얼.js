// https://school.programmers.co.kr/learn/courses/30/lessons/72411?language=javascript

function dfs(menus, r, comb, si, combs) {
  if (comb.length === r) {
    const key = comb.join('');
    combs.set(key, combs.get(key) + 1 || 1);
    return;
  }

  for (let i = si; i < menus.length; i++) {
    comb.push(menus[i]);
    dfs(menus, r, comb, i + 1, combs);
    comb.pop();
  }
}

function solution(orders, course) {
  const result = [];
  course.forEach((r) => {
    const combs = new Map();

    for (let order of orders) {
      let menus = order.split('');
      menus.sort();
      if (menus.length < r) continue;
      dfs(menus, r, [], 0, combs);
    }
    // console.log(combs)

    let maxCount = 0;
    let maxCombs = [];
    for (let [key, value] of combs.entries()) {
      if (value < maxCount) continue;
      else {
        if (value === maxCount) maxCombs.push(key);
        else {
          maxCount = value;
          maxCombs = [key];
        }
      }
    }
    if (maxCount >= 2) {
      result.push(...maxCombs);
      // console.log(maxCount, maxCombs)
    }
  });
  // console.log(result)

  return result.sort();
}
