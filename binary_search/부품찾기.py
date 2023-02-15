# 부품찾기

import sys

input = sys.stdin.readline
n = int(input())
nums = list(map(int, input().split()))
m = int(input())
checks = list(map(int, input().split()))

# 이진 탐색을 위해서는 반드시 정렬 필요
checks.sort()

def binary_search(li, t, s, e):
  while s <= e:
    m = (s + e) // 2
    if li[m] == t:
      return 'yes'
    elif li[m] < t:
      s = m + 1
    else:
      e = m - 1
  return 'no'

for c in checks:
  print(binary_search(nums, c, 0, len(nums)-1), end=' ')