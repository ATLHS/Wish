const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: 587,
  host: "smtp-mail.outlook.com",
  auth: {
    user: process.env.SMTP_USER_EMAIL,
    pass: process.env.SMTP_USER_PASSWORD,
  },
  secure: false,
});

module.exports = {
  send: async (email, username, confirmationCode) => {
    const mailData = {
      from: process.env.SMTP_USER_EMAIL,
      to: email,
      subject: "Confirmez votre adresse e-mail sur Wish",
      html: `<h3>hello ${username}  votre code est : ${confirmationCode}</h3>`,
    };

    return transporter.sendMail(mailData);
  },
};
