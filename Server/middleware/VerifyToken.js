const User = require("../models/User.model");
const JWT = require("jsonwebtoken");

const { JWT_SECRET } = require("../constants");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  const decoded = JWT.verify(token, JWT_SECRET);

  const foundUser = await User.findOne({ where: { id: decoded.id } });

  if (!foundUser) {
    return res.status(401).json({
      success: false,
      message: "Invalid login credentials",
    });
  }

  req.user = foundUser;
  next();
};

//should execute after isUser
const isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to access this resource",
    });
  }

  next();
};

module.exports = {
  verifyToken,
  isAdmin,
};
