from math import *

def SolarMasstoscale():
    mass = float(input(">"))
    return (mass * 1.98847 * (10 ** 6))

def Earthmasstoscale():
    mass = float(input(">"))
    return (mass * 5.9722)

def AUtoscale():
    dist = float(input(">"))
    return (dist * 149597870660 * (10 ** -9))

def Vy():
    mass = SolarMasstoscale() * 10 ** 24
    r = AUtoscale() * 10 ** 9
    G = 6.67 * 10 ** -11
    return sqrt((G * mass)/r) * (10 ** -3)

while True:
    x = float(input(">>"))
    if x == 1:
        print(SolarMasstoscale())
    elif x == 2:
        print(Earthmasstoscale())
    elif x == 3:
        print(AUtoscale())
    else:
        print(Vy())
