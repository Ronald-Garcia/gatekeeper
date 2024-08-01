import gpiozero
from time import sleep

led = gpiozero.LED(21)

while True:
    led.pulse()
    sleep(0.1)
    led.pulse()