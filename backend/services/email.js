const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const transporter = nodemailer.createTransport({
  port: 587,
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USER_EMAIL,
    pass: process.env.SMTP_USER_PASSWORD,
  },
  secure: false,
});
transporter.use(
  "compile",
  hbs({
    viewEngine: { encoding: "utf8", defaultLayout: false },
    viewPath: path.join(process.cwd() + "/views"),
    extName: ".hbs",
  })
);

module.exports = {
  send: async (email, username, confirmationCode) => {
    const mailData = {
      from: process.env.SMTP_USER_EMAIL,
      to: email,
      subject: "Confirmez votre adresse e-mail sur Wish",
      template: "confirm_email",
      context: {
        username,
        email,
        confirmationCode,
      },
    };

    return transporter.sendMail(mailData);
  },
};
