import gpiozero
import time
import random
from signal import pause

if gpiozero:
    print("there is GPIOZERO")

try:
    contactorLED = gpiozero.LED("GPIO12")
    while True:
        contactorLED.on()

    print("s:Success!")
except:
    print("not success");