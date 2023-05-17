const jwt = require("jsonwebtoken");
require("dotenv").config();

// Service function for generate access token
exports.generateAccessToken = () => {
  // Generate a generic access token
  const accessToken = jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME,
  });

  // Generate a refresh token
  const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME,
  });

  return { accessToken, refreshToken };
};

// Service function for refresh access token
exports.refreshAccessToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err) => {
      if (err) {
        reject(err);
      } else {
        const accessToken = jwt.sign({}, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME,
        });
        resolve(accessToken);
      }
    });
  });
};
