from __future__ import print_function
from flask import Flask, abort, request, render_template, jsonify
from flask_httpauth import HTTPBasicAuth
from requests import get
import sys
import numpy as np
import base64
import cv2
import face
import config
import time

app = Flask(__name__, template_folder='../build', static_folder='../build/static')

# Extensions
auth = HTTPBasicAuth()

# Mocked behavior
secret_token = "emVEQwsePJp9dm6F"

# Globals for state
safe_opened = False
alarm_activated = False


def decode_base64(data):
    """Decode base64, padding being optional.

    :param data: Base64 data as an ASCII byte string
    :returns: The decoded byte string.

    """
    missing_padding = len(data) % 4
    if missing_padding != 0:
        data += b'='* (4 - missing_padding)
    return base64.decodestring(data)


def recognize(img):
  
    global model
    img = img[22:]
    img = decode_base64(img)
    img = np.frombuffer(img, dtype=np.uint8)
	
    img = cv2.imdecode(img, 1)
    image = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    
    result = face.detect_single(image)
    if result is None:
        print('Could not detect single face!')
        return False
    x, y, w, h = result
    crop = face.resize(face.crop(image, x, y, w, h))
    
    label, confidence = model.predict(crop)
    if label == config.POSITIVE_LABEL:
        print('Predicted POSITIVE face with confidence ')
        print(confidence)
    else:
        print('Predicted NEGATIVE face with confidence ')
        print(confidence)
    if label == config.POSITIVE_LABEL and confidence < config.POSITIVE_THRESHOLD:
        print('Recognized face!')
        return True
    else:
        print('Did not recognize face!')
    return False


# REST server paths
@app.route('/api/token', methods=['POST'])
def get_auth_token():
    img = request.json.get('img')
    if recognize(img):
        print("Authenticated using image", file=sys.stderr)
        get('http://192.168.1.155:6000/login_success')
        return jsonify({'token': secret_token})
    else:
        get('http://192.168.1.155:6000/login_failure')
        abort(400)


@app.route('/api/safe_opened')
@auth.login_required
def is_safe_opened():
    global safe_opened
    r = get('http://192.168.1.155:6000/safe_opened')
    if r.status_code == 200:
        safe_opened = True
    if r.status_code == 400:
        safe_opened = False
    return jsonify({'safeOpened': safe_opened})


@app.route('/api/open_safe')
@auth.login_required
def open_safe():
    global safe_opened
    r = get('http://192.168.1.155:6000/gpio/open_safe')
    if r.status_code == 200:
        safe_opened = True
    return jsonify({'safeOpened': safe_opened})


@app.route('/api/close_safe')
@auth.login_required
def close_safe():
    global safe_opened
    r = get('http://192.168.1.155:6000/gpio/close_safe')
    if r.status_code == 200:
        safe_opened = False
    return jsonify({'safeOpened': safe_opened})


@app.route('/api/alarm_activated')
@auth.login_required
def is_alarm_activated():
    global alarm_activated
    r = get('http://192.168.1.155:6000/alarm_activated')
    if r.status_code == 200:
        alarm_activated = True
    if r.status_code == 400:
        alarm_activated = False
    return jsonify({'alarmActivated': alarm_activated})


@app.route('/api/activate_alarm')
@auth.login_required
def activate_alarm():
    global alarm_activated
    r = get('http://192.168.1.155:6000/gpio/activate_alarm')
    if r.status_code == 200:
        alarm_activated = True
    return jsonify({'alarmActivated': alarm_activated})


@app.route('/api/deactivate_alarm')
@auth.login_required
def deactivate_alarm():
    global alarm_activated
    r = get('http://192.168.1.155:6000/gpio/deactivate_alarm')
    if r.status_code == 200:
        alarm_activated = False
    return jsonify({'alarmActivated': alarm_activated})


@auth.verify_password
def verify_password(token, unused):
    print("Authenticated using token", file=sys.stderr)
    return token == secret_token


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')


if __name__ == '__main__':
   
    model = cv2.createEigenFaceRecognizer()
    model.load(config.TRAINING_FILE)
	
    global safe_opened
    global alarm_activated
    r = get('http://192.168.1.155:6000/safe_opened')
    if r.status_code == 200:
        safe_opened = True
    if r.status_code == 400:
        safe_opened = False

    r = get('http://192.168.1.155:6000/alarm_activated')
    if r.status_code == 200:
        alarm_activated = True
    if r.status_code == 400:
        alarm_activated = False

    app.run(debug=True)

