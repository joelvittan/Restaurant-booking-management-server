const { jwtCredentials } = require("../config/env");
jwt = require("jsonwebtoken");
exports.generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    jwtCredentials.jwtSecret,
    { expiresIn: "1d" }
  );
};

exports.generateRefreshToken = (user) => {
  return jwt.sign({ userId: user.id }, jwtCredentials.jwtRefreshSecret, {
    expiresIn: "7d",
  });
};
