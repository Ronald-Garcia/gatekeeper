import gpiozero
import time
import random
from signal import pause

if gpiozero:
    print("there is GPIOZERO")

try:
    contactorLED = gpiozero.LED(21)
    while True:
        contactorLED.value = 0

    print("s:Success!")
except:
    print("not success");