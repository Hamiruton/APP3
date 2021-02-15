from flask import url_for
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_mail(email, token):
    message = MIMEMultipart()
    message['Subject'] = 'Inscription'
    message['From'] = ''
    message['To'] = 'email'

    html = f"""\
        <html>
            <body>
                <h1>Allo</h1>
            </body>
        </html>
        """
    
    mail = MIMEText(html, 'html')
    message.attach(mail)

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.ehlo()
        server.starttls()
        server.login(config.email, config.password)
        server.sendmail(config.email, email, message.as_string())