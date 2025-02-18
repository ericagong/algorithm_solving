// https://school.programmers.co.kr/learn/courses/30/lessons/17684?language=javascript

function solution(msg) {
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const dict = alpha.reduce((m, c, i) => {
    m.set(c, i + 1);
    return m;
  }, new Map([]));

  const print = [];
  while (msg.length !== 0) {
    let li = msg.length;
    let w = '';
    while (li > 0) {
      w = msg.slice(0, li);
      if (dict.has(w)) break;
      li -= 1;
    }

    print.push(dict.get(w));
    msg = msg.slice(li);

    if (msg.length !== 0) {
      const c = msg[0];
      dict.set(`${w}${c}`, dict.size + 1);
    }
  }

  return print;
}
