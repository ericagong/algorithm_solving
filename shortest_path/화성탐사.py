# 화성탐사 (이코테 p.388)

import sys
from heapq import heappush, heappop

input = sys.stdin.readline
INF = int(2e9)
t = int(input())
dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]


def solution():
    n = int(input())
    g = [[list() for _ in range(n)] for _ in range(n)]
    d = [[INF] * n for _ in range(n)]
    c = [list(map(int, input().split())) for _ in range(n)]

    for x in range(n):
        for y in range(n):
            for i in range(4):
                nx = x + dx[i]
                ny = y + dy[i]
                if 0 <= nx < n and 0 <= ny < n:
                    g[x][y].append(((nx, ny), c[nx][ny]))

    dijkstra(0, 0, d, c, g)

    print(d[n - 1][n - 1])


def dijkstra(sx, sy, d, c, g):
    hq = []
    d[sx][sy] = c[sx][sy]
    heappush(hq, (d[sx][sy], (sx, sy)))
    while hq:
        cd, cn = heappop(hq)
        cx, cy = cn
        if d[cx][cy] < cd:
            continue
        for item in g[cx][cy]:
            adjn, edge = item
            adjx, adjy = adjn
            new_cost = cd + edge
            if new_cost < d[adjx][adjy]:
                d[adjx][adjy] = new_cost
                heappush(hq, (d[adjx][adjy], (adjx, adjy)))


for _ in range(t):
    solution()