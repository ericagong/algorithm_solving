// https://school.programmers.co.kr/learn/courses/30/lessons/17683?language=javascript#

function solution(m, musicinfos) {
  m = m.replace(/[A-Z]#/g, (v) => v[0].toLowerCase());

  const candidates = [];
  musicinfos.forEach((info) => {
    const [start, end, name, note] = info.split(",");
    const playTime =
      (new Date(`1970-01-01 ${end}:00`) - new Date(`1970-01-01 ${start}:00`)) /
      60000;
    let playNotes = note.replace(/[A-Z]#/g, (v) => v[0].toLowerCase()); // 함수 형태로 작성 가능

    playNotes = playNotes
      .repeat(Math.ceil(playTime / playNotes.length))
      .slice(0, playTime);

    if (playNotes.includes(m)) candidates.push([name, playTime]);
  });

  if (candidates.length === 0) return "(None)";
  // 재생 시간 내림차순 정렬
  else return candidates.sort((a, b) => b[1] - a[1])[0][0];
}
