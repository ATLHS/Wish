const emailService = require("../../services/email");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: 587,
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USER_EMAIL,
    pass: process.env.SMTP_USER_PASSWORD,
  },
  secure: false,
});

describe("ma boisson", () => {
  it("should send email with the correct parameters", async () => {});
});
