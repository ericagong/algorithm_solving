# 연산자 끼워넣기 https://www.acmicpc.net/problem/14888

import sys

input = sys.stdin.readline
n = int(input())
nums = list(map(int, input().split()))
a, s, m, d = list(map(int, input().split()))

min_v = 2e9
max_v = -2e9


def dfs(cnt, now):
    global min_v, max_v, a, s, m, d
    if cnt == n:
        min_v = min(min_v, now)
        max_v = max(max_v, now)
        return
    if a > 0:
        a -= 1
        dfs(cnt + 1, now + nums[cnt])
        a += 1
    if s > 0:
        s -= 1
        dfs(cnt + 1, now - nums[cnt])
        s += 1
    if m > 0:
        m -= 1
        dfs(cnt + 1, now * nums[cnt])
        m += 1
    if d > 0:
        d -= 1
        dfs(cnt + 1, int(now / nums[cnt]))  # 음수 나누기 파이썬에서 자동 처리
        d += 1


dfs(1, nums[0])
print(max_v)
print(min_v)