// https://school.programmers.co.kr/learn/courses/30/lessons/72410

function solution1(new_id) {
  return new_id
    .toLowerCase()
    .replace(/[^\w-_.]/g, '')
    .replace(/\.{2,}/g, '.')
    .replace(/^\.|\.$/g, '')
    .padEnd(1, 'a')
    .slice(0, 15)
    .replace(/\.$/, '')
    .padEnd(3, new_id[new_id.length - 1]);
}

function solution2(new_id) {
  new_id = new_id
    .toLowerCase()
    .replace(/[^\w-_.]/g, '')
    .replace(/\.{2,}/g, '.')
    .replace(/^\.|\.$/g, '')
    .replace(/^$/, 'a')
    .match(/^.{0,14}[^.]/)[0]
    .replace(/^(.)$/, '$1$1$1') // padEnd 케이스별 대체
    .replace(/^(.)(.)$/, '$1$2$2');

  return new_id;
}
