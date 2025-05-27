
def bezout(a, b):
    if a == 0:
        return b, 0, 1
    else:
        gcd, x1, y1 = bezout(b % a, a)
        x = y1 - (b // a) * x1
        y = x1
        return gcd, x, y

a = int(input('Enter the first number: '))
b = int(input('Enter the second number: '))
gcd, x, y = bezout(a, b)
print(f'PGCD({a}, {b}) = {gcd}')
print(f'Bezout coefficients: x/u = {x}, y/v = {y}')
print(f'{a} * {x} + {b} * {y} = {gcd}')