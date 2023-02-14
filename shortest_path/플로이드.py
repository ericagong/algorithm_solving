# 플로이드

import sys

input = sys.stdin.readline
INF = int(2e9)

n = int(input())
m = int(input())
graph = [[INF] * n for _ in range(n)]

def log(g):
  for nums in g:
    for num in nums:
      print(num, end = ' ')
    print()

for i in range(n):
  for j in range(n):
    if i == j:
      graph[i][j] = 0

for _ in range(m):
  sc, ec, cost = map(int, input().split())
  graph[sc-1][ec-1] = min(graph[sc-1][ec-1], cost)

for k in range(n):
  for x in range(n):
    for y in range(n):
      graph[x][y] = min(graph[x][y], graph[x][k] + graph[k][y])

for i in range(n):
  for j in range(n):
    if graph[i][j] == INF:
      graph[i][j] = 0
log(graph)