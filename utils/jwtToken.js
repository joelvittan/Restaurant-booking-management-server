const { jwtCredentials } = require("../config/env");
jwt = require("jsonwebtoken");
exports.generateAccessToken = (user,table) => {
  return jwt.sign(
    { userId: user.id, email: user.email,tableId:table },
    jwtCredentials.jwtSecret,
    { expiresIn: "1d" }
  );
};

exports.generateRefreshToken = (user,table) => {
  return jwt.sign({ userId: user.id,tableId:table }, jwtCredentials.jwtRefreshSecret, {
    expiresIn: "7d",
  });
};
