const router = require("express").Router();
const emailService = require("../services/email");
const randomNumber = require("../utils/randomDigitNumber.js");
let User = require("../models/user");
const authorizedEmails = process.env.MEMBERS_EMAILS_ADDRESSES.split(",");

router.get("/delete", (req, res, next) => {
  User.findOneAndDelete({ email: process.env.SMTP_USER_EMAIL }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted User : ", docs);
    }
  });
  res.json({ message: "user deleted" });
});

router.post("/signup/email", async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;

  if (authorizedEmails.includes(email)) {
    const user = await User.findOne({ email });
    if (user) {
      if (user.status === "pending") {
        const confirmed_code = randomNumber.randomFourDigitNumber();
        const isUpdate = await User.findOneAndUpdate(
          { email },
          { confirmed_code },
          {
            new: true,
          }
        );

        console.log(isUpdate);
        const isSend = await emailService
          .send(user.email, user.username, confirmed_code)
          .then((res) => res)
          .then((response) => response)
          .catch((err) => console.log(err));

        if (isSend && isSend.accepted && isUpdate) {
          res.status(200).json({
            user: { firstname: user.username, email: user.email },
            message: `Indiquez le nouveau code de confirmation envoyer à l'adresse email : ${user.email}.`,
          });
        } else {
          console.log("SMTP error");
        }
      }
      if (user.status === "active") {
        res.json({
          user: { firstname: "", email: "" },
          message: `Un compte wish existe deja avec l'adresse email : ${user.email} 🙄`,
        });
      }
    } else {
      const user = new User({
        username,
        email,
        status: "pending",
        confirmed_code: randomNumber.randomFourDigitNumber(),
        password: "",
      });
      // user.save().then((user) => {
      //   if (user) {
      //     const isSend = await emailService
      //       .send(
      //         user.email,
      //         user.username,
      //         randomNumber.randomFourDigitNumber()
      //       )
      //       .then((res) => res)
      //       .then((response) => response)
      //       .catch((err) => console.log(err));

      //     if (isSend && isSend.accepted) {
      //       res.json({
      //         user: { firstname: username, email },
      //         message: `Indiquez le code de confirmation envoyer a l'adresse email : ${user.email}.`,
      //       });
      //     } else {
      //       console.log("SMTP error qqqqqqqqqqqqqqqqqqqqq");
      //     }
      //   }
      // });
    }
  } else {
    res.json({
      user: { firstname: "", email: "" },
      message: `Désolé cette adresse email : ${email} n'est pas autorisé à consulter ce site.`,
    });
  }
});

router.post("/signup/confirmemail", async (req, res) => {
  const code = req.body.code;
  const email = req.body.email;

  if (code) {
    const user = await User.findOne({ email, code });
    if (user) {
      res.status(200).json({
        user: { firstname: "", email: "" },
        message: `Indiquer un mot de passe.`,
        isValidCode: true,
      });
    } else {
      res.json({
        user: { firstname: "", email: "" },
        message: "Le code de confirmation n'est pas valable.",
        isValidCode: false,
      });
    }
  } else {
    res.json({
      user: { firstname: "", email: "" },
      message: "Un probleme est survenue, réessayer plus tard.",
    });
  }
});

router.post("/signup/password", async (req, res) => {
  const { email, password } = req.body;
  console.log(password, "password")

  if (password) {
    const user = await User.findOne({ email });
    if (user) {
      const isUpdate = await User.findOneAndUpdate(
        { email },
        { password },
        {
          new: true,
        }
      );

      // res.status(200).json({
      //   user: { firstname: "", email: "" },
      //   message: `Indiquer un mot de passe.`,
      //   isValidCode: true,
      // });
      console.log(isUpdate, "isUpdate");
    } else {
      res.json({
        user: { firstname: "", email: "" },
        message: "Le code de confirmation n'est pas valable.",
        isValidCode: false,
      });
    }
  } else {
    res.json({
      user: { firstname: "", email: "" },
      message: "Un probleme est survenue, réessayer plus tard.",
    });
  }
});
module.exports = router;
