from flask import Flask, render_template, request
import json
from tools import send_mail
from tools import bd_connect

cursor = bd_connect.db.cursor()


app = Flask(__name__)

@app.route('/send-mail', methods=['GET', 'POST'])
def mail():
    if request.method == 'GET':
        return render_template('index.html')
    
    elif request.method == 'POST':
        data = json.loads(request.data.decode())
        send_mail(data['email'], data['token'])
        return 'ok'

@app.route('/db-central', methods=['GET', 'POST'])
def verify_db():
    if request.method == 'POST':
        num_acte_naiss = json.loads(request.data.decode())
        sql = "SELECT * FROM Extrait WHERE NumeroActe = %s"
        cursor.execute(sql, num_acte_naiss)
        results = cursor.fetchone()

        if results:
            return 'ok'
        else:
            return 'nope'

if __name__ == "__main__":
    app.run()