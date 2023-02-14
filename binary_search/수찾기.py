# 수 찾기(https://www.acmicpc.net/problem/1920)

import sys

input = sys.stdin.readline
n = int(input())
a = list(map(int, input().split()))
m = int(input())
nums = list(map(int, input().split()))


def binary_search(li, target, s, e):
    if s > e:
        return False
    mid = (s + e) // 2
    if target == li[mid]:
        return True
    elif target < li[mid]:
        return binary_search(li, target, s, mid - 1)
    else:
        return binary_search(li, target, mid + 1, e)


a.sort()
for num in nums:
    print(1 if binary_search(a, num, 0, len(a) - 1) else 0)

