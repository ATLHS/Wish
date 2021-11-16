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

module.exports = (email, username, confirmationCode, res) => {
  const mailData = {
    from: process.env.SMTP_USER_EMAIL,
    to: email,
    subject: "Confirmez votre adresse e-mail sur Wish",
    html: res.render(__dirname + "/public/templates/confirm_email.html", {
      username,
      email,
      confirmationCode,
    }),
  };
  transporter.sendMail(mailData, (err, info) => {
    if (err) return err;
    if (info) return "SUCCESS";
  });
};
