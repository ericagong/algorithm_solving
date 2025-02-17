// https://school.programmers.co.kr/learn/courses/30/lessons/17686?language=javascript#

function solution(files) {
  const REG = /(?<HEAD>[^\d]+)(?<NUMBER>\d{1,5})(?<TAIL>.*)/;
  const names = [];

  files.forEach((file) => {
    const { HEAD, NUMBER, TAIL } = file.match(REG).groups;
    names.push([file, HEAD.toUpperCase(), Number(NUMBER)]);
  });
  // console.log(names)

  names.sort((a, b) => (a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : a[2] - b[2]));

  return names.map((e) => e[0]);
}
