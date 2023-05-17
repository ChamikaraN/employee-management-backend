const authService = require("../services/authService");

exports.generateAccessToken = (req, res) => {
  const { accessToken, refreshToken } = authService.generateAccessToken();
  res.json({ accessToken, refreshToken });
};

exports.refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const accessToken = await authService.refreshAccessToken(refreshToken);
    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};
