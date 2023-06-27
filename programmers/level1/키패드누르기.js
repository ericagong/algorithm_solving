// https://school.programmers.co.kr/learn/courses/30/lessons/67256

function solution(numbers, hand) {
  const left = new Map([
    [1, [0, 0]],
    [4, [1, 0]],
    [7, [2, 0]],
    ["*", [3, 0]],
  ]);
  const middle = new Map([
    [2, [0, 1]],
    [5, [1, 1]],
    [8, [2, 1]],
    [0, [3, 1]],
  ]);
  const right = new Map([
    [3, [0, 2]],
    [6, [1, 2]],
    [9, [2, 2]],
    ["#", [3, 2]],
  ]);

  let cl = left.get("*");
  let cr = right.get("#");
  let result = "";

  for (num of numbers) {
    if (left.has(num)) {
      result += "L";
      cl = left.get(num);
    } else if (right.has(num)) {
      result += "R";
      cr = right.get(num);
    } else {
      const [tx, ty] = middle.get(num);
      const [lx, ly] = cl;
      const [rx, ry] = cr;
      let dl = Math.abs(lx - tx) + Math.abs(ly - ty);
      let dr = Math.abs(rx - tx) + Math.abs(ry - ty);
      if (dl < dr) {
        result += "L";
        cl = [tx, ty];
      } else if (dr < dl) {
        result += "R";
        cr = [tx, ty];
      } else {
        if (hand === "left") {
          result += "L";
          cl = [tx, ty];
        } else {
          result += "R";
          cr = [tx, ty];
        }
      }
    }
  }
  return result;
}
