# 1로만들기 
n = int(input())

d = [0] * (1000001)
d[1] = 0
d[2] = 1
d[3] = 1

def calc(x):
  temp = []
  temp.append(d[x-1] + 1)
  if x % 3 == 0:
    temp.append(d[x//3] + 1)
  if x % 2 == 0:
    temp.append(d[x//2] + 1)
  d[x] = min(temp)

for i in range(4, n+1):
  calc(i)

print(d[n])