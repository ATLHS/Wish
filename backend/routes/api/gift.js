const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// @route POST gift/signup/email
// @description save new user
// @access Private
router.post("/create", upload.single("image"), (req, res) => {
  const file = req.file;
  uploadFile(file).then((res) => {
    console.log(res);
  });
  res.status(200).json({
    message: "L'image à bien était uploader.",
  });
});

module.exports = router;
