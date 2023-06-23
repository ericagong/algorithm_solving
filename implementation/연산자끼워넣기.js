// https://www.acmicpc.net/problem/14888

const fs = require("fs");
const inputs = fs.readFileSync("/dev/stdin").toString().split("\n");

const N = Number(inputs.shift());
let nums = inputs.shift().split(" ").map(Number);

let ops = new Map();
const op_chars = ["+", "-", "*", "/"];
const op_nums = inputs.shift().split(" ").map(Number);
for (let i = 0; i < op_chars.length; i++) {
  ops.set(op_chars[i], op_nums[i]);
}

// console.log(ops, nums)
let selected_ops = [];
let max_result = -Infinity;
let min_result = Infinity;
function dfs(cnt) {
  if (cnt === N - 1) {
    let result = nums[0];
    for (let i = 0; i < selected_ops.length; i++) {
      result = calc(result, selected_ops[i], nums[i + 1]);
    }
    max_result = Math.max(max_result, result);
    min_result = Math.min(min_result, result);
    return;
  }
  for (let i = 0; i < 4; i++) {
    let op = op_chars[i];
    if (ops.get(op) > 0) {
      ops.set(op, ops.get(op) - 1);
      selected_ops.push(op);
      dfs(cnt + 1);
      selected_ops.pop();
      ops.set(op, ops.get(op) + 1);
    }
  }
}

function calc(num1, op, num2) {
  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      if (num1 < 0) return parseInt(-num1 / num2) * -1;
      return parseInt(num1 / num2);
  }
}

dfs(0);

console.log(max_result);
console.log(min_result);
