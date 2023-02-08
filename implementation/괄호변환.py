# 괄호변환
# 카카오 2020 BLIND RECRUITMENT (https://school.programmers.co.kr/learn/courses/30/lessons/60058)

def is_right(p):
    cnt = 0
    for i in range(len(p)):
        if p[i] == '(':
            cnt += 1
        else:
            if cnt <= 0:
                return False
            else:
                cnt -= 1
    return cnt == 0


def solution(p):
    if not p:
        return ''
    right = True
    cnt = 0
    for i in range(len(p)):
        if p[i] == '(':
            cnt += 1
        else:
            cnt -= 1
        if cnt == 0:
            u = p[:i + 1]
            v = p[i + 1:]
            if is_right(u):

                return u + solution(v)
            else:
                return '(' + solution(v) + ')' + ''.join(list(map(lambda x: ')' if x == '(' else '(', u[1:-1])))