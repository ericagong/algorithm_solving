// https://school.programmers.co.kr/learn/courses/30/lessons/67257?language=javascript

let maxResult = -Infinity;
function dfs(selected, oprSet, v, nums, oprs) {
  if (selected.length === oprSet.length) {
    const res = calcExp(selected, [...nums], [...oprs]);
    maxResult = Math.max(maxResult, Math.abs(res));
    return;
  }

  for (let i = 0; i < oprSet.length; i++) {
    if (v[i]) continue;
    selected.push(oprSet[i]);
    v[i] = true;
    dfs(selected, oprSet, v, nums, oprs);
    selected.pop();
    v[i] = false;
  }
}

function calculate(num1, opr, num2) {
  switch (opr) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
  }
}

function calcExp(comb, nums, oprs) {
  comb.forEach((topr) => {
    let cur = nums.shift();
    let newNums = [];
    let newOprs = [];

    for (let i = 0; i < nums.length; i++) {
      const opr = oprs[i];
      const num = nums[i];
      if (opr === topr) cur = calculate(cur, opr, num);
      else {
        newNums.push(cur);
        newOprs.push(opr);
        cur = num;
      }
    }
    newNums.push(cur);

    nums = newNums;
    oprs = newOprs;
  });

  return nums[0];
}

function solution(expression) {
  let nums = expression.match(/\d+/g).map(Number);
  let oprs = expression.match(/\D/g);

  const oprSet = Array.from(new Set(oprs));
  const v = Array(oprSet.length).fill(false);

  dfs([], oprSet, v, nums, oprs);
  return maxResult;
}
