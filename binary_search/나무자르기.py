# 나무 자르기
# 떡볶이 떡 자르기

import sys

input = sys.stdin.readline

n, m = map(int, input().split())
items = list(map(int, input().split()))
s = 0
e = 2000000000
result = 0

# 식별자 동일한 것 쓰지 않게 주의하기
while s <= e:
  mid = (s+e) // 2
  total = 0
  for item in items:
    if item > mid:
      total += (item - mid)
  if total >= m:
    result = mid
    s = mid + 1
  else:
    e = mid - 1
  # print(total, m, result)
print(result)