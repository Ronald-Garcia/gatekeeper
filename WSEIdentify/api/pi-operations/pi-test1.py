import gpiozero

led = gpiozero.LED(20)
detectionLed = gpiozero.LED(26)

keep_active = False

while True:
    if detectionLed.is_lit and not keep_active:
        keep_active = True
        print("The LED connected to GPIO26 is active!")
    elif not detectionLed.is_lit and keep_active:
        keep_active = False
        print("The LED connected to GPIO26 has been deactivated!")

    if keep_active:
        led.on()
    else:
        led.off()
