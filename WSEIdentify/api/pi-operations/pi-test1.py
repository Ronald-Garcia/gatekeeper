import gpiozero

led = gpiozero.LED(20)

keep_active = False

while True:
    if led.is_lit and not keep_active:
        keep_active = True
        print("The LED connected to GPIO20 is active!")
    elif not led.is_lit and keep_active:
        keep_active = False
        print("The LED connected to GPIO20 has been deactivated!")

    if keep_active:
        led.on()
    else:
        led.off()
