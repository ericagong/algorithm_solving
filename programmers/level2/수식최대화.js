// https://school.programmers.co.kr/learn/courses/30/lessons/67257?language=javascript

function calc(num1, op, num2) {
  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
  }
}

const perms = [];
let max_result = -Infinity;
function dfs(cnt, arr, visited, exps) {
  if (cnt === arr.length) {
    perms.forEach((prior_op) => {
      const stack = [exps[0]];
      for (let i = 1; i < exps.length - 1; i += 2) {
        const num1 = stack.pop();
        const num2 = exps[i + 1];
        const op = exps[i];
        if (op === prior_op) {
          const result = calc(num1, op, num2);
          stack.push(result);
        } else {
          stack.push(num1);
          stack.push(op);
          stack.push(num2);
        }
      }
      exps = stack;
    });
    const result = Math.abs(exps[0]);
    max_result = Math.max(result, max_result);
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    if (visited[i]) continue;
    perms.push(arr[i]);
    visited[i] = true;
    dfs(cnt + 1, arr, visited, exps);
    perms.pop();
    visited[i] = false;
  }
}

function solution(expression) {
  const regex = /[/+-/*]/g;
  const ops = expression.match(regex);
  const nums = expression.split(regex).map(Number);
  const exps = [nums[0]];
  for (let i = 0; i < ops.length; i++) {
    exps.push(ops[i]);
    exps.push(nums[i + 1]);
  }

  const op_arr = [...new Set(ops)];
  const visited = new Array(op_arr.length).fill(false);

  dfs(0, op_arr, visited, exps);

  return max_result;
}
