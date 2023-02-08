# 인구이동 (https://www.acmicpc.net/problem/16234)

import sys
from collections import deque

input = sys.stdin.readline
n, l, r = map(int, input().split())
graph = [list(map(int, input().split())) for _ in range(n)]
visited = [[False] * n for _ in range(n)]


def can_open(cx, cy, nx, ny):
    return l <= abs(graph[cx][cy] - graph[nx][ny]) <= r


unions = []
dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]


def bfs(x, y):
    q = deque()
    union = []
    q.append((x, y))
    union.append((x, y))
    visited[x][y] = True
    while q:
        curr = q.popleft()
        cx, cy = curr
        for i in range(4):
            nx = cx + dx[i]
            ny = cy + dy[i]
            if 0 <= nx < n and 0 <= ny < n and not visited[nx][ny] and can_open(cx, cy, nx, ny):
                q.append((nx, ny))
                union.append((nx, ny))
                visited[nx][ny] = True
    unions.append(union)


def move():
    for union in unions:
        if len(union) == 1:
            continue
        else:
            total = 0
            for city in union:
                x, y = city
                total += graph[x][y]
            new_pop = int(total / len(union))
            for city in union:
                x, y = city
                graph[x][y] = new_pop


# def log(g):
#   print('grpah')
#   for i in range(len(g)):
#     print('\t', g[i])
#   print()

cnt = 0
while True:
    visited = [[False] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            if not visited[i][j]:
                bfs(i, j)
    # print(unions)
    # log(graph)
    if len(unions) == n * n:
        break
    move()
    cnt += 1
    unions = []

print(cnt)
