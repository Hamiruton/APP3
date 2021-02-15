from flask import Blueprint, current_app
from flask_admin import BaseView, expose
from server_py import create_app

admin = create_app()

class AnalyticsView(BaseView):
    @expose('/')
    def index(self):
        return self.render('admin/analytics.html')

admin[1].add_view(AnalyticsView(name='Analytics', endpoint='analytics'))
