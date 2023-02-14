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
