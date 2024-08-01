import gpiozero
from time import sleep

led = gpiozero.LED(21)

while True:
    led.on()
    sleep(3)
    led.off()
    sleep(3)