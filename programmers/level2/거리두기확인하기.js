// https://school.programmers.co.kr/learn/courses/30/lessons/81302

//     2
//   2 1 2
// 2 1 P 1 2
//   2 1 2
//     2
function check(x, y, g) {
  // 0. 거리 1인 좌상우하 확인
  let dx1 = [0, -1, 0, 1];
  let dy1 = [-1, 0, 1, 0];
  for (let i = 0; i < 4; i++) {
    const nx = x + dx1[i];
    const ny = y + dy1[i];
    if (nx < 0 || ny < 0 || nx >= 5 || ny >= 5) continue;
    if (g[nx][ny] === "P") return false;
  }

  // 1. 거리 2인 상하좌우 확인하며, 중간에 X 없는지 확인
  for (let i = 0; i < 4; i++) {
    const nx = x + dx1[i] * 2;
    const ny = y + dy1[i] * 2;
    if (nx < 0 || ny < 0 || nx >= 5 || ny >= 5) continue;

    const px = x + dx1[i];
    const py = y + dy1[i];
    if (g[nx][ny] === "P" && g[px][py] !== "X") return false;
  }

  // 2. 거리 2인 대각선 확인하며, 중간에 X 없는지 확인
  let dx2 = [-1, -1, 1, 1];
  let dy2 = [-1, 1, 1, -1];
  for (let i = 0; i < 4; i++) {
    const nx = x + dx2[i];
    const ny = y + dy2[i];
    if (nx < 0 || ny < 0 || nx >= 5 || ny >= 5) continue;

    const cx1 = x + dx1[i];
    const cy1 = y + dy1[i];
    const cx2 = x + dx1[(i + 1) % 4];
    const cy2 = y + dy1[(i + 1) % 4];
    if (g[nx][ny] === "P") {
      if (g[cx1][cy1] === "X" && g[cx2][cy2] === "X") continue;
      else return false;
    }
  }
  return true;
}

function solution(places) {
  // places 순회하며 모든 응시자들 people 배열에 넣기
  // people 순회하며 모든 응시자가 맨하튼 거리 <= 2 내의 다른 응시자 없는지 확인
  let result = new Array(places.length).fill(1);

  places.forEach((place, idx) => {
    const people = [];
    for (let i = 0; i < place.length; i++) {
      for (let j = 0; j < place[i].length; j++) {
        if (place[i][j] === "P") people.push([i, j]);
      }
    }

    for (let i = 0; i < people.length; i++) {
      const [x, y] = people[i];
      if (check(x, y, place) === false) {
        result[idx] = 0;
        break;
      }
    }
  });

  return result;
}
