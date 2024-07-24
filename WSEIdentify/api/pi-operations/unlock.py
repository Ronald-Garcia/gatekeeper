# import gpiozero
# import time
import random

# contactorButton = gpiozero.Button(4, pull_down=False)
# contactorLED = gpiozero.LED(21)
# contactorLED.on()
# 
# print(contactorButton)
# print(contactorLED)
# try:
#    contactorLED.on()
#    if contactorLED.is_lit:
#       print("s:Contactor is activated!")
# except Exception as e:
#    print("e:Error in turning on contactor")
# try:
#     contactorButton.close()
#     contactorLED.close()
#     time.sleep(1)
#     contactorButton = gpiozero.Button(4, pull_up=False) # pin 7
#     contactorButton.when_released=self.updateLastActiveTime
#     contactorButton.when_pressed=self.updateBecameActiveTime
            
#     contactorLED = gpiozero.LED(21) # pin 40
#     contactorLED.on()
#     print("s:Contactor is activated!")
# except Exception as e:
#     print("e:Could not turn on contactor.")


# some oeprations

num1 = 2
num2 = 4
res = num1 + num2 * (388-2)

if random.random() > 0.5:
    print("s:This worked wow!")
    
else: 
    print("e:Error!!! (THIS WORKED)")
    


