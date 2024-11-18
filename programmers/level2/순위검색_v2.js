const options = [
  ["-", "cpp", "java", "python"],
  ["-", "backend", "frontend"],
  ["-", "junior", "senior"],
  ["-", "chicken", "pizza"],
];

const queries = new Map();
const infos = new Map();

function getQueries(selected) {
  if (selected.length === 4) {
    const key = selected.join(" ");
    queries.set(key, []);
    if (!key.includes("-")) infos.set(key, []);
    return;
  }

  for (let i = 0; i < options[selected.length].length; i++) {
    selected.push(options[selected.length][i]);
    getQueries(selected);
    selected.pop();
  }
}

function getComb(selected, key, data) {
  if (selected.length === 4) {
    infos.set(key, infos.get(key).concat(selected.join(" ")));
    return;
  }

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      selected.push("-");
      getComb(selected, key, data);
      selected.pop();
    } else {
      selected.push(data[selected.length]);
      getComb(selected, key, data);
      selected.pop();
    }
  }
}

function solution(info, query) {
  getQueries([], options);
  for (key of infos.keys()) {
    getComb([], key, key.split(" "));
  }
  // console.log(infos)
  info.forEach((person) => {
    const arr = person.split(" ");
    const score = Number(arr.pop());
    const key = arr.join(" ");
    const cases = infos.get(key);
    cases.forEach((c) => {
      queries.set(c, queries.get(c).concat(score));
    });
  });
  // console.log(queries)

  const result = [];
  query.forEach((q) => {
    const arr = q.split(" ").filter((item) => item !== "and");
    const score = arr.pop();
    const key = arr.join(" ");
    const cands = queries.get(key);
    const value = cands.filter((s) => s >= score).length;
    result.push(value);
  });

  // console.log(result)
  return result;
}
