# 연구소(https://www.acmicpc.net/problem/14502)

# solve1 (updated)
import sys
from itertools import combinations
from copy import deepcopy
from collections import deque

input = sys.stdin.readline
n, m = map(int, input().split())
graph = [list(map(int, input().split())) for _ in range(n)]

# 0. 바이러스, 벽 아닌 곳 좌표 리스트 저장
virus = []
zeros = []
for i in range(n):
  for j in range(m):
    if graph[i][j] == 2:
      virus.append((i, j))
    elif graph[i][j] == 0:
      zeros.append((i, j))

# 1. 벽 세울 수 있는 조합 구하기
walls = list(combinations(zeros, 3))

dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]


def bfs(x, y, temp):
  q = deque()
  q.append((x, y))
  while q:
    curr = q.popleft()
    cx, cy = curr
    for i in range(4):
      nx = cx + dx[i]
      ny = cy + dy[i]
      if 0 <= nx < n and 0 <= ny < m and temp[nx][ny] == 0:
        q.append((nx, ny))
        temp[nx][ny] = 3


def calc_safe(temp):
  cnt = 0
  for i in range(n):
    for j in range(m):
      if temp[i][j] == 0:
        cnt += 1
  return cnt


def spread_virus():
  answer = -2e9
  for wall in walls:
    temp = deepcopy(graph)
    for w in wall:
      i, j = w
      temp[i][j] = 1
    # 3. 바이러스 퍼뜨리기
    for v in virus:
      x, y = v
      bfs(x, y, temp)
    # 4. 안전 영역 계산하기
    answer = max(calc_safe(temp), answer)
  return answer


print(spread_virus())
