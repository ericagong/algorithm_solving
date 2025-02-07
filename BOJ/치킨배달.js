// https://www.acmicpc.net/problem/15686

const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n')

const [N, M] = inputs.shift().split(' ').map(Number)
const city = []
const houses = []
const stores = []
for(let i = 0; i < N; i++) {
  city[i] = inputs.shift().split(' ').map(Number)
  for(let j = 0; j < city[i].length; j++) {
    if(city[i][j] === 1) houses.push([i, j])
    else if(city[i][j] === 2) stores.push([i, j])
  }
}

// console.log(stores, M)

function getCD(comb) {
  let CD = 0
  houses.forEach(([hx, hy]) => {
    let minHD = Infinity
    comb.forEach(([sx, sy]) => {
      const HD = Math.abs(hx - sx) + Math.abs(hy - sy)
      minHD = Math.min(minHD, HD)
    })
    CD += minHD
  })
  return CD
}
  
let minCD = Infinity
function dfs(start, comb) {
  if(comb.length === M) {
    minCD = Math.min(minCD, getCD(comb))
    return
  }

  for(let i = start; i < stores.length; i++) {
    comb.push(stores[i])
    dfs(i+1, comb)
    comb.pop()
  }
}

dfs(0, [])
console.log(minCD)