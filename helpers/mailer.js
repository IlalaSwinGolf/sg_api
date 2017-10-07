'use strict';

const Nodemailer = require('nodemailer');

const mailer = {
    createTransport: function () {
        return Nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            secure: false,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PWD
            }
        });
    },
    send: function (mailOptions, callback) {
        let transport = this.createTransport();
        transport.sendMail(mailOptions, callback);
    }
}

module.exports = mailer;