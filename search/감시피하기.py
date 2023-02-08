import sys
from itertools import combinations
from copy import deepcopy

# def log(graph):
#   for i in range(len(graph)):
#     print(graph[i])
#   print()

input = sys.stdin.readline
n = int(input())
graph = [input().split() for _ in range(n)]
# log(graph)

ts = []
xs = []
for a in range(n):
  for b in range(n):
    if graph[a][b] == 'X':
      xs.append((a, b))
    if graph[a][b] == 'T':
      ts.append((a,b))
combs = list(combinations(xs, 3))

def catch(x, y, g):
  for i in range(x+1, n):
    if g[i][y] == 'S':
      return True
    elif g[i][y] == 'O':
      break
  for i in range(x-1, -1, -1):
    if g[i][y] == 'S':
      return True
    elif g[i][y] == 'O':
      break
  for i in range(y+1, n):
    if g[x][i] == 'S':
      return True
    elif g[x][i] == 'O':
      break
  for i in range(y-1, -1, -1):
    if g[x][i] == 'S':
      return True
    elif g[x][i] == 'O':
      break
  # log(g)
  return False

def solution():
  for comb in combs:
    g = deepcopy(graph)
    for l in comb:
      x, y = l
      g[x][y] = 'O'
    found = False
    for t in ts:
      i, j = t
      if catch(i, j, g):
        found = True
        break
    if found == False:
      # log(g)
      print('YES')
      return
  print('NO')
  return

solution()