import gpiozero

led = gpiozero.LED(20)

while True:
    if led.is_lit:
        print("The LED connected to GPIO21 is active!")
    else:
        print("The LED connected to GPIO21 is deactivated!")
