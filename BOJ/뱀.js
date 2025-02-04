// https://www.acmicpc.net/problem/3190

const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n')

const N = Number(inputs.shift())
const K = Number(inputs.shift())
const g = Array.from({length: N}, () => Array(N).fill(0))
for(let i = 0; i < K; i++) {
  const [r, c] = inputs.shift().split(' ').map(Number)
  g[r-1][c-1] = 1 // 사과
}
const L = Number(inputs.shift())
const turns = inputs.reduce((m, input) => {
  const [time, dir] = input.split(' ')
  m.set(Number(time), dir)
  return m
}, new Map())
// console.log(N, K, g, L, turns)

let snake = [[0, 0]]
g[0][0] = 2
let cd = 1 // 오른쪽
const dx = [-1, 0, 1, 0] // 북 동 남 서
const dy = [0, 1, 0, -1]
let ct = 0

while(true) {
  // console.log(snake, ct)
  const [cx, cy] = snake[snake.length - 1]
  ct += 1 // 게임 이동 진행
  const nx = cx + dx[cd]
  const ny = cy + dy[cd]
  if(nx < 0 || nx > N-1 || ny < 0 || ny > N-1) break // 범위 밖 - 게임 종료 조건
  else { // 범위 내
    if(g[nx][ny] === 2) break // 자기 자신과 부딪침
    
    if(g[nx][ny] === 1) g[nx][ny] = 0
    else {
      const [tx, ty] = snake.shift()
      g[tx][ty] = 0
    }
    snake.push([nx, ny])
    g[nx][ny] = 2
  }
  if(turns.has(ct)) {
    if(turns.get(ct) === 'L') cd = (cd + 3) % 4 // 반시계
    else cd = (cd + 1) % 4 // 시계
  }
}

console.log(ct)