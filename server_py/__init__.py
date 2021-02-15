from flask import Flask, render_template, request

def create_app():
    app = Flask(__name__)

    from server_py.sendMail.routes import sendMail

    app.register_blueprint(sendMail)

    return app