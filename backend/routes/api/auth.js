const router = require("express").Router();
const emailService = require("../../services/email");
const randomNumber = require("../../utils/randomDigitNumber.js");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

const saltRounds = 12;
const authorizedEmails = process.env.MEMBERS_EMAILS_ADDRESSES.split(",");

// @route POST auth/signup/email
// @description save new user
// @access Public
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
          res.status(400).json({
            user: { firstname: user.username, email: useer.email },
            message: "Un probleme est survenue, réessayer plus tard.",
          });
        }
      }
      if (user.status === "active") {
        res.status(400).json({
          user: { firstname: "", email: "" },
          message: `Un compte wish existe deja avec l'adresse email : ${user.email} 🙄`,
        });
      }
    } else {
      const confirmed_code = randomNumber.randomFourDigitNumber();
      const user = new User({
        username,
        email,
        status: "pending",
        confirmed_code,
        password: "",
      });
      const newUser = await user.save();

      if (newUser) {
        const isSend = await emailService
          .send(newUser.email, newUser.username, confirmed_code)
          .then((res) => res)
          .then((response) => response)
          .catch((err) => console.log(err));
        if (isSend && isSend.accepted) {
          res.json({
            user: { firstname: username, email },
            message: `Indiquez le code de confirmation envoyer a l'adresse email : ${newUser.email}.`,
          });
        } else {
          res.status(400).json({
            user: { firstname: newUser.username, email: newUser.email },
            message: "Un probleme est survenue, réessayer plus tard.",
          });
        }
      }
    }
  } else {
    res.status(400).json({
      user: { firstname: "", email: "" },
      message: `Désolé cette adresse email : ${email} n'est pas autorisé à consulter ce site.`,
    });
  }
});

// @route POST auth/signup/confirmemail
// @description confirm user email address
// @access Public
router.post("/signup/confirmemail", async (req, res) => {
  const { email, code } = req.body;

  if (code) {
    const user = await User.find({ email, code });
    if (user) {
      res.status(200).json({
        user: { firstname: "", email: "" },
        message: `Indiquer un mot de passe.`,
        isValidCode: true,
      });
    } else {
      res.status(400).json({
        user: { firstname: "", email: "" },
        message: "Le code de confirmation n'est pas valable.",
        isValidCode: false,
      });
    }
  } else {
    res.status(400).json({
      user: { firstname: user.username, email: useer.email },
      message: "Un probleme est survenue, réessayer plus tard.",
    });
  }
});

// @route POST auth/signup/password
// @description create user password
// @access Public
router.post("/signup/password", async (req, res) => {
  const { email, password } = req.body;

  if (password) {
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        const isUpdate = await User.findOneAndUpdate(
          { email: user.email },
          { password: hash, status: "active" },
          {
            new: true,
          }
        );

        if (!err && isUpdate) {
          res.status(200).json({
            user: { firstname: user.username, email: user.email },
            message: `Bienvenue sur Wish ${user.username}.`,
            isUpdate: true,
          });
        } else {
          res.json({
            user: { firstname: user.username, email: useer.email },
            message: "Un probleme est survenue, réessayer plus tard.",
            isUpdate: false,
          });
        }
      });
    } else {
      res.json({
        user: { firstname: user.username, email: useer.email },
        message: "Un probleme est survenue, réessayer plus tard.",
        isUpdate: false,
      });
    }
  } else {
    res.json({
      user: { firstname: "", email: "" },
      message: "Un probleme est survenue, réessayer plus tard.",
    });
  }
});

// @route POST auth/login
// @description login user test
// @access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  res.json({ message: "Tentative de connexion." });
});

module.exports = router;
