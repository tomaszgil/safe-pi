from __future__ import print_function
from flask import Flask, abort, request, render_template, jsonify
from flask_httpauth import HTTPBasicAuth
from requests import get
import sys
import numpy as np
import base64


app = Flask(__name__, template_folder='../build', static_folder='../build/static')

# Extensions
auth = HTTPBasicAuth()

# Mocked behavior
secret_token = "emVEQwsePJp9dm6F"
# TODO check current state of safe
safe_opened = False
alarm_activated = True

# Face recognition
reference_img = 0

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
    # TODO perform face recognition with img and reference image
	
    img = img[22:]
    img = decode_base64(img) #padding moze byc
    img = np.frombuffer(img, dtype=np.uint8)
	
    return True


# REST server paths
@app.route('/api/token', methods=['POST'])
def get_auth_token():
    img = request.json.get('img')
    print(img, file=sys.stderr)
    if recognize(img):
        print("Authenticated using image", file=sys.stderr)
        return jsonify({'token': secret_token})
    else:
        abort(400)


@app.route('/api/safe_opened')
@auth.login_required
def is_safe_opened():
    r = get('http://192.168.1.155:6000/safe_opened')
    state = r.content
    print(state, file=sys.stderr)
    return jsonify({'safeOpened': safe_opened})


@app.route('/api/open_safe')
@auth.login_required
def open_safe():
    # TODO try to open safe
    global safe_opened
    safe_opened = True
    return jsonify({'safeOpened': safe_opened})


@app.route('/api/close_safe')
@auth.login_required
def close_safe():
    # TODO try to close safe
    global safe_opened
    safe_opened = False
    return jsonify({'safeOpened': safe_opened})


@app.route('/api/alarm_activated')
@auth.login_required
def is_alarm_activated():
    # TODO check if alarm is activated
    return jsonify({'alarmActivated': alarm_activated})


@app.route('/api/activate_alarm')
@auth.login_required
def activate_alarm():
    # TODO try to activate alarm
    global alarm_activated
    alarm_activated = True
    return jsonify({'alarmActivated': alarm_activated})


@app.route('/api/deactivate_alarm')
@auth.login_required
def deactivate_alarm():
    # TODO try to deactivate alarm
    global alarm_activated
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
    app.run(debug=True)