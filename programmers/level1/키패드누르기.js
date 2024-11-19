// https://school.programmers.co.kr/learn/courses/30/lessons/67256

function solution(numbers, hand) {
  const left = new Map([
    [1, [0, 0]],
    [4, [1, 0]],
    [7, [2, 0]],
    ['*', [3, 0]],
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
    ['#', [3, 2]],
  ]);

  let cl = left.get('*');
  let cr = right.get('#');
  let result = '';

  for (num of numbers) {
    if (left.has(num)) {
      result += 'L';
      cl = left.get(num);
    } else if (right.has(num)) {
      result += 'R';
      cr = right.get(num);
    } else {
      const [tx, ty] = middle.get(num);
      const [lx, ly] = cl;
      const [rx, ry] = cr;
      let dl = Math.abs(lx - tx) + Math.abs(ly - ty);
      let dr = Math.abs(rx - tx) + Math.abs(ry - ty);
      if (dl < dr) {
        result += 'L';
        cl = [tx, ty];
      } else if (dr < dl) {
        result += 'R';
        cr = [tx, ty];
      } else {
        if (hand === 'left') {
          result += 'L';
          cl = [tx, ty];
        } else {
          result += 'R';
          cr = [tx, ty];
        }
      }
    }
  }
  return result;
}

function solution2(numbers, hand) {
  const ps = new Map([
    [1, [0, 0]],
    [2, [0, 1]],
    [3, [0, 2]],
    [4, [1, 0]],
    [5, [1, 1]],
    [6, [1, 2]],
    [7, [2, 0]],
    [8, [2, 1]],
    [9, [2, 2]],
    ['*', [3, 0]],
    [0, [3, 1]],
    ['#', [3, 2]],
  ]);

  const lefts = new Set([1, 4, 7]);
  const rights = new Set([3, 6, 9]);

  let cl = '*';
  let cr = '#';
  let [clx, cly] = ps.get(cl);
  let [crx, cry] = ps.get(cr);

  let result = '';
  const preferred = hand === 'left' ? 'L' : 'R';

  numbers.forEach((num) => {
    if (lefts.has(num)) {
      cl = num;
      clx = ps.get(cl)[0];
      cly = ps.get(cl)[1];
      result += 'L';
    } else if (rights.has(num)) {
      cr = num;
      crx = ps.get(cr)[0];
      cry = ps.get(cr)[1];
      result += 'R';
    } else {
      const [tx, ty] = ps.get(num);
      const dl = Math.abs(clx - tx) + Math.abs(cly - ty);
      const dr = Math.abs(crx - tx) + Math.abs(cry - ty);
      if (dr > dl) {
        cl = num;
        clx = ps.get(cl)[0];
        cly = ps.get(cl)[1];
        result += 'L';
      } else if (dl > dr) {
        cr = num;
        crx = ps.get(cr)[0];
        cry = ps.get(cr)[1];
        result += 'R';
      } else {
        if (preferred === 'L') {
          cl = num;
          clx = ps.get(cl)[0];
          cly = ps.get(cl)[1];
          result += 'L';
        } else {
          cr = num;
          crx = ps.get(cr)[0];
          cry = ps.get(cr)[1];
          result += 'R';
        }
      }
    }
  });
  return result;
}
