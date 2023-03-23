# 공유기 설치
import sys

input = sys.stdin.readline

n, c = map(int, input().split())
houses = [int(input()) for _ in range(n)]

houses.sort()


def install(d):
    curr = houses[0]
    cnt = 1  # 맨 처음 값은 따로 처리해줌
    for i in range(1, len(houses)):  # 따로 처리해준 값은 범위에서 빼고 수행
        if houses[i] >= curr + d:
            curr = houses[i]
            cnt += 1
    return cnt >= c


s = 0
e = 1000000000
# e = houses[-1] - houses[0] # 가능한 최대거리
result = 0

while s <= e:
    m = (s + e) // 2
    if install(m):
        result = m
        s = m + 1
    else:
        e = m - 1

print(result)