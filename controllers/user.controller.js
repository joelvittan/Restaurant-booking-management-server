const { generateAccessToken, generateRefreshToken } = require("../utils/jwtToken");
const { userValidator } = require("../validators/user.validators");
const Users = require("../models/user.model");
bcrypt = require("bcrypt");
exports.register = async (req, res) => {
  const { error } = userValidator(req.body);
  if (error) return res.status(400).json({ message: error.details });
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });

    if (user.login_attempts >= 3) {
      return res.status(403).json({
        message: "Account locked due to too many failed login attempts",
      });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      user.login_attempts++;
      await user.save();
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    user.login_attempts = 0;
    await user.save();

    res
      .status(200)
      .json({ accessToken, refreshToken, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllUsers = async (req, res) => {
  const { id } = req.params;


  try {
    const users = id ? await Users.findByPk(id) : await Users.findAll();
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const user = await Users.findOne({ where: { refreshToken } });
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    const accessToken = generateAccessToken(user);
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
 }



