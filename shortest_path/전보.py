# 전보

import sys
from heapq import heappush, heappop

input = sys.stdin.readline
INF = int(2e9)

n, m, c = map(int, input().split())
graph = [[] for _ in range(n+1)]
for _ in range(m):
  x, y, z = map(int, input().split())
  graph[x].append((y, z))

d = [INF] * (n+1)
def dijkstra(s):
  q = []
  heappush(q, (0, s))
  d[s] = 0
  while q:
    cost, curr = heappop(q)
    if d[curr] < cost:
      continue
    for item in graph[curr]:
      city, edge = item
      new_cost = cost + edge
      if new_cost < d[city]:
        heappush(q, (new_cost, city))
        d[city] = new_cost


dijkstra(c)
print(d)
cnt = 0
time = 0
for i in range(1, n+1):
  if i == c:
    continue
  if d[i] != INF:
    cnt += 1
    time = max(time, d[i])

print(cnt, time)