import gpiozero
import time
import random
from signal import pause

contactorLED = gpiozero.LED(21)
try:
   contactorLED.on()
   if contactorLED.is_lit:
      print("s:Contactor is activated!")
except Exception as e:
   print("e:Error in turning on contactor")
try:
    contactorLED.close()
    time.sleep(1)
    contactorLED = gpiozero.LED(21) # pin 40
    contactorLED.on()
    print("s:Contactor is activated!")
except Exception as e:
    print("e:Could not turn on contactor.")