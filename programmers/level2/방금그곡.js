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

function getPlayTime(start, end) {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const startTime = sh * 60 + sm;
  const endTime = eh * 60 + em;
  return endTime - startTime; // + 1?
}

function getMelody(notes, playTime) {
  let melody = changeNote(notes);

  melody = melody.repeat(Math.ceil(playTime / melody.length));
  melody = Array.from(melody).slice(0, playTime).join("");

  return melody;
}

function changeNote(notes) {
  const noteG = /[A-G]#?/gi;

  const tempNotes = notes.match(noteG);
  let melody = "";
  tempNotes.forEach((note) => {
    if (note.includes("#")) melody += note.replace("#", "").toLowerCase();
    else melody += note;
  });

  return melody;
}

function solution(m, musicinfos) {
  let musics = [];
  musicinfos.forEach((info) => {
    const [start, end, title, notes] = info.split(",");
    const playTime = getPlayTime(start, end);
    const melody = getMelody(notes, playTime);
    musics.push([title, melody, playTime]);
  });

  const target = changeNote(m);
  musics = musics.filter((music) => music[1].includes(target));

  if (musics.length === 0) return "(None)";

  const musicTitle = musics.sort((a, b) => {
    if (a[2] !== b[2]) return b[2] - a[2];
  })[0][0];

  return musicTitle;
}
