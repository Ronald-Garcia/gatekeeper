import gpiozero

led = gpiozero.LED(20)
detectionLed = gpiozero.LED(26)

keep_active = False
pulse_started = False
print("Script Started")

while True:
    if detectionLed.is_lit:
        pulse_started = True
    if not detectionLed.is_lit and pulse_started:
        pulse_started = False
        print("Pulse received! Toggling GPIO20")
        if led.is_lit:
            led.off()
        else:
            led.on()
    
