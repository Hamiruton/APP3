from flask import Flask
from flask_admin import Admin, BaseView, expose

def create_app():
    app = Flask(__name__)

    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'

    admin = Admin(app, name='Administration', template_mode='bootstrap3')

    from server_py.sendMail.routes import sendMail
    from server_py.verifyBd.routes import verifyBd

    app.register_blueprint(sendMail)
    app.register_blueprint(verifyBd)

    class AnalyticsView(BaseView):
        @expose('/')
        def index(self):
            return self.render('admin/analytics.html')

    admin.add_view(AnalyticsView(name='Analytics', endpoint='analytics'))


    return app
    