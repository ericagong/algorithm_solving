# 연구소(https://www.acmicpc.net/problem/14502)

# solve1
import sys
from itertools import combinations
from collections import deque
from copy import deepcopy

input = sys.stdin.readline
n, m = map(int, input().split())
graph = [list(map(int, input().split())) for _ in range(n)]

blanks = []
virus = []
for x in range(n):
  for y in range(m):
    if graph[x][y] == 0:
      blanks.append((x, y))
    if graph[x][y] == 2:
      virus.append((x, y))

def bfs(x, y, g):
  q = deque()
  q.append((x, y))
  dx = [-1, 1, 0, 0]
  dy = [0, 0, -1, 1]
  # graph[x][y] = 3
  while q:
    v1, v2 = q.popleft()
    for i in range(4):
      nx = v1 + dx[i]
      ny = v2 + dy[i]
      if 0 <= nx < n and 0 <= ny < m and g[nx][ny] == 0:
        g[nx][ny] = 3
        q.append((nx, ny))

def cal_safe(walls):
  g = deepcopy(graph)
  for wall in walls:
    x, y = wall
    g[x][y] = 1
  for v in virus:
    x, y = v
    bfs(x, y, g)
  area = 0
  # print(g)
  for x in range(n):
    for y in range(m):
      if g[x][y] == 0:
        area += 1
  return area

combs = list(combinations(blanks, 3))
safe = -2e9

for comb in combs:
  safe = max(cal_safe(comb), safe)

print(safe)
