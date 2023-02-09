# 두 배열의 원소 교체
# 이코테 p.182

import sys
from heapq import heapify, heappop, heappush

input = sys.stdin.readline
n, k = map(int, input().split())
a = list(map(int, input().split()))
b = list(map(int, input().split()))


def solution(a, b):
    heapify(a)
    b = [(-x, x) for x in b]
    heapify(b)

    for i in range(k):
        min_a = heappop(a)
        temp = heappop(b)
        max_b = temp[1]
        if min_a >= max_b:
            break
        else:
            heappush(a, max_b)
            heappush(b, (-min_a, min_a))
    return sum(a)


print(solution(a, b))