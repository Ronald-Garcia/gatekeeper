import gpiozero
import time
import random
from signal import pause

if gpiozero:
    print("there is GPIOZERO")

contactorLED = gpiozero.LED(21)
contactorLED.on()
time.sleep(0.1)
contactorLED.off()
time.sleep(5)

print("s:Success!")
