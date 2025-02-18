// https://www.acmicpc.net/status?user_id=silver_pantheon&problem_id=21608&from_mine=1

const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n')

const N = Number(inputs.shift())
const g = Array.from({length: N}, () => Array(N).fill(0))
const likes = new Map()
const orders = []
for(let i = 0; i < N * N; i++) {
  const [student, ...favs] = inputs.shift().split(' ').map(Number)
  orders.push(student)
  likes.set(student, new Set(favs))
}
// console.log(N, g, orders, likes)

const dx = [-1, 0, 1, 0]
const dy = [0, 1, 0, -1]
function select(student) {
  const favs = likes.get(student)
  const targets = []
  for(let cx = 0; cx < N; cx++) {
    for(let cy = 0; cy < N; cy++) {
      if(g[cx][cy] === 0) {
        let empCnt = 0
        let favCnt = 0
        for(let i = 0; i < 4; i++) {
          const nx = cx + dx[i]
          const ny = cy + dy[i]  
          if(nx >= 0 && nx < N && ny >= 0 && ny < N) {
            if(g[nx][ny] === 0) empCnt += 1
            else if(favs.has(g[nx][ny])) favCnt += 1
          }
        }
        targets.push([cx, cy, empCnt, favCnt])
      }
    }
  }
  
  if(targets.length === 0) return null

  targets.sort(([ax, ay, ae, af], [bx, by, be, bf]) =>
    bf - af || be - ae || ax - bx || ay - by
  )

  const [sx, sy] = targets[0]
  
  return [sx, sy]
}

orders.forEach((student) => {
  const [sx, sy] = select(student)
  // if(!target) 에러처리
  g[sx][sy] = student
})

function calcScore() {
  let totalScore = 0
  for(let cx = 0; cx < N; cx++) {
    for(let cy = 0; cy < N; cy++) {
      const student = g[cx][cy]
      const favs = likes.get(student)
      let fCnt = 0
      for(let i = 0; i < 4; i++) {
        const nx = cx + dx[i]
        const ny = cy + dy[i]
        if(nx >= 0 && nx < N && ny >= 0 && ny < N) {
          if(favs.has(g[nx][ny])) {
            fCnt += 1
          }
        }
      }
      score = fCnt === 0 ? 0 : Math.pow(10, fCnt - 1)
      totalScore += score
    }
  }
  return totalScore
}

console.log(calcScore())