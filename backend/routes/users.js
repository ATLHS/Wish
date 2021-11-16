const router = require("express").Router();
const sendConfirmEMailCode = require("../services/email");
let User = require("../models/user");
const authorizedEmails = process.env.MEMBERS_EMAILS_ADDRESSES.split(",");

router.use((req, res, next) => {
  next();
});

router.get("/delete", (req, res, next) => {
  User.findOneAndDelete({ email: "s-attilah@hotmail.com" }, (err, docs) => {
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

  if (authorizedEmails) {
    const user = await User.findOne({ email });
    if (user) {
      if (user.status === "pending") {
        res.json({
          user: { firstname: user.username, email: user.email },
          message: `Indiquez le nouveau code de confirmation envoyer a l'adresse email : ${user.email}.`,
        });
      }
      if (user.status === "active") {
        res.json({
          user: { firstname: "", email: "" },
          message: `Un compte wish existe deja avec l'adresse email : ${user.email} 🙄`,
        });
      }
    } else {
      let confirmed_code = Math.floor(1000 + Math.random() * 9000);
      const user = new User({
        username,
        email,
        status: "pending",
        confirmed_code,
        password: "",
      });
      user.save().then((user) => {
        if (user) {
          const isSend = sendConfirmEMailCode(
            user.username,
            user.email,
            confirmed_code,
            res
          );
          if (isSend === "SUCCESS") {
            res.json({
              user: { firstname: username, email },
              message: `Indiquez le code de confirmation envoyer a l'adresse email : ${user.email}.`,
            });
          } else {
            console.log("SMTP error");
          }
        }
      });
    }
  } else {
    res.json({
      user: { firstname: "", email: "" },
      message: `désolé cette adresse email : ${email} n'est pas autorisé à consulter ce site.`,
    });
  }
});

router.post("/signup/confirmemail", async (req, res) => {
  const code = req.body.code;
  const email = req.body.email;

  if (code) {
    const user = await User.findOne({ email, confirmed_code: code });
    if (user) {
    } else {
    }
  } else {
    res.json({
      user: { firstname: "", email: "" },
      message: "Un probleme est survenue, réessayer plus tard.",
    });
  }
  res.json({ isConfirm: true });
});

module.exports = router;
