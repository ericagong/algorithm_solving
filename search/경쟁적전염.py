# 경쟁적 전염 https://www.acmicpc.net/source/55092140

import sys
from collections import deque

input = sys.stdin.readline
n, k = map(int, input().split())
graph = [list(map(int, input().split())) for _ in range(n)]
s, a, b = map(int, input().split())

li = []
for x in range(n):
  for y in range(n):
    if graph[x][y] != 0:
      # 별도의 큐를 둘 필요 없이, s를 큐 요소에 넣어 s 일치 여부를 확인함
      li.append((graph[x][y], 0, x, y)) 
li.sort()

dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]
q = deque(li)
while q:
  v, t, x, y = q.popleft()
  if t == s: # BFS 종료 조건 : s초 기다림
    break
  for i in range(4):
    nx = x + dx[i]
    ny = y + dy[i]
    if 0 <= nx < n and 0 <= ny < n and graph[nx][ny] == 0:
      graph[nx][ny] = v
      q.append((v, t+1, nx, ny))

print(graph[a-1][b-1])