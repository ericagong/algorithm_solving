# 미로탈출 (ICT p.152)

from collections import deque

n, m = list(map(int, input().split()))
graph = []
for _ in range(n):
    graph.append(list(map(int, input())))

# 상하좌우
dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]


def bfs(x, y):
    queue = deque()
    queue.append((x, y))
    while queue:
        # 탐색 노드 추출
        x, y = queue.popleft()
        # 탐색 노드의 상하좌우 방문
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            if nx < 0 or nx > n - 1 or ny < 0 or ny > m - 1:
                continue
            if graph[nx][ny] == 0:
                continue
            if graph[nx][ny] == 1:
                # 탐색 노드 기반 거리 계산
                graph[nx][ny] = graph[x][y] + 1
                queue.append((nx, ny))
    for r in graph:
        print(r)
    return graph[n - 1][m - 1]


print(bfs(0, 0))