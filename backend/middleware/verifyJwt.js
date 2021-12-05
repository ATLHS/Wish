const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  const token = req.headers["x-access-token"]?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res.status(401).json({
          isSignIn: "false",
          message: "requête non authentifiée.",
        });
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      isSignIn: "false",
      message: "Invalid token.",
    });
  }
};
module.exports = { verifyJwt };
