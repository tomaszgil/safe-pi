from flask import Flask, render_template, jsonify
from flask_httpauth import HTTPBasicAuth

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


def recognize(img):
    # TODO perform face recognition with img and reference image
    return True


# REST server paths
@app.route('/api/token')
@auth.login_required
def get_auth_token():
    return jsonify({'token': secret_token})


@app.route('/api/safe_opened')
@auth.login_required
def is_safe_opened():
    # TODO check if safe is opened
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
def verify_password(token, img):
    if token == secret_token:
        return True
    else:
        return recognize(0)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)