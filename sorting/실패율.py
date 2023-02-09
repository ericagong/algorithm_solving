# 실패율

from copy import deepcopy


def solution(N, stages):
    data = [0] * (N + 2)
    for stage in stages:
        data[stage] += 1

    accum = deepcopy(data)
    for i in range(len(accum) - 1, 0, -1):
        accum[i - 1] += accum[i]

    data = data[1:-1]
    accum = accum[1:-1]

    result = []
    for i in range(len(data)):
        result.append((data[i] / accum[i] if accum[i] != 0 else 0, i + 1))

    result.sort(key=lambda x: (-x[0], x[1]))
    return [x[1] for x in result]

