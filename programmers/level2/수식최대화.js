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

// 풀이2: eval 사용

// function solution(expression) {
//   const splitted = expression.split(/([\*\+-])/g);

//   const solve = (precedence, left = 0, right = splitted.length) => {
//     if (left + 1 === right) {
//       return eval(splitted[left]);
//     }

//     for (const operator of precedence) {
//       for (let i = right - 2; i > left; i -= 2) {
//         if (splitted[i] === operator) {
//           return eval(
//             `${solve(precedence, left, i)}${operator}${solve(
//               precedence,
//               i + 1,
//               right
//             )}`
//           );
//         }
//       }
//     }

//     return Number.POSITIVE_INIFINITY;
//   };

//   return Math.max(
//     ...[
//       ["*", "+", "-"],
//       ["*", "-", "+"],
//       ["+", "*", "-"],
//       ["+", "-", "*"],
//       ["-", "*", "+"],
//       ["-", "+", "*"],
//     ]
//       .map((precedence) => solve(precedence))
//       .map(Math.abs)
//   );
// }

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
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
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

function solution3(expression) {
  let nums = expression.match(/\d+/g).map(Number);
  let oprs = expression.match(/\D/g);

  const oprSet = Array.from(new Set(oprs));
  const v = Array(oprSet.length).fill(false);

  dfs([], oprSet, v, nums, oprs);
  return maxResult;
}
