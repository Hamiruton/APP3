from flask import Flask, render_template, request, Blueprint

verifyBd = Blueprint('verifyBd', __name__)


@verifyBd.route('/db-central', methods=['GET', 'POST'])
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
