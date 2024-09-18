import gpiozero
import time
import random
from signal import pause

contactorLED = gpiozero.LED(21)
contactorLED.on()
time.sleep(5)

print("s:Success!")
