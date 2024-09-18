import gpiozero
import time
import random
from signal import pause

if gpiozero:
    print("there is GPIOZERO")

try:
    contactorLED = gpiozero.LED(6)
    while True:
        contactorLED.off()

    print("s:Success!")
except:
    print("not success");