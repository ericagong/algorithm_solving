# 특정 거리의 도시찾기 (https://www.acmicpc.net/problem/18352)

import sys
from collections import deque

input = sys.stdin.readline  # input을 sys.stdin.readline 함수로 대체
n, m, k, x = list(map(int, input().split()))
graph = [[] for _ in range(n + 1)]
for _ in range(m):
    f, t = list(map(int, input().split()))
    graph[f].append(t)
distance = [-1] * (n + 1)  # 한번에 거리 추가 + visited 여부도 첯리 가능


def bfs(start):
    q = deque()
    q.append(start)
    distance[start] = 0
    while q:
        curr = q.popleft()  # 가장 최근 나온 요소의 인접 노드를 방문하는 것이므로,
        # 최근 나온 요소 거리 + 1이 인접 노드와의 거리임
        for node in graph[curr]:
            if distance[node] == -1:
                distance[node] = distance[curr] + 1
                q.append(node)


bfs(x)

check = False  # 예외처리를 위한 변수
for n, d in enumerate(distance):
    if d == k:
        print(n)
        check = True
if check == False:
    print(-1)