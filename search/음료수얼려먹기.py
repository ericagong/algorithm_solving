N, M = list(map(int, input().split()))
graph_li = []
for _ in range(N):
  graph_li.append(list(map(int, input()))) # 문자열이므로 한번에 처리 가능

def dfs(x, y):
  if x < 0 or x > N-1 or y < 0 or y > M-1: # 예외 한번에 처리
    return False
  if graph_li[x][y] == 0:
    graph_li[x][y] = 2 # 방문 처리
    # 북 남 서 동
    dfs(x-1, y)
    dfs(x+1, y)
    dfs(x, y-1)
    dfs(x, y+1)
    return True # DFS 완료한 경우만 True 반환
  return False

# 완전 탐색
cnt = 0
for i in range(N):
  for j in range(M):
    if dfs(i, j) == True: # True인 경우만 카운트
      cnt += 1
print(cnt)