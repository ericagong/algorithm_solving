# 정확한 순위

import sys
from heapq import heappush, heappop

input = sys.stdin.readline
INF = int(1e9)

n, m = map(int, input().split())
ds = [[INF] * (n) for _ in range(n)]
graph = [[] for _ in range(n)]

def log(g):
  for item in g:
    print(item)
  print()

for _ in range(m):
  a, b = map(int, input().split())
  graph[a-1].append((b-1, 1))

def dijkstra(s, d):
  q = []
  heappush(q, (0, s))
  d[s] = 0
  while q:
    cost, cv = heappop(q)
    if d[cv] < cost:
      continue
    for item in graph[cv]:
      n, e = item
      nc = cost + e
      if nc < d[n]:
        d[n] = nc
        heappush(q, (nc, n))
  return d

for i in range(n):
  ds[i] = dijkstra(i, ds[i])

def check(ds):
  cnt = n
  for x in range(n):
    for y in range(n):
      if ds[x][y] == INF and ds[y][x] == INF:
        cnt -= 1
        break
  return cnt

print(check(ds))


# 플루이드 워셜로 풀이
import sys
input = sys.stdin.readline

INF = int(2e9)
n, m = map(int, input().split())
g = [[INF] * (n) for _ in range(n)]

def log(g):
  for nums in g:
    for num in nums:
      print(num, end = ' ')
    print()

for i in range(n):
  g[i][i] = 0

for _ in range(m):
  a, b= map(int, input().split())
  g[a-1][b-1] = 1

for k in range(n):
  for x in range(n):
    for y in range(n):
      g[x][y]= min(g[x][y], g[x][k] + g[k][y])

for x in range(n):
  for y in range(n):
    if g[x][y] == INF:
      g[x][y] = '*'

def check():
  cnt = 0
  checks = [0] * (n)
  for c in range(n):
    for i in range(n):
      if g[i][c] != '*' and i != c:
        checks[c] += 1
    for j in range(n):
      if g[c][j] != '*' and j != c:
        checks[c] += 1
  print(checks)
  for nums in checks:
    if nums == (n-1):
      cnt += 1
  print(cnt)

log(g)
check()