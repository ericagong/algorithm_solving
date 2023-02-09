# [국영수](https://www.acmicpc.net/problem/10825)

import sys

input = sys.stdin.readline
n = int(input())
li = []
for _ in range(n):
  name, a, b, c = input().split()
  li.append((name, int(a), int(b), int(c)))

li.sort(key=lambda x: (-x[1], x[2], -x[3], x[0]))
answer = [x[0] for x in li]

for name in answer:
  print(name)
