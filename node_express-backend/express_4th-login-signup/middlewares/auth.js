const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../data/key");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.token;
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

  if (!token) {
    return res.status(401).json({ message: "Access token missing or invalid" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyToken,
};
