// https://school.programmers.co.kr/learn/courses/30/lessons/17683?language=javascript#

function getPlayTime(start, end) {
  const [sHH, sMM] = start.split(":").map(Number);
  const [eHH, eMM] = end.split(":").map(Number);
  return eHH * 60 + eMM - (sHH * 60 + sMM) + 1; // 종료 시간까지 포함
}

// 치환 함수 - 빼먹지 않도록 주의
function getNotes(info) {
  return info
    .replaceAll("A#", "a")
    .replaceAll("C#", "c")
    .replaceAll("D#", "d")
    .replaceAll("F#", "f")
    .replaceAll("G#", "g");
}

function solution(m, musicinfos) {
  m = getNotes(m);

  const candidates = [];
  musicinfos.forEach((info) => {
    const [start, end, name, note] = info.split(",");
    const playTime = getPlayTime(start, end);
    let playNotes = getNotes(note);

    if (playNotes.length >= playTime) {
      playNotes = playNotes.slice(0, playTime);
    } else {
      const q = parseInt(playTime / playNotes.length);
      const r = playTime % playNotes.length;
      playNotes = playNotes.repeat(q) + playNotes.slice(0, r);
    }

    if (playNotes.includes(m)) candidates.push([name, playTime]);
  });

  if (candidates.length === 0) return "(None)";
  // 재생 시간 내림차순 정렬
  else return candidates.sort((a, b) => b[1] - a[1])[0][0];
}
