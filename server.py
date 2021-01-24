from flask import Flask, render_template, request
import json
from tools import send_mail

app = Flask(__name__)

@app.route('/send-mail', methods=['GET', 'POST'])
def mail():
    if request.method == 'GET':
        return render_template('index.html')
    
    elif request.method == 'POST':
        data = json.loads(request.data.decode())
        send_mail(data['email'], data['token'])
        return 'ok'

if __name__ == "__main__":
    app.run()