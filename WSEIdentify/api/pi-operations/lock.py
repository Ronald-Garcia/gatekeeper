import gpiozero
import time
import random

contactorButton = gpiozero.Button(4, pull_down=False)
contactorLED = gpiozero.LED(21)

print(contactorButton)
print(contactorLED)
try:
   contactorLED.off()
   print("s:Contactor is deactivated!")
except Exception as e:
   print("e:Error in turning off contactor")
