//https:school.programmers.co.kr/learn/courses/30/lessons/72410?language=javascript

function solution1(new_id) {
  let id = new_id
    .toLowerCase()
    .replaceAll(/[^\da-z\-_.]/g, "")
    .replaceAll(/[.]{2,}/g, ".");

  if (id.startsWith(".")) id = id.slice(1);
  if (id.endsWith(".")) id = id.slice(0, id.length - 1);

  if (id.length === 0) id = "a";
  if (id.length >= 16) {
    id = id.slice(0, 15);
    if (id.endsWith(".")) id = id.slice(0, id.length - 1);
  }
  if (id.length <= 2) id = id.padEnd(3, id[id.length - 1]);

  // console.log(id)
  return id;
}
