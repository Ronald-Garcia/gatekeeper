import gpiozero
import time
import random
from signal import pause

contactorLED = gpiozero.LED(21)

print(contactorLED)
try:
   contactorLED.off()
   print("s:Contactor is deactivated!")
except Exception as e:
   print("e:Error in turning off contactor")
