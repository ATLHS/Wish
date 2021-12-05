const router = require("express").Router();
const emailService = require("../../services/email");
const randomNumber = require("../../utils/randomDigitNumber.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

const saltRounds = 12;
const authorizedEmails = process.env.MEMBERS_EMAILS_ADDRESSES.split(",");

// @route POST auth/signup/email
// @description save new user
// @access Public
router.post("/signup", async (req, res) => {
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
            user: { username: user.username, email: user.email },
            message: `Indiquez le nouveau code de confirmation envoyer à l'adresse email : ${user.email}.`,
          });
        } else {
          res.status(400).json({
            user: { username: user.username, email: useer.email },
            message: "Un probleme est survenue, réessayer plus tard.",
          });
        }
      }
      if (user.status === "active") {
        res.status(400).json({
          user: { username: "", email: "" },
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
            user: { username: username, email },
            message: `Indiquez le code de confirmation envoyer a l'adresse email : ${newUser.email}.`,
          });
        } else {
          res.status(400).json({
            user: { username: newUser.username, email: newUser.email },
            message: "Un probleme est survenue, réessayer plus tard.",
          });
        }
      }
    }
  } else {
    res.status(400).json({
      user: { username: "", email: "" },
      message: `Désolé cette l'adresse email : ${email} n'est pas autorisé à consulter ce site.`,
    });
  }
});

// @route POST auth/signup/confirmemail
// @description confirm user email address
// @access Public
router.post("/email", async (req, res) => {
  const { email, code } = req.body;
  if (code) {
    const user = await User.findOne({ email });
    const isValidCode = user.confirmed_code === Number(code);

    if (user && isValidCode) {
      res.status(200).json({
        user: { username: "", email: "" },
        message: `Indiquer un mot de passe.`,
        isValidCode: true,
      });
    } else {
      res.status(400).json({
        user: { username: "", email: "" },
        message: "Le code de confirmation n'est pas valide.",
        isValidCode: false,
      });
    }
  } else {
    res.status(400).json({
      user: { username: user.username, email: useer.email },
      message: "Un probleme est survenue, réessayer plus tard.",
    });
  }
});

// @route POST auth/signup/password
// @description create user password
// @access Public
router.post("/password", async (req, res) => {
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
            user: { username: user.username, email: user.email },
            message: `Bienvenue sur Wish ${user.username}.`,
            isUpdate: true,
          });
        } else {
          res.json({
            user: { username: user.username, email: useer.email },
            message: "Un probleme est survenue, réessayer plus tard.",
            isUpdate: false,
          });
        }
      });
    } else {
      res.json({
        user: { username: user.username, email: useer.email },
        message: "Un probleme est survenue, réessayer plus tard.",
        isUpdate: false,
      });
    }
  } else {
    res.json({
      user: { username: "", email: "" },
      message: "Un probleme est survenue, réessayer plus tard.",
    });
  }
});

// @route POST auth/signin
// @description signin user test
// @access Public
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    if (user.status === "active") {
      bcrypt.compare(password, user.password).then((result) => {
        if (result) {
          const payload = {
            id: user._id,
            email: user.email,
            username: user.username,
          };

          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN },
            (err, token) => {
              if (err) {
                res.json({
                  message: "Un probleme est survenue, réessayer plus tard.",
                });
              }
              res.json({
                user: payload,
                token: `Bearer ${token}`,
                message: "Tentative de connexion.",
              });
            }
          );
        } else {
          res.status(400).json({
            message: "Adresse email ou mot de passe incorrect.",
          });
        }
      });
    }
    if (user.status === "pending") {
      res.status(400).json({
        message:
          "Vous devez valider votre adresse email avant de vous connecter 🙄",
      });
    }
  } else {
    res.status(400).json({
      message: "Aucun utilisateur ne correspond à l'adresse email indiquer.",
    });
  }
});

module.exports = router;
