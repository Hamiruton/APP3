from flask import url_for
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from dotenv import load_dotenv 
from pathlib import Path
import os
load_dotenv()
env_path = Path('.')/'.env'
load_dotenv(dotenv_path = env_path)

MAIL_USERNAME = os.getenv('EMAIL_USER')
MAIL_PASSWORD = os.getenv('EMAIL_PSW')

def send_mail(email, token):
    message = MIMEMultipart()
    message['Subject'] = 'Inscription'
    message['From'] = MAIL_USERNAME
    message['To'] = email

    html = f"""\
        <html>
            <body>
                <h1>Terminer l'inscription</h1>
                <p>Cliquez sur le lien ci-après pour terminer votre inscription: <a href="http://localhost:3000/inscrire/{token}">lien</a></p>
            </body>
        </html>
        """
    
    mail = MIMEText(html, 'html')
    message.attach(mail)

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.ehlo()
        server.starttls()
        server.login(MAIL_USERNAME, MAIL_PASSWORD)
        server.sendmail(MAIL_USERNAME, email, message.as_string())