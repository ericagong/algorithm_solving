# 숨바꼭질

import sys
from heapq import heappush, heappop

input = sys.stdin.readline
INF = int(2e9)

n, m = map(int, input().split())
graph = [[] for _ in range(n + 1)]
d = [INF] * (n + 1)

for _ in range(m):
    a, b = map(int, input().split())
    graph[a].append((b, 1))
    graph[b].append((a, 1))


def dijkstra(start):
    hq = []
    d[start] = 0
    heappush(hq, (d[start], start))
    while hq:
        cd, cn = heappop(hq)
        if d[cn] < cd:
            continue
        for item in graph[cn]:
            node, edge = item
            new_cost = cd + edge
            if new_cost < d[node]:
                d[node] = new_cost
                heappush(hq, (d[node], node))


def find():
    max_d = -INF
    cand = []
    for i, cd in enumerate(d):
        if i == 0:
            continue
        if max_d < cd:
            max_d = cd
            cand = []
            cand.append(i)
        elif max_d == cd:
            cand.append(i)
    print(cand[0], max_d, len(cand))


dijkstra(1)
find()




