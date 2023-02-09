# 카드 정렬하기 https://www.acmicpc.net/problem/1715

import sys
from heapq import heapify, heappush, heappop

input = sys.stdin.readline
n = int(input())
cards = [int(input()) for _ in range(n)]

heapify(cards)
total = 0
while len(cards) >= 2:
  min1 = heappop(cards)
  min2 = heappop(cards)
  mixed = min1 + min2
  total += mixed
  heappush(cards, mixed)
print(total)
