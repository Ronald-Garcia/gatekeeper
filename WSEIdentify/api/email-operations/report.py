import smtplib,ssl
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.utils import formatdate
from email import encoders
import pandas as pd
import sqlite3
from datetime import datetime
import openpyxl
import sys

# Create your connection.
cnx = sqlite3.connect('C:/Users/rgarc/OneDrive/Desktop/gatekeeper/WSEIdentify/api/sqlite.db')
emailTo = 'rgarcia0303757@gmail.com'
if len(sys.argv) == 2:
    emailTo = sys.argv[1]
overrideTransactions = pd.read_sql_query("SELECT * FROM override_transactions", cnx)
transactions = pd.read_sql_query("SELECT * FROM transactions", cnx)

transactions["Receiver Type"] =  [ "CC" if len(str(c)) == 10 else "IO" for c in transactions["budgetCode"] ]

overrideTransactions["dateAdded"] = [ str(datetime.fromtimestamp(d)) for d in overrideTransactions["dateAdded"] ]

transactions["dateAdded"] = [ str(datetime.fromtimestamp(d)) for d in transactions["dateAdded"] ]


transactions["Text"] =  [ ", ".join(a) for a in zip(transactions["userJHED"], transactions["budgetAlias"], transactions["dateAdded"]) ]
overrideTransactions["Text"] =  [ ", ".join(a) for a in zip(overrideTransactions["userJid"], overrideTransactions["dateAdded"]) ]

transactions.to_excel("report.xlsx")
overrideTransactions.to_excel("override-report.xlsx")
def send_mail(send_from,send_to,subject,text,files,server,port,username='',password='',isTls=True):
    msg = MIMEMultipart()
    msg['From'] = send_from
    msg['To'] = send_to
    msg['Date'] = formatdate(localtime = True)
    msg['Subject'] = subject
    msg.attach(MIMEText(text))

    part1 = MIMEBase('application', "octet-stream")
    part1.set_payload(open(files[0], "rb").read())
    encoders.encode_base64(part1)
    part1.add_header('Content-Disposition', 'attachment', filename="transaction-report.xlsx")
    msg.attach(part1)

    part2 = MIMEBase('application', "octet-stream")
    part2.set_payload(open(files[1], "rb").read())
    encoders.encode_base64(part2)
    part2.add_header('Content-Disposition', 'attachment', filename="override-transaction-report.xlsx")
    msg.attach(part2)
    #context = ssl.SSLContext(ssl.PROTOCOL_SSLv3)
    #SSL connection only working on Python 3+
    smtp = smtplib.SMTP(server, port)
    if isTls:
        smtp.starttls()

    smtp.login(username,password)
    smtp.sendmail(send_from, send_to, msg.as_string())
    print("s:Email was sent.")
    smtp.quit()

cnx.commit()
cnx.close()

send_mail("wseinterlocks@gmail.com", emailTo, "Machine Transaction Report for " + str(datetime.now().month), "Attached is the transaction report and the override transaction report of all machines by all users", ["./report.xlsx", "./override-report.xlsx"], "smtp.gmail.com", 587, 'wseinterlocks@gmail.com', 'thyv brtu jbsw efrf')