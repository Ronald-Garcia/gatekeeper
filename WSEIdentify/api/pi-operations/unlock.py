import gpiozero
import time
import random
from signal import pause

contactorButton = gpiozero.Button(4, pull_up=True)
contactorLED = gpiozero.LED(21)
print("What")
contactorLED.on()

print(contactorButton)
print(contactorLED)
try:
   contactorLED.on()
   if contactorLED.is_lit:
      print("s:Contactor is activated!")
except Exception as e:
   print("e:Error in turning on contactor")
try:
    contactorButton.close()
    contactorLED.close()
    time.sleep(1)
    contactorButton = gpiozero.Button(4, pull_up=False) # pin 7
    contactorLED = gpiozero.LED(21) # pin 40
    contactorLED.on()
    print("s:Contactor is activated!")
except Exception as e:
    print("e:Could not turn on contactor.")




pause()