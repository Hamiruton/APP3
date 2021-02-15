from flask import Flask, render_template, request, Blueprint
import json
from server_py import send_mail

sendMail = Blueprint('sendMail', __name__)

@sendMail.route('/send-mail', methods=['GET', 'POST'])
def mail():
    if request.method == 'GET':
        return render_template('index.html')
    
    elif request.method == 'POST':
        data = json.loads(request.data.decode())
        send_mail(data['email'], data['token'])
        return 'ok'
