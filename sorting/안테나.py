# 안테나 https://www.acmicpc.net/problem/18310

import sys

input = sys.stdin.readline
n = int(input())
houses = list(map(int, input().split()))

houses.sort()

print(houses[len(houses) // 2])