// https://school.programmers.co.kr/learn/courses/30/lessons/17683?language=javascript#

function transform(notes) {
  return notes.replaceAll(/\w#/g, (note) => note[0].toLowerCase());
}

function solution(m, musicinfos) {
  const melody = transform(m);
  const targets = [];

  musicinfos.forEach((info) => {
    const [ST, ET, title, song] = info.split(',');
    const [SH, SM] = ST.split(':').map(Number);
    const [EH, EM] = ET.split(':').map(Number);
    const playMin = EH * 60 + EM - SH * 60 - SM;
    let playNotes = '';
    const notes = transform(song);
    if (playMin <= notes.length) playNotes = notes.slice(0, playMin);
    else playNotes = notes.padEnd(playMin, notes);
    // console.log(playMin, playNotes, melody)

    if (playNotes.includes(melody)) targets.push([title, playMin]);
  });
  // console.log(targets)

  if (targets.length === 0) return '(None)';

  targets.sort((a, b) => b[1] - a[1]);
  return targets[0][0];
}
