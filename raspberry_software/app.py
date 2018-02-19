#!/usr/bin/python

from flask import Flask, abort
import RPi.GPIO as GPIO

app = Flask(__name__)   # Create an instance of flask called "app"

# Safe state
safe_opened = False
alarm_active = True


@app.route("/")         # This is our default handler, if no path is given
def index():
    print "hello"
    return "hello"

#  The magic happens here. When some http request comes in with a path of
#  gpio/x/y, the Flask app will attempt to parse that as x=pin and y=level.
#  Note that there is no error handling here! Failure to properly specify the
#  route will result in a 404 error.
@app.route('/safe_opened')
def safe_state():
    global safe_opened
    if safe_opened:
        return "OK"
    else:
        abort(400)


@app.route('/alarm_activated')
def alarm_activated():
    global alarm_active
    if alarm_active:
        return "OK"
    else:
        abort(400)


@app.route('/gpio/activate_alarm')
def activate_alarm():
    global alarm_active
    GPIO.output(26, GPIO.HIGH)
    alarm_active = True
    return "OK"


@app.route('/gpio/deactivate_alarm')
def deactivate_alarm():
    global alarm_active
    GPIO.output(26, GPIO.LOW)
    alarm_active = False
    return "OK"


@app.route('/gpio/open_safe')
def open_safe():
    global safe_opened
    GPIO.output(13, GPIO.HIGH)
    safe_opened = True
    return "OK"


@app.route('/gpio/close_safe')
def close_safe():
    global safe_opened
    GPIO.output(13, GPIO.LOW)
    safe_opened = False
    return "OK"


@app.route('/login_failure')
def login_failure():
    global alarm_active
    if alarm_active:
        GPIO.output(21, GPIO.HIGH)
    return "OK"

@app.route('/login_success')
def login_success():
    GPIO.output(21, GPIO.LOW)
    return "OK"


#  If we're running this script directly, this portion executes. The Flask
#  instance runs with the given parameters. Note that the "host=0.0.0.0" part
#  is essential to telling the system that we want the app visible to the 
#  outside world.
if __name__ == "__main__":
    try:
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(26, GPIO.OUT) # alarm
        GPIO.output(26, GPIO.HIGH)

        GPIO.setup(13, GPIO.OUT) # safe
        GPIO.output(13, GPIO.LOW)

        GPIO.setup(21, GPIO.OUT) # buzzer
        GPIO.output(21, GPIO.LOW)
        app.run(host='0.0.0.0', port=6000)
    finally:
        GPIO.cleanup()

