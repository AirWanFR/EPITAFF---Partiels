def decomposition_facteurs_premiers(n):
    facteurs = {}
    d = 2  # Premier diviseur à tester
    while n >= d:
        while n % d == 0:
            if d in facteurs:
                facteurs[d] += 1
            else:
                facteurs[d] = 1
            n //= d
        d += 1
    return facteurs

print(decomposition_facteurs_premiers(400))
print(decomposition_facteurs_premiers(16758))
print(decomposition_facteurs_premiers(12))
print(decomposition_facteurs_premiers(126))