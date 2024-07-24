# import gpiozero
# import time
import random

# contactorButton = gpiozero.Button(4, pull_down=False)
# contactorLED = gpiozero.LED(21)
# 
# print(contactorButton)
# print(contactorLED)
# try:
#    contactorLED.off()
#    print("s:Contactor is deactivated!")
# except Exception as e:
#    print("e:Error in turning off contactor")

# some oeprations

num1 = 2
num2 = 4
res = num1 + num2 * (388-2)

if random.random() > 0.5:
    print("s:Deactivated!")
    
else: 
    print("e:Could not deactivate.")
    



