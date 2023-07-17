// https://school.programmers.co.kr/learn/courses/30/lessons/72412

let queries = new Map();
const options = [
  ["-", "cpp", "java", "python"], // 0
  ["-", "backend", "frontend"], // 1
  ["-", "junior", "senior"], // 2
  ["-", "chicken", "pizza"], // 3
];
const key = [];
function get_key(cnt) {
  if (cnt === 4) {
    // const copied_key = [...key] // 얕은 복사 필수
    queries.set(key.join(","), []);
    return;
  }

  for (let i = 0; i < options[cnt].length; i++) {
    key.push(options[cnt][i]);
    get_key(cnt + 1);
    key.pop();
  }
}

let combs = [];
const comb = [];
function get_comb(cnt, option) {
  if (cnt === 4) {
    const copied_comb = [...comb];
    combs.push(copied_comb);
    return;
  }

  for (let i = 0; i < option[cnt].length; i++) {
    comb.push(option[cnt][i]);
    get_comb(cnt + 1, option);
    comb.pop();
  }
}

function solution(info, query) {
  get_key(0);

  info.forEach((str, idx) => {
    const temp = str.split(" ");
    const score = Number(temp.pop());

    const option = temp.map((opt) => ["-", opt]);

    get_comb(0, option);

    combs.forEach((comb) => {
      const key = comb.join(",");
      queries.set(key, queries.get(key).concat([[idx, score]]));
    });

    combs = [];
  });

  const result = [];
  query.forEach((q) => {
    const temp = q.split(" ");
    const score = Number(temp.pop());
    const key = temp.filter((str) => str !== "and").join(",");

    result.push(queries.get(key).filter(([_, s]) => s >= score).length);
  });

  return result;
}
