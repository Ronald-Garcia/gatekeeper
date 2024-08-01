import gpiozero
import time
import random
from signal import pause

contactorButton = gpiozero.LED(21, pull_up=True)

print(contactorButton)
print(contactorLED)
try:
   contactorLED.off()
   print("s:Contactor is deactivated!")
except Exception as e:
   print("e:Error in turning off contactor")
