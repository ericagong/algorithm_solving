# 미래도시 (이코테 p.259)

import sys
from heapq import heappush, heappop

input = sys.stdin.readline
INF = int(2e9)

n, m = map(int, input().split())
graph = [[] for _ in range(n+1)]
for _ in range(m):
  v1, v2 = map(int, input().split())
  graph[v1].append((v2, 1))
  graph[v2].append((v1, 1))
x, k = map(int, input().split())
d1 = [INF] * (n+1)
d2 = [INF] * (n+1)


def dijkstra(s, d):
  q = []
  heappush(q, (0, s))
  d[s] = 0
  while q:
    cost, cv = heappop(q)
    if d[cv] < cost:
      continue
    for info in graph[cv]:
      v, edge = info
      nc = cost + edge
      if nc < d[v]:
        d[v] = nc
        heappush(q, (nc, v))


dijkstra(1, d1)
dijkstra(k, d2)
distance = d1[k] + d2[k]
print(distance if distance < INF else '-1')

# 플루이드 워셜 이용한 풀이

# import sys
#
# input = sys.stdin.readline
# INF = int(2e9)
#
# n, m = map(int, input().split())
# graph = [[INF] * (n+1) for _ in range(n+1)]
#
# for x in range(1, n+1):
#   for y in range(1, n+1):
#     if x == y:
#       graph[x][y] = 0
#
# for _ in range(m):
#   x, y = map(int, input().split())
#   graph[x][y] = 1
#   graph[y][x] = 1
#
# end, visit = map(int, input().split())
#
# for k in range(1, n+1):
#   for x in range(1, n+1):
#     for y in range(1, n+1):
#       graph[x][y] = min(graph[x][y], graph[x][k] + graph[k][y])
#
# for i in range(1, n+1):
#   print(graph[i])
#
# result = graph[1][visit] + graph[visit][end]
# print(result if result < INF else -1)