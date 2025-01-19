const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwtToken");
const { userValidator } = require("../validators/user.validators");
const Users = require("../models/user.model");
const { response } = require("express");
bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { error } = userValidator(req.body);
  if (error) return res.status(400).json({ message: error.details });
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.loginAttempts >= 3) {
      return res.status(403).json({
        message: "Account locked due to too many failed login attempts",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      user.loginAttempts++;
      await user.save();
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    user.loginAttempts = 0;
    await user.save();

    res.status(200).json({
      accessToken,
      refreshToken,
      message: "Login successful",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    await user.save();
    res
      .status(200)
      .json({ message: "User updated successfully", user, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};

exports.getAllUsers = async (req, res) => {
  const currentUser = await req.user;
  const { id } = req.params;


  try {
    const users = id ? await Users.findByPk(id) : await Users.findAll();
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      status: true,
      message: "Users retrieved successfully",
      data: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        currentUser: user.id === currentUser.userId,
        success: true,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  const currentUser = await Users.findByPk(userId);

  if (currentUser.role !== "ADMIN" || Number(id) === userId) {
    return res.status(403).json({
      message:
        currentUser.role !== "ADMIN"
          ? "Unauthorized Action - Only Admins can delete users"
          : "You cannot delete yourself",
      success: false,
    });
  }

  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    await user.destroy();
    res
      .status(200)
      .json({ message: "User deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: error.response.data.message, success: false });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
  try {
    const user = await Users.findOne({ where: { refreshToken }, attributes: { exclude: ['password', 'loginAttempts', 'refreshToken', 'isVerified', 'isActive','accessToken'] } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid refresh token", success: false });
    }
    const accessToken = generateAccessToken(user);

    res.status(200).json({ accessToken, success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};

exports.verifyLogin = async (req, res) => {
  const user = await Users.findByPk(req.user.userId);

  res
    .status(200)
    .json({ message: "Token verified successfully", user, success: true });
};
